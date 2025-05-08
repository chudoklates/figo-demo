"server-only";

import { createClient } from "contentful-management";

// Default locale for contentful operations
export const DEFAULT_LOCALE = "de-DE";

// Contentful space and environment configuration
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "";
const ENVIRONMENT_ID =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "staging";

// Initialize the Contentful Management client
export const contentfulManagementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || "",
});

/**
 * Get the Contentful environment for the configured space
 */
export async function getContentfulEnvironment() {
  const space = await contentfulManagementClient.getSpace(SPACE_ID);
  return space.getEnvironment(ENVIRONMENT_ID);
}
