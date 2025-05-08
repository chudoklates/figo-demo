import { NextResponse } from "next/server";

import { createOrUpdateHubspotContact } from "@/app/api/utils";
import { getTimeslot } from "@/app/actions/cms";
import { getOrder } from "@/app/actions/paypal";
import { getLocationInfoForCoordinates } from "@/app/actions/geo";
import { updateTimeslotSeats } from "@/app/actions/cms-manage";
import { revalidatePath } from "next/cache";
import { verifySignature } from "./utils";
import { RestAPIPayment, WebhookEvent } from "./types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(req: Request) {
  let body;

  const raw = await req.text();

  try {
    body = JSON.parse(raw);
  } catch (err) {
    console.log(raw);
    return NextResponse.json({ message: `Invalid JSON` }, { status: 400 });
  }

  const { headers } = req;

  try {
    await verifySignature(raw, headers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: `Unauthorized` }, { status: 401 });
  }

  const event = body as WebhookEvent;

  // Successfully constructed event.
  console.log("✅ Success:", event.id, event.event_type);

  const permittedEvents: string[] = ["PAYMENT.CAPTURE.COMPLETED"];

  if (permittedEvents.includes(event.event_type)) {
    try {
      switch (event.event_type) {
        case "PAYMENT.CAPTURE.COMPLETED":
          {
            const payload = event.resource as RestAPIPayment;

            console.log(`Processing payment capture: ${payload.id}`);

            const order = await getOrder(
              payload.supplementary_data.related_ids.order_id
            );

            console.log(`Processing checkout order: ${order.id}`);

            const timeslotId = payload?.custom_id?.split(":")?.[0];

            if (!timeslotId) {
              throw new Error(`Timeslot ID not provided: ${order.id}`);
            }

            const payer = order.paymentSource?.paypal;

            if (!payer?.emailAddress) {
              throw new Error(`Customer info not provided: ${order.id}`);
            }

            const seats = parseInt(
              order?.purchaseUnits?.[0]?.items?.[0]?.quantity || "",
              10
            );

            const total = parseFloat(
              order?.purchaseUnits?.[0]?.amount?.value || ""
            );

            if (isNaN(seats)) {
              throw new Error(`Seats not provided: ${payload.id}`);
            }

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

            const paypalPhoneNumber = payer?.phoneNumber?.nationalNumber;

            const first1 = paypalPhoneNumber?.indexOf("1");

            const withoutLeadingZero =
              first1 !== -1
                ? paypalPhoneNumber?.slice(first1)
                : paypalPhoneNumber;

            const hs_whatsapp_phone_number = paypalPhoneNumber
              ? (`+49${withoutLeadingZero}` as const)
              : undefined;

            const timestamp = dayjs(event.create_time);
            const eventTimestamp = dayjs(timeslotInfo.startDate);

            const firstname = payer.name?.givenName;
            const lastname = payer.name?.surname;

            const customerProperties = {
              email: payer.emailAddress,
              firstname,
              lastname,
              full_name: firstname ? `${firstname} ${lastname}` : undefined,
              zip:
                payer?.address?.postalCode ||
                order?.purchaseUnits?.[0]?.shipping?.address?.postalCode,
              last_event_booked: eventTimestamp.toISOString(),
              last_event_booked_time__text_: eventTimestamp
                .tz("Europe/Berlin")
                .format("HH:mm"),
              last_booking_made: timestamp.format("YYYY-MM-DD"),
              restaurant_name: restaurant.name,
              restaurant_address: address,
              latest_seats_purchased: seats,
              hs_whatsapp_phone_number,
            };

            const dealProperties = {
              dealname: `${eventTimestamp.format(
                "DD.MM.YY"
              )} - ${firstname} ${lastname}`,
              amount: total,
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
          throw new Error(`Unhandled event: ${event.event_type}`);
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
