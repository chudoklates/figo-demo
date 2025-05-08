"use server";

import {
  API_GET_ACTIVITY,
  API_LIST_ACTIVITIES,
} from "@/graphql/queries/activities";
import { ActivityRaw } from "@/graphql/types/activities";
import { Pagination } from "@/graphql/types/misc";
import { getClient } from "@/lib/apolloServerClient";

export const loginRandevuAPIUser = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_RANDEVU_API_URL as string,
    {
      next: {
        revalidate: 600,
      },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-randevu-key": process.env.NEXT_PUBLIC_RANDEVU_API_TOKEN,
      } as HeadersInit,
      body: JSON.stringify({
        query: /* GraphQL */ `
          mutation loginAPIUser($username: String!, $password: String!) {
            loginAPIUser(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: {
          username: process.env.RANDEVU_API_USER,
          password: process.env.RANDEVU_API_PASSWORD,
        },
      }),
    }
  ).then((res) => res.json());

  const { data, errors } = response;

  if (errors) throw new Error(errors[0].message);

  const token = data?.loginAPIUser?.token as string;

  if (!token) throw new Error("No token received from Randevu API");

  return token;
};

export const getRandevuParticipant = async (token: string, id: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_RANDEVU_API_URL as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-randevu-key": process.env.NEXT_PUBLIC_RANDEVU_API_TOKEN,
        authorization: token,
      } as HeadersInit,
      cache: "no-store",
      body: JSON.stringify({
        query: /* GraphQL */ `
          query getParticipant($id: ID!) {
            getParticipant(id: $id) {
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
        `,
        variables: {
          id,
        },
      }),
    }
  ).then((res) => res.json());

  const { data, errors } = response;

  if (errors)
    throw new Error(`Failed to get participant ${id}: ${errors[0].message}`);

  return data.getParticipant;
};

export const updateRandevuParticipant = async (
  token: string,
  id: string,
  fields: { tech_name: string; value: any }[]
) => {
  const response = await fetch(
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
          mutation updateParticipant($id: ID!, $fields: [FieldInput!]) {
            updateParticipant(id: $id, fields: $fields)
          }
        `,
        variables: {
          id,
          fields,
        },
      }),
    }
  ).then((res) => res.json());

  const { data, errors } = response;

  if (errors)
    throw new Error(`Failed to update participant ${id}: ${errors[0].message}`);

  return data.updateParticipant;
};

export const updateRandevuSupply = async (
  token: string,
  id: string,
  fields: { tech_name: string; value: any }[]
) => {
  const response = await fetch(
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
          mutation updateSupply($id: ID!, $fields: [FieldInput!]) {
            updateSupply(id: $id, fields: $fields)
          }
        `,
        variables: {
          id,
          fields,
        },
      }),
    }
  ).then((res) => res.json());

  const { data, errors } = response;

  if (errors)
    throw new Error(`Failed to update supply ${id}: ${errors[0].message}`);

  return data.updateSupply;
};

export async function getActivityData(id: string) {
  let data:
    | {
        getSupply: ActivityRaw;
      }
    | undefined;

  try {
    const token = await loginRandevuAPIUser();
    ({ data } = await getClient().query<{
      getSupply: ActivityRaw;
    }>({
      query: API_GET_ACTIVITY,
      variables: {
        id,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
    }));
  } catch (error) {
    console.error(`Error fetching activity ${id}: ${error}`);
    console.log(error);
  }

  return data?.getSupply;
}

export async function getAllActivities() {
  const activities: ActivityRaw[] = [];

  const fetchActivities = async (cursor?: string) => {
    try {
      const token = await loginRandevuAPIUser();
      const { data } = await getClient().query<{
        getSuppliesNew: Pagination<ActivityRaw>;
      }>({
        query: API_LIST_ACTIVITIES,
        variables: {
          supply_tech_name: "activity",
          where: {
            status: "ONBOARDED",
            is_active: true,
          },
          first: 50,
          ...(cursor && {
            after: cursor,
          }),
        },
        context: {
          headers: {
            authorization: token,
          },
        },
      });

      if (!data) return;

      const { edges, page_info } = data.getSuppliesNew;

      activities.push(...edges.map((edge) => edge.node));

      const { has_next_page, end_cursor } = page_info;

      if (has_next_page) {
        await fetchActivities(end_cursor);
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  await fetchActivities();

  return activities;
}
