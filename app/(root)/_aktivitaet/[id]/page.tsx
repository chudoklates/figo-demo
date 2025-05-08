import React from "react";

import type { Metadata } from "next";
import Image from "next/image";
import { Box, Container, Stack, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import { getActivityData, getAllActivities } from "@/app/actions/randevu";

import { PageContainer, TopActivities, MapDisplay } from "@/components";
import { getActivity, getActivityLocationString } from "@/utils/activity";
import { getProviderInfo } from "./utils/provider";
import ActivityInfo from "./components/ActivityInfo";
import BookingForm from "./components/BookingForm";
import { ActivityPageProps } from "./types";
import { redirect } from "next/navigation";
import Reviews from "./components/Reviews";

export default async function ActivityPage(props: ActivityPageProps) {
  const params = await props.params;
  const id = `spl-${Buffer.from(
    params.id.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("hex")}`;

  const rawActivity = await getActivityData(id);

  if (!rawActivity?.is_active) {
    redirect("/404");
  }

  const activity = getActivity(rawActivity);

  const { provider: providerInfo } = activity;

  const provider = getProviderInfo(providerInfo!);

  return (
    <PageContainer
      boxOverrides={{ sx: { pt: { xs: 7, sm: 8.25, md: 14 } } }}
      containerOverrides={{ maxWidth: "lg", disableGutters: true }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 400 },
          mb: 3,
          mx: { xs: 0, md: 3 },
        }}
      >
        <Image
          src={activity.mainImage?.url || ""}
          alt={activity.meta?.image_alt || activity.description}
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1200px) 100vw, 1152px"
        />
      </Box>
      <Box
        sx={{
          borderRadius: { xs: "30px", md: 0 },
          mt: { xs: -6, md: 0 },
          pt: { xs: 4, md: 0 },
          bgcolor: "white",
          zIndex: 1,
          position: { xs: "relative", md: "static" },
        }}
      >
        <Container>
          <Stack spacing={5}>
            <Typography
              variant="h1"
              sx={{
                mb: { xs: 3, md: 6 },
              }}
            >
              {activity.name}
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={8}
              sx={{
                justifyContent: "space-between",
                pb: 5,
                alignItems: { xs: "stretch", md: "flex-start" },
              }}
            >
              <ActivityInfo provider={provider} activity={activity} />
              <BookingForm activity={activity} />
            </Stack>

            <Typography variant="h3">Standort</Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                color: "grey.800",
              }}
            >
              <LocationOn />
              <Typography>{getActivityLocationString(activity)}</Typography>
            </Stack>
            <MapDisplay location={activity.location} />

            {activity.howToGetThere ? (
              <React.Fragment>
                <Typography variant="h3">Wegbeschreibung</Typography>
                <Typography
                  variant="bodyLarge"
                  sx={{
                    pb: 4,
                    wordWrap: "break-word",
                  }}
                >
                  {activity.howToGetThere}
                </Typography>
              </React.Fragment>
            ) : null}

            <Reviews activity={activity} provider={provider} />
            <TopActivities
              heading="Das könnte Ihnen auch gefallen...."
              showTip={false}
              currentActivity={activity.id}
            />
          </Stack>
        </Container>
      </Box>
    </PageContainer>
  );
}

export async function generateStaticParams() {
  const activities = await getAllActivities();

  const params = activities.map((activity) => ({
    id: Buffer.from(activity.id.split("-")[1], "hex").toString("base64url"),
  }));

  return params;
}

export async function generateMetadata(
  props: ActivityPageProps
): Promise<Metadata> {
  const params = await props.params;
  const id = `spl-${Buffer.from(
    params.id.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("hex")}`;

  const rawActivity = await getActivityData(id);

  if (!rawActivity?.is_active) {
    return {};
  }

  const activity = getActivity(rawActivity);

  const { meta, name, description, mainImage } = activity;

  const image = meta?.image || mainImage;

  return {
    title: meta?.title
      ? {
          absolute: meta.title,
        }
      : name,
    description: meta?.description || description,
    ...(image && {
      openGraph: {
        images: [
          {
            url: image.url,
            alt: meta?.image_alt || activity.description,
          },
        ],
      },
    }),
  };
}
