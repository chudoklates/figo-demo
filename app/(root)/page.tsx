import { GET_HOMEPAGE } from "@/graphql/queries/landing";
import { Collection, Homepage } from "@/graphql/types/cms";
import { DynamicContent, DraftModeButton } from "@/components";
import { contentfulClient } from "@/lib/cms";
import { Stack } from "@mui/material";
import { Metadata } from "next";
import { draftMode } from "next/headers";

export default async function Home({
  searchParams: _,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { isEnabled } = await draftMode();

  // const searchParams = await searchParamsPromise;

  const { data } = await contentfulClient.query<{
    pageLandingCollection: Collection<Homepage>;
  }>({
    query: GET_HOMEPAGE,
    variables: { preview: isEnabled },
    context: {
      draft: isEnabled,
    },
  });

  const page = data?.pageLandingCollection?.items?.[0];

  if (!page) {
    throw new Error("Homepage not found");
  }

  const { contentCollection: content } = page;

  return (
    <Stack
      sx={{
        width: "100%",
      }}
      component="main"
    >
      <DynamicContent content={content} draft={isEnabled} />
      <DraftModeButton isEnabled={isEnabled} pathname="/" />
    </Stack>
  );
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient.query<{
    pageLandingCollection: Collection<Homepage>;
  }>({
    query: GET_HOMEPAGE,
    variables: { preview: isEnabled },
    context: {
      draft: isEnabled,
    },
  });

  const page = data?.pageLandingCollection?.items?.[0];

  if (!page) return {};

  return {
    title: page.seoFields.pageTitle,
    description: page.seoFields.pageDescription,
  };
};
