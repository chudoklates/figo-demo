import React from "react";

import {
  Box,
  Container,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";

import { Metadata } from "next";
import Image from "next/image";
import { getBlogArticlesList } from "@/app/actions/cms";

import {
  ErrorPage,
  CSSGrid,
  BlogPostCard,
  NewsletterSignup,
  DraftModeButton,
} from "@/components";
import BlogPostItemSmall from "./components/BlogPostItemSmall";
// import UpcomingEventCard from "./components/UpcomingEventCard";

import blogHero from "@/public/blog-hero.webp";
import { draftMode } from "next/headers";

export default async function Blog() {
  const { isEnabled } = await draftMode();

  const { items, error } = await getBlogArticlesList();

  if (error) {
    console.error(error);
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <Stack
        component="main"
        sx={{
          pt: 0,
          pb: { xs: 6.75, lg: 12.5 },
        }}
        spacing={5}
      >
        <Grid2 container wrap="wrap-reverse">
          <Grid2
            size={{ xs: 12, md: 7 }}
            sx={{
              bgcolor: "secondary.main",
              py: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container maxWidth="sm">
              <NewsletterSignup
                heading="Figo Blog"
                subtitle="Für alle Veranstaltungen und die Gemeinschaft. Abonnieren Sie unseren Newsletter für eine wöchentliche Zusammenfassung und exklusive Veranstaltungen."
                mainHeading
              />
            </Container>
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 5 }}
            sx={{ position: "relative", minHeight: { xs: 330, md: 758 } }}
          >
            <Image
              src={blogHero}
              alt="Mittagessen mit Freunden"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 901px) 100vw, 2048px"
            />
          </Grid2>
        </Grid2>
        <Stack spacing={5} sx={{ alignItems: "center" }}>
          <Container component={Stack} spacing={2.5}>
            <Typography variant="h2">Neueste Artikel</Typography>
            <Grid2 container spacing={2}>
              {items
                .toSorted(
                  (a, b) =>
                    new Date(b.publishedDate).getTime() -
                    new Date(a.publishedDate).getTime()
                )
                .slice(0, 3)
                .map((post) => (
                  <Grid2 key={post.sys.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <BlogPostCard post={post} />
                  </Grid2>
                ))}
            </Grid2>
          </Container>
          <Container
            component={Stack}
            spacing={2.5}
            // component={Grid2}
            // container
            // rowSpacing={7.5}
            // columnSpacing={2.5}
            // columns={30}
          >
            {/* <Grid2 size={{ xs: 12 }}> */}
            <Typography variant="h2">Beliebte Beiträge</Typography>
            <Stack
              spacing={2.5}
              direction={{ xs: "column", lg: "row" }}
              sx={{ alignItems: "flex-start" }}
            >
              {items.slice(0, 3).map((post) => (
                <React.Fragment key={post.sys.id}>
                  <BlogPostItemSmall post={post} />
                  <Divider
                    flexItem
                    sx={{ display: { xs: "flex", lg: "none" } }}
                  />
                </React.Fragment>
              ))}
            </Stack>
            {/* </Grid2> */}
            {/* <Grid2 size={{ xs: 30, lg: 19 }}>
            <Stack spacing={2.5}>
              <Typography variant="h2" sx={{ pl: { xs: 2, sm: 0 } }}>
                Veranstaltungen in diesem Monat
              </Typography>
              <UpcomingEventCard />
            </Stack>
          </Grid2> */}
          </Container>
          <Container
            component={Stack}
            spacing={2.5}
            disableGutters
            sx={{ px: { xs: 0, sm: 3 } }}
          >
            <Typography variant="h2" sx={{ pl: { xs: 2, sm: 0 } }}>
              Ausgewählte Artikel
            </Typography>
            <CSSGrid>
              {items.map((post) => (
                <Box key={post.sys.id} sx={gridTileItemSX(post.highlighted)}>
                  <BlogPostCard post={post} highlighted={post.highlighted} />
                </Box>
              ))}
            </CSSGrid>
          </Container>
        </Stack>
      </Stack>
      <DraftModeButton isEnabled={isEnabled} pathname="/blog" />
    </React.Fragment>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Figo Blog",
};

function gridTileItemSX(highlighted: boolean) {
  return {
    ...(highlighted && {
      gridColumn: {
        sm: "1 / 3",
        lg: "2 / 4",
      },
      gridRow: {
        sm: "1 / 2",
        lg: "1 / 3",
      },
    }),
    px: {
      xs: highlighted ? 0 : 2,
      sm: 0,
    },
  };
}
