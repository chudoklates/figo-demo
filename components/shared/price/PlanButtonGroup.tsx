"use client";

import { ProductContext } from "@/lib/context/ProductContext";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import Stripe from "stripe";

export default function PlanButtonGroup({
  products,
}: {
  products: Stripe.Product[];
}) {
  const { type, selectedPlan, setSelectedPlan } = useContext(ProductContext);

  const filteredProducts = products
    .filter((p) => (p.default_price as Stripe.Price).type === type)
    .sort((a, b) => {
      return parseInt(a.metadata.credits) - parseInt(b.metadata.credits);
    });

  return (
    <ToggleButtonGroup
      sx={{
        marginX: "auto !important",
        pb: 3,
        display: { xs: "inline-flex", lg: "none" },
        maxWidth: 580,
      }}
      color="primary"
      exclusive
      value={selectedPlan}
      onChange={(_e, value) => value !== null && setSelectedPlan(value)}
      aria-label="Mitgliedschaft"
      fullWidth
    >
      {filteredProducts.map((product) => (
        <ToggleButton key={product.id} value={product} size="large">
          {product.metadata.credits}
          {type === "recurring" ? "/Mo" : ""}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
