"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { Skeleton } from "@mui/material";

const StrokeText = styled(Typography)(({ theme }) => ({
  color: "white",
  textShadow: "-3px 4px 6px rgba(109, 100, 113, 0.40);",
  WebkitTextStroke: `4px ${theme.palette.common.white}`,
  fontWeight: 700,
  gridArea: "1/1",
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fill: theme.palette.degrade.mainGradient,
  background: theme.palette.degrade.mainGradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
  gridArea: "1/1",
}));

export default function SubscriptionText({
  short = false,
  dropdown = false,
}: {
  short?: boolean;
  dropdown?: boolean;
}) {
  const { user } = useContext(UserContext);
  const { subscription, product, loading } = useContext(SubscriptionContext);

  if (loading) {
    return <Skeleton variant="text" />;
  }

  if (!product) return null;

  const currentPeriodEndDate = subscription
    ? new Date(subscription.current_period_end * 1000)
    : user?.credit_expiration_date
    ? new Date(user.credit_expiration_date)
    : null;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
        }}
      >
        <StrokeText
          gutterBottom={!short}
          aria-hidden
          variant={short ? "h6" : "h4"}
        >
          {product.name}
        </StrokeText>
        <GradientText gutterBottom={!short} variant={short ? "h6" : "h4"}>
          {product.name}
        </GradientText>
      </Box>
      {dropdown && (
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: { xs: 250, md: "unset" },
          }}
        >
          {subscription ? `Ihr Abo erneuert sich am ` : `Ihre Karte ist bis `}
          {currentPeriodEndDate?.toLocaleDateString("de-DE", {
            month: "short",
            day: "numeric",
          })}
          {subscription ? "" : ` gültig.`}
        </Typography>
      )}
    </Box>
  );
}
