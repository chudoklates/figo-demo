"use client";

import { useContext } from "react";

import Button from "@mui/material/Button";

import NextLink from "next/link";

import { ProductContext } from "@/lib/context/ProductContext";
import { UserContext } from "@/lib/context/UserContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import SubscriptionChangeButton from "./SubscriptionChangeButton";
import RenewSubscriptionButton from "./RenewSubscriptionButton";
import useCannotPurchaseProduct from "@/lib/hooks/useCannotPurchaseProduct";
import SwitchToPackagePopup from "./SwitchToPackagePopup";

export default function SubmitLink() {
  const { user } = useContext(UserContext);
  const { selectedPlan, coupon, type } = useContext(ProductContext);
  const { product, subscription } = useContext(SubscriptionContext);

  const cannotPurchaseProduct = useCannotPurchaseProduct();

  if (subscription && product?.id === selectedPlan?.id) {
    return <RenewSubscriptionButton />;
  }

  if (subscription && type === "recurring") {
    return <SubscriptionChangeButton />;
  }

  if (subscription && type === "one_time") {
    return <SwitchToPackagePopup />;
  }

  const disabled =
    !selectedPlan ||
    cannotPurchaseProduct(selectedPlan) ||
    (!!coupon &&
      selectedPlan.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID &&
      coupon.times_redeemed === coupon.max_redemptions);

  return (
    <Button
      id="payment-button"
      size="large"
      variant="contained"
      disabled={disabled}
      href={`/app/zahlung?pid=${selectedPlan?.id}&uid=${user?.id}`}
      LinkComponent={NextLink}
      sx={{ width: { xs: "100%", sm: 580, lg: 500 } }}
    >
      Weiter zur Zahlung
    </Button>
  );
}
