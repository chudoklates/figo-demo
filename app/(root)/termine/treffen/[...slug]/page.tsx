import React from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";

import type { Event } from "@/graphql/types/event";

import {
  getAllTimeslotsSlugs,
  getTimeslotBySlug,
  getUpcomingTimeslotForRestaurant,
} from "@/app/actions/cms";

import {
  ContentfulImage,
  MapDisplay,
  PageContainer,
  StickyFooter,
  UpcomingEventsSection,
  DraftModeButton,
} from "@/components";
import { RichText } from "@/components/cms/RichText";
import EventInfo from "./components/EventInfo";
import BookToolbar from "./components/BookToolbar";
import LocationLink from "./components/LocationLink";
import { Metadata } from "next";
import { getLocationInfoForCoordinates } from "@/app/actions/geo";

export default async function EventPage({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}) {
  const { slug } = await params;

  if (slug.length === 1) {
    const timeslot = await getUpcomingTimeslotForRestaurant(slug[0]);

    redirect(`/termine/treffen/${timeslot?.slug || ""}`);
  }

  const { isEnabled } = await draftMode();

  const timeslot = await getTimeslotBySlug(slug.join("/"));

  const restaurant = timeslot?.restaurant;

  if (!timeslot || !restaurant) {
    notFound();
  }

  const { locationInfo } = await getLocationInfoForCoordinates(
    restaurant.location,
    restaurant.placeId
  );

  const event: Event = {
    ...timeslot,
    ...restaurant,
    timeSlotId: timeslot.sys.id,
    location: locationInfo,
    restaurant,
  };

  return (
    <PageContainer
      noPadding
      containerOverrides={{
        maxWidth: false,
        disableGutters: true,
        sx: {
          bgcolor: "white",
        },
      }}
    >
      <Container>
        <Stack spacing={5} sx={{ py: { xs: 5, lg: 10 } }}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 240, lg: 320 },
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {restaurant?.restaurantImage?.url && (
              <ContentfulImage
                src={restaurant.restaurantImage.url}
                alt={restaurant.restaurantImage.title || ""}
                fill
                priority
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>
          <EventInfo event={event} />
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              Über dieses Treffen
            </Typography>
            {event.richDescription ? (
              <RichText content={event.richDescription} />
            ) : (
              <DefaultDescription />
            )}
          </Box>
          <Divider flexItem />
          <Stack spacing={3.75}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Standort
              </Typography>
              <LocationLink event={event} />
            </Box>
            <MapDisplay location={restaurant?.location} />
          </Stack>
        </Stack>
      </Container>
      <StickyFooter>
        <BookToolbar event={event} />
      </StickyFooter>
      <Box sx={{ bgcolor: "beige.light" }}>
        <UpcomingEventsSection draft={isEnabled} exclude={timeslot.sys.id} />
      </Box>
      <DraftModeButton
        isEnabled={isEnabled}
        pathname={`/termine/treffen/${slug.join("/")}`}
      />
    </PageContainer>
  );
}

function DefaultDescription() {
  return (
    <React.Fragment>
      <Typography>
        Figo Social organisiert Treffen für Menschen ab 60 Jahren in kleinen,
        harmonischen Gruppen, um anregende Gespräche und gesellige Momente zu
        genießen. Zwischen 4 und 6 Personen werden sich hier treffen, um
        gemeinsam zu essen!
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Was erwartet Sie?
      </Typography>
      <Typography>
        Nach der Buchung erhalten Sie eine Bestätigung und einige Tage vor dem
        Treffen eine Erinnerung. Wenn Sie ankommen, fragen Sie nach dem unter
        Figo reservierten Tisch und lernen Sie die anderen Teilnehmer kennen!
        Jetzt anmelden und neue Freundschaften knüpfen!
      </Typography>
    </React.Fragment>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const timeslot = await getTimeslotBySlug(slug.join("/"));
  const restaurant = timeslot?.restaurant;

  if (!timeslot || !restaurant) {
    return {};
  }

  const startDate = new Date(timeslot.startDate);

  const pageTitle = `${restaurant.name} - ${startDate.toLocaleDateString(
    "de-DE",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  )} · ${startDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  })} Uhr`;

  return {
    title: {
      absolute: pageTitle,
    },
    ...(restaurant?.restaurantImage?.url && {
      openGraph: {
        images: [
          {
            url: restaurant.restaurantImage.url,
            alt: restaurant.restaurantImage.title,
          },
        ],
      },
    }),
  };
}

export async function generateStaticParams() {
  const result = await getAllTimeslotsSlugs();

  const params = result.map(({ slug }) => ({
    slug: slug.split("/"),
  }));

  return params;
}
