"use client";

import React, { useContext, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";

import { PlanButtonGroup, SubscriptionCard } from "@/components";
import { ProductContext } from "@/lib/context/ProductContext";
import { SubscriptionBreakdownDesktop, SubscriptionBreakdownMobile } from "./";
import { ProductListProps } from "./types";
import Stripe from "stripe";
import { Skeleton } from "@mui/material";

export default function ReadOnlyProductList({ products }: ProductListProps) {
  const { type, selectedPlan, setSelectedPlan } = useContext(ProductContext);

  const filteredProducts = products
    .filter((p) => (p.default_price as Stripe.Price).type === type)
    .sort((a, b) => {
      return parseInt(a.metadata.credits) - parseInt(b.metadata.credits);
    });

  useEffect(() => {
    const middleOption = filteredProducts[1];

    if (selectedPlan === null) {
      setSelectedPlan(middleOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts, selectedPlan]);

  const displayPlan = filteredProducts.find((p) => p.id === selectedPlan?.id);

  return (
    <React.Fragment>
      <PlanButtonGroup products={products} />
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <Grid2
          container
          wrap="wrap"
          columnSpacing={2}
          sx={{
            pt: 4,
            pb: 6,
            justifyContent: "center",
          }}
        >
          {filteredProducts.map((product) => {
            return (
              <Grid2
                key={product.id}
                sx={{
                  alignItems: "center",
                }}
                size={{
                  xs: 12,
                  lg: 4,
                }}
              >
                <SubscriptionCard readOnly product={product} />
              </Grid2>
            );
          })}
        </Grid2>
        <SubscriptionBreakdownDesktop products={filteredProducts} />
      </Box>
      {displayPlan ? (
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
            width: "100%",
          }}
        >
          <SubscriptionCard
            setSelected={() => {
              const button = document.getElementById("payment-button");

              button?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            product={displayPlan}
          />
        </Box>
      ) : (
        <EmptyState height={356} />
      )}
      {displayPlan ? (
        <SubscriptionBreakdownMobile product={displayPlan} />
      ) : (
        <EmptyState height={118} />
      )}
    </React.Fragment>
  );
}

function EmptyState({ height }: { height: number }) {
  return (
    <Skeleton
      sx={{
        display: { xs: "block", lg: "none" },
        maxWidth: 580,
      }}
      width="100%"
      height={height}
      variant="rectangular"
    />
  );
}
