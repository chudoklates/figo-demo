"use client";

import React, { useContext, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";

import { PlanButtonGroup, SubscriptionCard } from "@/components";
import { ProductContext } from "@/lib/context/ProductContext";
import {
  SubscriptionBreakdownDesktop,
  SubscriptionBreakdownMobile,
  LoadingState,
} from "./";
import { ProductListProps } from "./types";
import Stripe from "stripe";
import { UserContext } from "@/lib/context/UserContext";
import { retrieveCouponForUser } from "@/app/actions/stripe";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import useCannotPurchaseProduct from "@/lib/hooks/useCannotPurchaseProduct";
import { Skeleton } from "@mui/material";

export default function ProductList({ products }: ProductListProps) {
  const { user } = useContext(UserContext);
  const {
    subscription,
    product: currentProduct,
    loading,
  } = useContext(SubscriptionContext);
  const { type, selectedPlan, setSelectedPlan, coupon, setCoupon } =
    useContext(ProductContext);

  const cannotPurchaseProduct = useCannotPurchaseProduct();

  const schedulePhases = subscription?.schedule?.phases;

  useEffect(() => {
    if (user?.id && !coupon) {
      (async () => {
        setCoupon(await retrieveCouponForUser({ userId: user.id }));
      })();
    }
  }, [user?.id, setCoupon, coupon]);

  const figo3IsRedeemed = !!(
    coupon && coupon.times_redeemed === coupon.max_redemptions
  );

  const upcomingSubscriptionProductId = (
    schedulePhases?.[1]?.items[0]?.price as Stripe.Price
  )?.product as string;

  const scheduleChangeDate = schedulePhases?.[1]?.start_date
    ? new Date(schedulePhases?.[1].start_date * 1000).toLocaleDateString(
        "de-DE",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      )
    : "";

  const filteredProducts = products
    .filter((p) => (p.default_price as Stripe.Price).type === type)
    .sort((a, b) => {
      return parseInt(a.metadata.credits) - parseInt(b.metadata.credits);
    });

  const displayPlan = filteredProducts.find((p) => p.id === selectedPlan?.id);

  const cannotPurchaseDisplayPlan =
    !!displayPlan && cannotPurchaseProduct(displayPlan);

  const displayPlanIsNotRedeemable =
    figo3IsRedeemed &&
    displayPlan?.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID;

  useEffect(() => {
    const middleOption = filteredProducts[1];

    if (selectedPlan === null) {
      setSelectedPlan(middleOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts, selectedPlan]);

  if (loading) return <LoadingState />;

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
            const isNotRedeemable =
              figo3IsRedeemed &&
              product.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID;
            const active = product.id === currentProduct?.id;
            const cannotPurchase = cannotPurchaseProduct(product);
            const productIsReadOnly = cannotPurchase || isNotRedeemable;
            const upcoming = product.id === upcomingSubscriptionProductId;

            return (
              <Grid2
                key={product.id}
                sx={{
                  alignItems: "center",
                  opacity: cannotPurchase ? 0.5 : 1,
                }}
                size={{
                  xs: 12,
                  lg: 4,
                }}
              >
                <SubscriptionCard
                  active={active}
                  selected={
                    !productIsReadOnly && product.id === selectedPlan?.id
                  }
                  setSelected={() =>
                    !productIsReadOnly && setSelectedPlan(product)
                  }
                  upcomingDate={upcoming ? scheduleChangeDate : ""}
                  readOnly={productIsReadOnly}
                  isNotRedeemable={isNotRedeemable}
                  product={product}
                />
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
            opacity: cannotPurchaseDisplayPlan ? 0.5 : 1,
          }}
        >
          <SubscriptionCard
            active={displayPlan.id === currentProduct?.id}
            selected
            setSelected={() => {
              if (cannotPurchaseDisplayPlan) {
                return;
              }

              const button = document.getElementById("payment-button");

              button?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            product={displayPlan}
            readOnly={displayPlanIsNotRedeemable || cannotPurchaseDisplayPlan}
            isNotRedeemable={displayPlanIsNotRedeemable}
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
