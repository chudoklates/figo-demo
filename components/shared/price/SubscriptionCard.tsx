"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import clsx from "clsx";

import { SubscriptionCardProps, PriceDisplayProps } from "@/types/subscription";
import { Divider } from "@mui/material";
import React from "react";
import { CheckCircleRounded } from "@mui/icons-material";
import Stripe from "stripe";

const OneTimeLabel = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.primary.main,
  fontSize: 20,
  lineHeight: "20px",
  textAlign: "center",
  fontWeight: 500,
  boxSizing: "border-box",
  height: "auto",
  width: "100%",
  whiteSpace: "wrap",

  "& .MuiChip-label": {
    whiteSpace: "wrap",
    overflow: "visible",
  },

  "&:hover": {
    backgroundColor: theme.palette.grey[400],
  },

  "&.isNotRedeemable": {
    color: theme.palette.grey[900],
  },
}));

const StyledLabel = styled(Chip)(({ theme }) => {
  return {
    // override default MuiChip styles
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    transition: "none",
    "& .MuiChip-label": {
      whiteSpace: "wrap",
      overflow: "visible",
    },

    position: "absolute",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 20,
    lineHeight: "20px",
    textAlign: "center",
    fontWeight: 600,

    left: -3,
    top: -3,
    padding: 0,
    boxSizing: "content-box",
    borderRadius: "15px 15px 0 0",
    border: `3px solid ${theme.palette.primary.main}`,
    width: "100%",
  };
});

const StyledCard = styled(Card)(({ theme }) => {
  return {
    boxSizing: "border-box",
    height: "100%",
    borderRadius: 15,
    cursor: "pointer",
    border: `3px solid ${theme.palette.grey[700]}`,
    position: "relative",
    overflow: "visible",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
    maxWidth: 580,
    margin: "0 auto",

    "& .MuiCardContent-root": {
      height: "100%",
    },

    "& svg": {
      color: theme.palette.primary.main,

      "&.big-check": {
        display: "none",
        position: "absolute",
        bottom: -28,
        left: 0,
        right: 0,
        margin: "0 auto",
        zIndex: 1,
        borderRadius: "50%",
        backgroundColor: "white",
        width: 56,
        height: 56,

        [theme.breakpoints.up("lg")]: {
          display: "block",
        },
      },
    },

    "&:hover": {
      border: `3px solid ${theme.palette.primary.main}`,
    },

    [theme.breakpoints.up("lg")]: {
      "&.selected": {
        border: `3px solid ${theme.palette.primary.main}`,
        transform: "scale(1.07)",
        zIndex: 1,
      },
    },

    "&.readOnly": {
      border: `3px solid ${theme.palette.grey[700]}`,
      backgroundColor: "transparent",
      cursor: "default",
      transform: "none",

      "&:hover": {
        border: `3px solid ${theme.palette.grey[700]}`,
      },
    },

    "&.centered": {
      border: `3px solid ${theme.palette.primary.main}`,
      backgroundColor: "#FFFBF7",
    },

    "&.isNotRedeemable": {
      opacity: 0.7,
    },

    "&.active": {
      border: `3px solid ${theme.palette.primary.main}`,

      "&:hover": {
        border: `3px solid ${theme.palette.primary.main}`,
      },
    },
  };
});

const BulletPoint = ({ label }: { label: string }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      <CheckCircleRounded />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          textAlign: "left",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

const PriceDisplay = ({ price, recurring }: PriceDisplayProps) => {
  return (
    <Stack>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 40, lg: 60 },
          lineHeight: { xs: "28px", lg: "60px" },
        }}
      >
        {price.toFixed(0)} €
        {recurring && (
          <Typography
            variant="subtitle1"
            component="span"
            aria-label="pro Monat"
            sx={{
              color: "text.primary",
            }}
          >
            /Mo
          </Typography>
        )}
      </Typography>
    </Stack>
  );
};

const ONE_MONTH_IN_SECONDS = 2.63e6;

export default function SubscriptionCard({
  readOnly,
  active,
  selected,
  setSelected,
  upcomingDate,
  centered = false,
  isNotRedeemable = false,
  product,
}: SubscriptionCardProps) {
  const price = product.default_price as Stripe.Price;

  const recurring = price.type === "recurring";

  const label = getLabel({ active, upcomingDate });

  const validFor = Math.floor(
    Number(product.metadata.expiration_period) / ONE_MONTH_IN_SECONDS
  );

  const isFigo3 =
    product.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID;

  return (
    <StyledCard
      className={clsx({
        active,
        selected,
        readOnly,
        centered,
        isNotRedeemable,
      })}
      onClick={() => setSelected?.()}
      variant="outlined"
    >
      {selected && <CheckCircleRounded className="big-check" />}
      {label && <StyledLabel label={label} clickable={false} />}
      <CardContent>
        <Stack
          spacing={2}
          sx={{
            pt: 5,
            px: 1,
            pb: 1,
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: 36,
              lineHeight: "38px",
            }}
          >
            {product.name}
          </Typography>
          <PriceDisplay
            price={Number(price.unit_amount_decimal) / 100}
            recurring={recurring}
          />
          <Stack spacing={1}>
            <Divider flexItem />
            <Typography variant="h5">{product.description}</Typography>
            <Divider flexItem />
          </Stack>
          <Stack
            spacing={{ xs: 1, lg: 2 }}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <BulletPoint label={price.metadata.saving} />
            {!recurring && (
              <BulletPoint
                label={`Gültig für ${validFor} Monat${
                  validFor === 1 ? "" : "e"
                }`}
              />
            )}
            {!isFigo3 && (
              <BulletPoint
                label={
                  recurring
                    ? "Monatlich kündbar"
                    : "Keine automatische Verlängerung"
                }
              />
            )}
          </Stack>
          {isFigo3 && (
            <OneTimeLabel
              className={clsx({ isNotRedeemable })}
              clickable={false}
              label={
                isNotRedeemable
                  ? "Wurde schon benutzt"
                  : "*Angebot für Neukunden"
              }
            />
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

function getLabel({
  active,
  upcomingDate,
}: {
  active?: boolean;
  upcomingDate?: string;
}) {
  if (upcomingDate) return `Ab dem ${upcomingDate}`;

  if (active) return "Laufendes Abo";

  return null;
}
