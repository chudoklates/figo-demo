import { NextResponse } from "next/server";
import {
  RandevuWebhookEvent,
  SupplyPayload,
  TransactionPayload,
} from "./types";
import {
  getRandevuParticipant,
  loginRandevuAPIUser,
  updateRandevuSupply,
} from "@/app/actions/randevu";
import { getFieldValue } from "@/utils/field";
import { stripe } from "@/lib/payment/stripe";
import { verifyRandevuWebhook } from "./utils";
import { LocationInfo } from "@/types/geo";
import { Field } from "@/api/types/fields";

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ message: `Invalid JSON` }, { status: 400 });
  }

  try {
    verifyRandevuWebhook(req.headers.get("x-webhook-signature"), body);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: `Unauthorized` }, { status: 401 });
  }

  const event = body as RandevuWebhookEvent;

  // Successfully constructed event.
  console.log("✅ Success:", event.id, event.code);

  const handledEventTypes = ["TRANSACTION_STATE_REACHED", "SUPPLY_CREATED"];

  if (handledEventTypes.includes(event.code)) {
    try {
      switch (event.code) {
        case "TRANSACTION_STATE_REACHED":
          {
            let response;
            let data;
            let errors;

            const transactionId = (event.payload as TransactionPayload)
              .id_transaction;

            const token = await loginRandevuAPIUser();

            response = await fetch(
              process.env.NEXT_PUBLIC_RANDEVU_API_URL as string,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-randevu-key": process.env.NEXT_PUBLIC_RANDEVU_API_TOKEN,
                  authorization: token,
                } as HeadersInit,
                body: JSON.stringify({
                  query: /* GraphQL */ `
                    query getSingleDirectTransaction($id: ID!) {
                      getSingleDirectTransaction(id: $id) {
                        id
                        match {
                          provider {
                            id
                            fields {
                              ... on SimpleField {
                                simpleValue: value
                                field_type {
                                  id
                                  tech_name
                                }
                              }
                            }
                          }
                          supply {
                            fields {
                              ... on SimpleField {
                                simpleValue: value
                                field_type {
                                  id
                                  tech_name
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  `,
                  variables: {
                    id: transactionId,
                  },
                }),
              }
            ).then((res) => res.json());

            ({ data, errors } = response);

            if (errors)
              throw new Error(
                `Failed to get transaction ${transactionId}: ${errors[0].message}`
              );

            const provider = data?.getSingleDirectTransaction?.match?.provider;
            const supply = data?.getSingleDirectTransaction?.match?.supply;

            if (!provider)
              throw new Error(
                `Provider not found for transaction ${transactionId}`
              );

            if (!supply)
              throw new Error(
                `Supply not found for transaction ${transactionId}`
              );

            const providerId = provider.id;

            const price = getFieldValue<{ amount: number; currency: "EUR" }>(
              supply.fields,
              "price"
            );

            const name = getFieldValue<string>(supply.fields, "name");

            if (!price)
              throw new Error(`Price missing for transaction ${transactionId}`);

            const stripeAccountId = getFieldValue<string>(
              provider.fields,
              "stripe_account_id"
            );

            const paysVat = getFieldValue<boolean>(provider.fields, "pays_vat");

            if (!stripeAccountId)
              throw new Error(
                `Stripe Account ID missing for provider ${providerId}`
              );

            console.log(
              `Creating transfer for ${stripeAccountId} for €${(
                price.amount / 100
              ).toFixed(2)}`
            );

            /**
             * Create stripe transfer for the netto amount
             */
            response = await stripe.transfers.create({
              description: name,
              currency: price.currency,
              amount: price.amount,
              destination: stripeAccountId,
              transfer_group: transactionId,
            });

            console.log(`Transfer created: ${response.id}`);

            if (paysVat) {
              const vat = Math.round(price.amount * 0.19);

              console.log(
                `Creating tax transfer for ${stripeAccountId} for €${(
                  vat / 100
                ).toFixed(2)}`
              );

              /**
               * Create stripe transfer for tax
               */
              response = await stripe.transfers.create({
                description: "Mehrwertsteuer",
                currency: price.currency,
                amount: vat,
                destination: stripeAccountId,
                transfer_group: transactionId,
                metadata: {
                  mwst: 1,
                },
              });

              console.log(`VAT transfer created: ${response.id}`);
            }
          }
          break;
        case "SUPPLY_CREATED":
          {
            const { id_provider, id_supply } = event.payload as SupplyPayload;

            const token = await loginRandevuAPIUser();

            const provider = await getRandevuParticipant(token, id_provider);

            const vendorLocation = getFieldValue<LocationInfo>(
              provider.fields as Field<any>[],
              "vendor_location"
            );

            if (!vendorLocation) {
              console.log(
                `No vendor location found for provider ${id_provider}`
              );
              break;
            }

            const updated = await updateRandevuSupply(token, id_supply, [
              {
                tech_name: "location",
                value: vendorLocation,
              },
            ]);

            if (updated) {
              console.log(`Updated supply ${id_supply} with vendor location`);
            } else {
              console.log(
                `Failed to update supply ${id_supply} with vendor location`
              );
            }
          }
          break;
        default:
          throw new Error(`Unhandled event: ${event.code}`);
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: `Error processing event` },
        { status: 500 }
      );
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
