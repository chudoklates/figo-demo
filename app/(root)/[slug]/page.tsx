import {
  GET_ALL_DOCUMENTS_SLUGS,
  GET_DOCUMENT_PAGE,
} from "@/api/queries/document";
import type { Collection, DocumentPage } from "@/api/types/cms";
import { PageContainer, DraftModeButton } from "@/components";
import { RichText } from "@/components/cms/RichText";
import { contentfulClient } from "@/lib/cms";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { isEnabled } = await draftMode();

  const { slug } = await params;

  const { data } = await contentfulClient.query<
    {
      pageFaqCollection?: Collection<DocumentPage>;
    },
    { slug: string; preview: boolean }
  >({
    query: GET_DOCUMENT_PAGE,
    variables: { slug, preview: isEnabled },
    context: {
      draft: isEnabled,
    },
  });

  const page = data?.pageFaqCollection?.items?.[0];

  if (!page) {
    notFound();
  }

  return (
    <PageContainer>
      <Typography variant="h1">{page.title}</Typography>
      {page.content && <RichText content={page.content} />}
      <DraftModeButton isEnabled={isEnabled} pathname={`/${slug}`} />
    </PageContainer>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { isEnabled } = await draftMode();

  const { slug } = await params;

  const { data } = await contentfulClient.query<
    {
      pageFaqCollection?: Collection<DocumentPage>;
    },
    { slug: string; preview: boolean }
  >({
    query: GET_DOCUMENT_PAGE,
    variables: { slug, preview: isEnabled },
    context: {
      draft: isEnabled,
    },
  });

  const page = data?.pageFaqCollection?.items?.[0];

  if (!page) {
    return {};
  }

  return {
    title: page.seoFields?.pageTitle,
    description: page.seoFields?.pageDescription,
  };
}

export async function generateStaticParams() {
  const { data } = await contentfulClient.query<{
    pageFaqCollection?: Collection<{ slug: string }>;
  }>({
    query: GET_ALL_DOCUMENTS_SLUGS,
  });

  const params =
    data?.pageFaqCollection?.items?.map(({ slug }) => ({
      slug,
    })) || [];

  return params;
}
