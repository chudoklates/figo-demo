import { Container, Divider, Stack } from "@mui/material";

import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { GET_POST_BY_SLUG } from "@/graphql/queries/blog";
import { BlogPostCollection } from "@/graphql/types/blog";

import { contentfulClient } from "@/lib/cms";

import { ContentfulImage, PageContainer, DraftModeButton } from "@/components";
import { RichText } from "@/components/cms/RichText";
import ArticleHeader from "./components/ArticleHeader";
import AuthorBio from "./components/AuthorBio";
// import ArticleControls from "./components/ArticleControls";
import RelatedArticles from "./components/RelatedArticles";
import { getAllBlogArticleSlugs } from "@/app/actions/cms";

export default async function BlogPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient
    .getClient()
    .query<
      { pageBlogPostCollection?: BlogPostCollection },
      { slug: string; preview: boolean }
    >({
      query: GET_POST_BY_SLUG,
      variables: {
        slug,
        preview: isEnabled,
      },
      context: {
        draft: isEnabled,
      },
    });

  const post = data?.pageBlogPostCollection?.items?.[0];

  if (!post) {
    notFound();
  }

  return (
    <PageContainer
      noPadding
      containerOverrides={{
        maxWidth: false,
        disableGutters: true,
        component: "article",
      }}
    >
      <ArticleHeader post={post} />
      <Stack
        sx={{ pt: 7.5, pb: 10, width: "100%", alignItems: "center" }}
        spacing={7.5}
      >
        {post.featuredImage?.url && (
          <Container maxWidth="md">
            <ContentfulImage
              src={post.featuredImage.url}
              alt={post.featuredImage.title}
              width={800}
              height={400}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </Container>
        )}
        <Container maxWidth="md">
          <RichText content={post.content} />
        </Container>
        <AuthorBio post={post} />
        {/* <ArticleControls /> */}
      </Stack>
      <Divider />
      <RelatedArticles post={post} />
      <DraftModeButton isEnabled={isEnabled} pathname={`/blog/post/${slug}`} />
    </PageContainer>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient
    .getClient()
    .query<{ pageBlogPostCollection?: BlogPostCollection }>({
      query: GET_POST_BY_SLUG,
      variables: {
        slug,
        preview: isEnabled,
      },
      context: {
        draft: isEnabled,
      },
    });

  const post = data?.pageBlogPostCollection?.items?.[0];

  if (!post) {
    return {};
  }

  return {
    title: post.seoFields?.pageTitle,
    description: post.seoFields?.pageDescription,
    ...(post.featuredImage && {
      openGraph: {
        images: [
          {
            url: post.featuredImage?.url,
            alt: post.featuredImage?.title,
          },
        ],
      },
    }),
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogArticleSlugs();

  const params = slugs.map(({ slug }) => ({
    slug,
  }));

  return params;
}
