"use client";

import React, { createContext, PropsWithChildren } from "react";
import Stripe from "stripe";

export type ProductType = "recurring" | "one_time";

export type ProductContextType = {
  type: ProductType;
  setType: (value: ProductType) => void;
  selectedPlan: Stripe.Product | null;
  setSelectedPlan: (value: Stripe.Product | null) => void;
  coupon: Stripe.Coupon | null;
  setCoupon: (value: Stripe.Coupon | null) => void;
};

export const ProductContext = createContext<ProductContextType>({
  type: "recurring",
  setType: () => {},
  selectedPlan: null,
  setSelectedPlan: () => {},
  coupon: null,
  setCoupon: () => {},
});

export default function ProductWrapper({ children }: PropsWithChildren) {
  const [type, setType] = React.useState<ProductType>("recurring");
  const [selectedPlan, setSelectedPlan] = React.useState<Stripe.Product | null>(
    null
  );
  const [coupon, setCoupon] = React.useState<Stripe.Coupon | null>(null);

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
      {children}
    </ProductContext.Provider>
  );
}
