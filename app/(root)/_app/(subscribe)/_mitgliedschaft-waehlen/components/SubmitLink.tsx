"use client";

import { useContext } from "react";

import Button from "@mui/material/Button";

import NextLink from "next/link";

import { ProductContext } from "@/lib/context/ProductContext";
import { UserContext } from "@/lib/context/UserContext";

export default function SubmitLink() {
  const { user } = useContext(UserContext);
  const { selectedPlan, coupon } = useContext(ProductContext);

  const disabled =
    !selectedPlan ||
    (!!coupon &&
      selectedPlan.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID &&
      coupon.times_redeemed === coupon.max_redemptions);

  return (
    <Button
      id="payment-button"
      size="large"
      variant="contained"
      fullWidth
      disabled={disabled}
      href={`/app/zahlung?pid=${selectedPlan?.id}&uid=${user?.id}`}
      LinkComponent={NextLink}
    >
      Weiter zur Zahlung
    </Button>
  );
}
