"use client";

import { UserContext } from "@/lib/context/UserContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { Link, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { PropsWithChildren, useContext } from "react";
import NextLink from "next/link";
import Stripe from "stripe";
import { SubscriptionWithSchedule } from "@/types/subscription";

const PaperBlock = ({ children }: PropsWithChildren) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        py: { xs: 1, md: 2 },
        px: { xs: 1, md: 2.5 },
        borderRadius: "10px",
        justifyContent: "center",
      }}
    >
      {children}
    </Paper>
  );
};

export default function SubscriptionInfo() {
  const { user } = useContext(UserContext);

  const { product, subscription, loading } = useContext(SubscriptionContext);

  if (loading) {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
        }}
      >
        <Skeleton variant="rectangular">
          <PaperBlock>
            <Typography variant="h5">0 Aktivitäten</Typography>
            <Typography variant="subtitle1">verfügbar</Typography>
          </PaperBlock>
        </Skeleton>
        <Skeleton variant="rectangular">
          <PaperBlock>
            <Typography variant="h5">0 Aktivitäten</Typography>
            <Typography variant="subtitle1">verfügbar</Typography>
          </PaperBlock>
        </Skeleton>
      </Stack>
    );
  }

  const currentPeriodEndDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end * 1000)
    : user?.credit_expiration_date
    ? new Date(user.credit_expiration_date)
    : null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <PaperBlock>
        <Typography color="black" variant="h5">
          {user?.credits || 0} Aktivität{user?.credits === 1 ? "" : "en"}
        </Typography>
        {getSubtext(user?.credits || 0, product, subscription)}
      </PaperBlock>
      {currentPeriodEndDate ? (
        <React.Fragment>
          <PaperBlock>
            <Typography color="black" variant="h5">
              {currentPeriodEndDate?.toLocaleDateString("de-DE", {
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="subtitle1">
              {subscription ? "Zyklusverlängerung" : "Gültigkeitsdatum"}
            </Typography>
          </PaperBlock>
        </React.Fragment>
      ) : null}
    </Stack>
  );
}

function getSubtext(
  credits: number,
  product: Stripe.Product | null,
  subscription: SubscriptionWithSchedule | null
) {
  if (credits === 0) {
    return (
      <Link
        variant="subtitle1"
        href="/app/mitgliedschaft"
        component={NextLink}
        underline="always"
        sx={{
          fontWeight: 600,
        }}
      >
        {subscription ? "Jetzt erneuern" : "Abos & Karten sehen"}
      </Link>
    );
  }

  if (!product) {
    return (
      <Typography variant="subtitle1">
        Ihr Schnupperkurs ist verfügbar!
      </Typography>
    );
  }

  return (
    <Typography variant="subtitle1">
      {subscription ? "in diesem Monat übrig" : "verfügbar"}
    </Typography>
  );
}
