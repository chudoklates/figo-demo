import React from "react";
import { getCheckoutSession } from "@/app/actions/stripe";
import { redirect } from "next/navigation";
import { ErrorPage, Loading, PageContainer } from "@/components";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Stripe from "stripe";
import { Metadata } from "next";
import { getTimeslot } from "@/app/actions/cms";
import { ArrowBackRounded } from "@mui/icons-material";
import Link from "next/link";
import EventInfoCard from "./components/EventInfoCard";
import ShareButton from "./components/ShareButton";
import { getOrder } from "@/app/actions/paypal";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function PaymentPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await searchParamsPromise;

  const sessionId = searchParams["sid"];
  const orderId = searchParams["oid"];

  if (!(sessionId || orderId)) {
    redirect("/");
  }

  const result = await getConfirmationInfo({
    sessionId,
    orderId,
  });

  if (!result || !result.timeslotId || !result.seats) {
    return <Loading />;
  }

  const { timeslotId, seats } = result;

  const timeslotInfo = await getTimeslot(timeslotId);

  const restaurant = timeslotInfo?.restaurant;

  if (!restaurant || !timeslotInfo) {
    return (
      <PageContainer>
        <ErrorPage>
          Beim Abrufen der Informationen zum Treffen ist ein Fehler aufgetreten.
          Bitte versuchen Sie es später erneut.
        </ErrorPage>
      </PageContainer>
    );
  }

  const link = `/termine/treffen/${timeslotInfo.slug}`;

  return (
    <Stack>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 0,
          borderLeft: "none",
          borderRight: "none",
          border: { xs: "1px solid rgba(0, 0, 0, 0.12)", lg: "none" },
          bgcolor: { xs: "background.paper", lg: "transparent" },
        }}
      >
        <Toolbar sx={{ py: { xs: 1, lg: 5 } }}>
          <Container disableGutters maxWidth="lg">
            <Button
              variant="text"
              startIcon={<ArrowBackRounded />}
              LinkComponent={Link}
              href={link}
              color="inherit"
            >
              Zurück zum Treffen
            </Button>
          </Container>
        </Toolbar>
      </Paper>
      <PageContainer
        noPadding
        boxOverrides={{ sx: { minHeight: "unset" } }}
        containerOverrides={{ maxWidth: "md" }}
      >
        <Stack
          spacing={{ xs: 5, lg: 7.5 }}
          sx={{
            pt: { xs: 5, lg: 0 },
            pb: { xs: 10, lg: 15 },
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Ihre Buchung ist bestätigt!
            </Typography>
            <Typography>
              Tolle Wahl! Sie haben{" "}
              <strong>
                {seats} {seats === 1 ? "Platz" : "Plätze"}
              </strong>{" "}
              reserviert und wir freuen uns darauf, Sie für eine unvergessliche
              Zeit zu begrüßen.
            </Typography>
          </Box>
          <EventInfoCard restaurant={restaurant} timeSlot={timeslotInfo} />
          <ShareButton link={link} />
        </Stack>
      </PageContainer>
    </Stack>
  );
}

async function getConfirmationInfo({
  sessionId,
  orderId,
}: {
  sessionId: string;
  orderId: string;
}) {
  if (sessionId) {
    // Create a Checkout Session as soon as the page loads
    const checkoutSession = await getCheckoutSession({
      sessionId,
    });

    if (!checkoutSession) return null;

    const seats = (
      checkoutSession.line_items as Stripe.ApiList<Stripe.LineItem>
    ).data[0].quantity;

    const timeslotId = checkoutSession?.metadata?.event_id;

    return { timeslotId, seats };
  }

  const order = await getOrder(orderId);

  if (!order) return null;

  const seats = parseInt(
    order?.purchaseUnits?.[0]?.items?.[0]?.quantity || "",
    10
  );
  const timeslotId = order?.purchaseUnits?.[0]?.customId?.split(":")?.[0];

  return { timeslotId, seats };
}
