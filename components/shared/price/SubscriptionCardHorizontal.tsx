"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircle } from "@mui/icons-material";

import clsx from "clsx";

import BestValueLabel from "./BestValueLabel";
import {
  PriceDisplayProps,
  SubscriptionCardHorizontalProps,
} from "@/types/subscription";
import Stripe from "stripe";

const StyledCard = styled(Card)(({ theme, className }) => {
  const borderColor = className?.includes("blueBorder")
    ? theme.palette.primary.main
    : className?.includes("active")
    ? theme.palette.secondary.main
    : theme.palette.grey[500];

  return {
    boxSizing: "border-box",
    height: "100%",
    borderRadius: 20,
    cursor: "pointer",
    border: `2px solid ${borderColor}`,
    position: "relative",
    overflow: "visible",
    display: "flex",
    flexDirection: "row",
    transition: "border-color 0.2s ease-in-out",
    textAlign: "center",
    minHeight: 200,

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3),
      flexDirection: "column",
      height: "auto",
    },

    "& svg.big-check": {
      position: "absolute",
      top: 75,
      left: -27.5,
      zIndex: 1,
      borderRadius: "50%",
      width: 50,
      height: 50,

      [theme.breakpoints.down("md")]: {
        top: -26,
        left: 0,
        right: 0,
        margin: "0 auto",
      },
    },

    "& svg": {
      color: className?.includes("blueBorder")
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
      width: 26,
      height: 26,
    },

    "& .MuiCardContent-root": {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    "& h3": {
      transition: "color 0.2s ease-in-out",
    },

    "&:hover": {
      opacity: 0.8,
    },

    "&.active": {
      border: `4px solid ${borderColor}`,
    },

    "&.readOnly": {
      cursor: "default",
      border: `4px solid ${borderColor}`,
    },
  };
});

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  return (
    <Stack
      sx={{
        minWidth: "max-content",
      }}
    >
      <Typography variant="h1" component="p">
        {price.toFixed(0)}€
        <Typography variant="subtitle1" component="span" aria-label="pro Monat">
          /mo
        </Typography>
      </Typography>
    </Stack>
  );
};

export default function SubscriptionCardHorizontal({
  readOnly,
  active,
  selected,
  setSelected,
  product,
  upcomingDate,
}: SubscriptionCardHorizontalProps) {
  const label = product.metadata?.label;
  const price = product.default_price as Stripe.Price;

  const blueBorder = label === "Bester Wert";

  return (
    <StyledCard
      className={clsx({ active: active || selected, readOnly, blueBorder })}
      onClick={() => setSelected?.()}
      variant="outlined"
    >
      {blueBorder && <BestValueLabel label={label} />}
      {selected && <CheckCircle className="big-check" />}
      <Box
        sx={{
          minHeight: "100%",
          bgcolor: { xs: "transparent", md: active ? "grey.500" : "grey.400" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: { md: "20%", lg: "30%" },
          borderRadius: active ? "16px 0 0 16px" : "18px 0 0 18px",
        }}
      >
        {active && <Typography variant="h6">Aktuell: </Typography>}
        {upcomingDate && (
          <Typography variant="h6">Ab dem {upcomingDate}</Typography>
        )}
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
      </Box>
      <CardContent sx={{ p: 0, pb: "0 !important", width: "100%" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, lg: 3 }}
          sx={{
            px: { xs: 0, sm: 3 },
            alignItems: "center",
            justifyContent: "space-evenly",
            minHeight: "inherit",
          }}
        >
          <PriceDisplay price={Number(price.unit_amount_decimal) / 100} />
          <Stack
            direction={{ xs: "column", md: "column-reverse" }}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Divider flexItem sx={{ display: { xs: "block", md: "none" } }} />
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <CheckCircle />
              <Typography variant="h5">{product.description}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}
