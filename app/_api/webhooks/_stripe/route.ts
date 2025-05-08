import type { Stripe } from "stripe";

import { NextResponse } from "next/server";

import { stripe } from "@/lib/payment/stripe";
import { createOrUpdateHubspotContact } from "@/app/api/utils";
import { getTimeslot } from "@/app/actions/cms";
import { getCheckoutSession } from "@/app/actions/stripe";
import { updateTimeslotSeats } from "@/app/actions/cms-manage";
import { getLocationInfoForCoordinates } from "@/app/actions/geo";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import { getFirstnameLastname } from "@/utils/name";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id, event.type);

  const permittedEvents: Stripe.Event["type"][] = [
    "checkout.session.completed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          {
            const payload = event.data.object as Stripe.Checkout.Session;

            console.log(`Processing checkout session: ${payload.id}`);

            const timeslotId = payload.metadata?.event_id;

            if (!timeslotId) {
              throw new Error(`Timeslot ID not provided: ${payload.id}`);
            }

            // Re-fetch session data to get quantity of purchased items
            const session = await getCheckoutSession({ sessionId: payload.id });

            if (!session) {
              throw new Error(`Session not found: ${payload.id}`);
            }

            const customerDetails = session.customer_details;

            if (!customerDetails?.email) {
              throw new Error(`Customer info not provided: ${payload.id}`);
            }

            const seats = session?.line_items?.data[0]?.quantity;

            if (!seats) {
              throw new Error(`Seats not provided: ${payload.id}`);
            }

            const rawPhone = customerDetails.phone;

            const first1 = rawPhone?.indexOf("1");

            const withoutLeadingZero =
              first1 !== -1 ? rawPhone?.slice(first1) : rawPhone;

            const phone = withoutLeadingZero
              ? (`+49${withoutLeadingZero}` as const)
              : undefined;

            // Type gymnastics
            const customerInfo = {
              email: customerDetails.email as string,
              name: customerDetails.name as string,
              address: customerDetails.address as Stripe.Address,
            };

            const timeslotInfo = await getTimeslot(timeslotId);

            if (!timeslotInfo) {
              throw new Error(
                `Timeslot not found or unpublished: ${timeslotId}`
              );
            }

            const restaurant = timeslotInfo.restaurant;

            if (!restaurant) {
              throw new Error(
                `Restaurant not found for timeslot: ${timeslotId}`
              );
            }

            const { address } = await getLocationInfoForCoordinates(
              restaurant.location,
              restaurant.placeId
            );

            /**
             * Updated number of available seats
             */
            const seatsOpen = timeslotInfo.seats - seats;

            // Update the seats in Contentful
            try {
              await updateTimeslotSeats(timeslotId, seatsOpen);
              console.log(
                `Updated timeslot ${timeslotId} seats to ${seatsOpen}`
              );
              revalidatePath(`/termine/treffen/${timeslotInfo.slug}`);
            } catch (error) {
              console.error(
                `Failed to update timeslot seats in Contentful: ${
                  error instanceof Error ? error.message : error
                }`
              );
            }

            const timestamp = dayjs(session.created * 1000);
            const eventTimestamp = dayjs(timeslotInfo.startDate);

            const { firstname, lastname } = getFirstnameLastname(
              customerDetails.name
            );

            const customerProperties = {
              email: customerInfo.email,
              firstname,
              lastname,
              full_name: customerInfo.name,
              zip: customerInfo.address?.postal_code,
              last_event_booked: eventTimestamp.toISOString(),
              last_event_booked_time__text_: eventTimestamp
                .tz("Europe/Berlin")
                .format("HH:mm"),
              last_booking_made: timestamp.format("YYYY-MM-DD"),
              restaurant_name: restaurant.name,
              restaurant_address: address,
              latest_seats_purchased: seats,
              hs_whatsapp_phone_number: phone,
            };

            const dealProperties = {
              dealname: `${eventTimestamp.format("DD.MM.YY")} - ${
                firstname ? `${firstname} ${lastname}` : customerInfo.name
              }`,
              amount: Number(session.amount_total) / 100,
              event_date_and_time: eventTimestamp.toISOString(),
              restaurant: restaurant.name,
              address: address,
              seats_purchased: seats,
              createdate: timestamp.toISOString(),
              closedate: timestamp.toISOString(),
            };

            // Update contact and deal info in Hubspot
            try {
              await createOrUpdateHubspotContact(
                customerProperties,
                dealProperties
              );
            } catch (error) {
              console.error(
                `Failed to create/update HubSpot contact: ${
                  error instanceof Error ? error.message : error
                }`
              );
            }
          }
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: `Webhook handler failed: ${
            error instanceof Error ? error.message : error
          }`,
        },
        { status: 500 }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
