import { Client } from "@hubspot/api-client";

export const client = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});
