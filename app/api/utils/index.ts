import {
  getContactByEmail,
  updateContact,
  createContact,
  createDeal,
  getDealsForContact,
  updateDeal,
} from "@/app/actions/hubspot";
import {
  HUBSPOT_CONTACT_LIFECYCLE_STAGES,
  HUBSPOT_DEAL_PIPELINE,
  HUBSPOT_DEAL_STAGES,
} from "@/lib/crm/constants";
import { SimplePublicObjectWithAssociations } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { SimplePublicObject } from "@hubspot/api-client/lib/codegen/crm/deals";

export async function createOrUpdateHubspotContact(
  customerProperties: { [x: string]: any },
  dealProperties: { [x: string]: any }
) {
  const {
    email,
    firstname,
    lastname,
    full_name,
    zip,
    last_event_booked,
    last_event_booked_time__text_,
    last_booking_made,
    restaurant_name,
    restaurant_address,
    latest_seats_purchased,
    hs_whatsapp_phone_number,
  } = customerProperties;

  const {
    dealname,
    amount,
    event_date_and_time,
    restaurant,
    address,
    seats_purchased,
    createdate,
    closedate,
  } = dealProperties;

  const existingContact = await getContactByEmail(email);

  if (existingContact) {
    const deal = await updateOrCreateDealForExistingUser(
      existingContact,
      dealProperties
    );

    console.log(`Updating existing contact: ${existingContact.id}`);

    const contact = await updateContact(email, {
      // Only update name & PLZ if none available
      ...(!existingContact.properties.firstname && { firstname, lastname }),
      ...(!existingContact.properties.zip && { zip }),
      hs_whatsapp_phone_number,
      last_event_booked,
      last_event_booked_time__text_,
      last_booking_made,
      lifecyclestage: HUBSPOT_CONTACT_LIFECYCLE_STAGES.Customer,
      restaurant_name,
      restaurant_address,
      latest_seats_purchased,
    });

    return {
      contact,
      deal,
    };
  }

  const contact = await createContact(email, {
    firstname,
    lastname,
    full_name,
    zip,
    last_event_booked,
    last_event_booked_time__text_,
    last_booking_made,
    lifecyclestage: HUBSPOT_CONTACT_LIFECYCLE_STAGES.Customer,
    restaurant_name,
    restaurant_address,
    latest_seats_purchased,
    hs_whatsapp_phone_number,
  });

  console.log(`Created contact: ${contact.id}`);

  const deal = await createDeal(contact.id, {
    dealname,
    pipeline: HUBSPOT_DEAL_PIPELINE,
    dealstage: HUBSPOT_DEAL_STAGES["Payment Completed"],
    dealtype: "newbusiness",
    amount,
    event_date_and_time,
    restaurant,
    address,
    seats_purchased,
    createdate,
    closedate,
  });

  console.log(`Created deal: ${deal.id}`);

  return {
    contact,
    deal,
  };
}

async function updateOrCreateDealForExistingUser(
  existingContact: SimplePublicObjectWithAssociations,
  dealProperties: { [x: string]: any }
) {
  const {
    dealname,
    amount,
    event_date_and_time,
    restaurant,
    address,
    seats_purchased,
    createdate,
    closedate,
  } = dealProperties;

  const deals = await getDealsForContact(existingContact);

  const relatedDeal = findRelatedDeal(deals, event_date_and_time);

  if (relatedDeal) {
    console.log(`Updating existing deal: ${relatedDeal.id}`);

    const deal = await updateDeal(relatedDeal.id, {
      dealstage: HUBSPOT_DEAL_STAGES["Payment Completed"],
      amount,
      closedate,
      seats_purchased,
      event_date_and_time,
      restaurant,
      address,
    });

    return deal;
  }

  console.log(`Creating new deal for existing contact: ${existingContact.id}`);

  const deal = await createDeal(existingContact.id, {
    dealname,
    pipeline: HUBSPOT_DEAL_PIPELINE,
    dealstage: HUBSPOT_DEAL_STAGES["Payment Completed"],
    dealtype: deals.length === 0 ? "newbusiness" : "existingbusiness",
    amount,
    createdate,
    closedate,
    event_date_and_time,
    restaurant,
    address: address,
    seats_purchased,
  });

  console.log(`Created deal: ${deal.id}`);

  return deal;
}

function findRelatedDeal(deals: SimplePublicObject[], timestamp: string) {
  if (deals.length === 0) return null;

  const activeDeals = deals
    .map((deal) => ({
      ...deal,
      properties: {
        dealstage: Number(deal.properties.dealstage),
        event_date_and_time: deal.properties.event_date_and_time!,
      },
    }))
    .filter(
      (deal) =>
        deal.properties.dealstage < HUBSPOT_DEAL_STAGES["Payment Completed"]
    );

  if (activeDeals.length === 0) return null;

  const eventDeal = activeDeals.find(
    (deal) => deal.properties.event_date_and_time === timestamp
  );

  return eventDeal || null;
}
