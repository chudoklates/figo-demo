"use server";

import { client } from "@/lib/crm";
import { AssociationTypes } from "@hubspot/api-client";
import { SimplePublicObjectWithAssociations } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { AssociationSpecAssociationCategoryEnum as AssociationCategories } from "@hubspot/api-client/lib/codegen/crm/deals";

export const createContact = async (
  email: string,
  properties: {
    [key: string]: any;
  }
) => {
  const response = await client.crm.contacts.basicApi.create({
    properties: {
      email,
      ...properties,
    },
  });

  return response;
};

export const updateContact = async (
  email: string,
  properties: {
    [key: string]: any;
  }
) => {
  const response = await client.crm.contacts.basicApi.update(
    email,
    {
      properties,
    },
    "email"
  );

  return response;
};

export const getContactByEmail = async (email: string) => {
  try {
    const response = await client.crm.contacts.basicApi.getById(
      email,
      ["email", "lifecyclestage", "zip", "firstname", "lastname"],
      undefined,
      ["deals"],
      undefined,
      "email"
    );

    return response;
  } catch (error) {
    return null;
  }
};

export const createDeal = async (
  contactId: string,
  properties: {
    [key: string]: any;
  }
) => {
  const response = await client.crm.deals.basicApi.create({
    properties: {
      ...properties,
    },
    associations: [
      {
        to: {
          id: contactId,
        },
        types: [
          {
            associationCategory: AssociationCategories.HubspotDefined,
            associationTypeId: AssociationTypes.dealToContact,
          },
        ],
      },
    ],
  });

  return response;
};

export const getDealsForContact = async (
  contact: SimplePublicObjectWithAssociations
) => {
  const { associations } = contact;

  if (!associations?.deals) return [];

  const dealIds = associations.deals.results;

  const deals = await client.crm.deals.batchApi.read(
    {
      inputs: dealIds,
      properties: ["dealname", "dealstage", "event_date_and_time"],
      propertiesWithHistory: [],
    },
    false
  );

  return deals.results;
};

export const updateDeal = async (
  dealId: string,
  properties: {
    [key: string]: any;
  }
) => {
  const response = await client.crm.deals.basicApi.update(dealId, {
    properties,
  });

  return response;
};
