"use client";

import { SubscriptionWithSchedule } from "@/types/subscription";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { UserContext } from "./UserContext";
import { getProduct, getSubscription } from "@/app/actions/stripe";
import Stripe from "stripe";

type SubscriptionContextType = {
  subscription: SubscriptionWithSchedule | null;
  product: Stripe.Product | null;
  loading: boolean;
  setSubscriptionSchedule: (schedule: Stripe.SubscriptionSchedule) => void;
};

export const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  product: null,
  loading: true,
  setSubscriptionSchedule: () => {},
});

/**
 * Returns the subscription of the current user.
 */
export default function SubscriptionWrapper({ children }: PropsWithChildren) {
  const { user } = useContext(UserContext);

  const [subscription, setSubscription] =
    useState<SubscriptionWithSchedule | null>(null);
  const [product, setProduct] = useState<Stripe.Product | null>(null);
  const [loading, setLoading] = useState(true);

  const setSubscriptionSchedule = (schedule: Stripe.SubscriptionSchedule) => {
    setSubscription((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        schedule,
      };
    });
  };

  const subscriptionContext = {
    subscription,
    product,
    loading,
    setSubscriptionSchedule,
  };

  useEffect(() => {
    (async () => {
      if (!user) {
        setSubscription(null);
        setProduct(null);
        setLoading(true);
        return;
      }

      const subscription = await getSubscription(user?.stripe_subscription_id);

      const product = subscription
        ? (subscription.items.data[0].price.product as Stripe.Product)
        : await getProduct({ productId: user?.stripe_package_id });

      setSubscription(subscription);
      setProduct(product);
      setLoading(false);
    })();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={subscriptionContext}>
      {children}
    </SubscriptionContext.Provider>
  );
}
