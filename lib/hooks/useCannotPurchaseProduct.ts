"use client";

import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { useContext } from "react";
import Stripe from "stripe";

export default function useCannotPurchaseProduct() {
  const { user } = useContext(UserContext);
  const { subscription, product: currentProduct } =
    useContext(SubscriptionContext);

  const currentProductCredits = Number(currentProduct?.metadata.credits);

  /**
   * User has credits left
   */
  const hasCredits = !!user && user?.credits > 0;
  /**
   * User has an active subscription
   */
  const hasSubscription = !!subscription;
  /**
   * User has a scheduled subscription
   */
  const hasScheduledSubscription = !!subscription?.schedule;
  /**
   * User has an active one-time product
   */
  const hasPackage = !subscription && !!currentProduct;

  const cannotPurchaseProduct = (product: Stripe.Product) => {
    const productType = (product.default_price as Stripe.Price)?.type;
    const productCredits = Number(product.metadata.credits);

    if (productType === "recurring") {
      return (
        hasPackage ||
        hasScheduledSubscription ||
        (hasCredits && productCredits < currentProductCredits) ||
        (hasCredits && product.id === currentProduct?.id)
      );
    }

    return hasPackage || (hasSubscription && hasCredits);
  };

  return cannotPurchaseProduct;
}
