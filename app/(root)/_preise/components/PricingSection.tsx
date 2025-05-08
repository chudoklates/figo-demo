"use client";

import { ProductTypeButtonGroup, ReadOnlyProductList } from "@/components";
import { ProductType, ProductContext } from "@/lib/context/ProductContext";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import Stripe from "stripe";

export default function PricingSection({
  products,
}: {
  products: Stripe.Product[];
}) {
  const [type, setType] = useState<ProductType>("recurring");
  const [selectedPlan, setSelectedPlan] = useState<Stripe.Product | null>(
    products.find((p) => p.metadata.credits === "4") || null
  );
  const [coupon, setCoupon] = useState<Stripe.Coupon | null>(null);

  return (
    <ProductContext.Provider
      value={{
        type,
        setType,
        selectedPlan,
        setSelectedPlan,
        coupon,
        setCoupon,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          lineHeight: "18px",
          fontWeight: 500,
          display: { xs: "block", lg: "none" },
          textAlign: "center",
        }}
      >
        1. Wählen Sie Ihre Tarifoption
      </Typography>
      <ProductTypeButtonGroup />
      <Typography
        sx={{
          fontSize: 18,
          lineHeight: "18px",
          fontWeight: 500,
          display: { xs: "block", lg: "none" },
          textAlign: "center",
        }}
      >
        2. An wie viele Aktivitäten möchten Sie teilnehmen?
      </Typography>
      <ReadOnlyProductList products={products} />
    </ProductContext.Provider>
  );
}
