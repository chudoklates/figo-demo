"use server";

import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "next/link";

import { SubscriptionCard } from "@/components";
import Stripe from "stripe";

export default async function SelectedPlan({
  product,
}: {
  product: Stripe.Product | null;
}) {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 370,
          backgroundImage: 'url("/ellipse-2.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            width: 370,
            height: 490,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {product && <SubscriptionCard readOnly product={product} centered />}
        </Box>
      </Box>
      <Link href="/app/mitgliedschaft" replace>
        <Typography
          sx={{
            color: "grey.800",
            fontWeight: 700,
          }}
        >
          Andere Abonnement wählen
        </Typography>
      </Link>
    </React.Fragment>
  );
}
