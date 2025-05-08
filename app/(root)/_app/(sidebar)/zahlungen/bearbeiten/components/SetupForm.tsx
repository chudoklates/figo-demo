"use client";

import React, { useState, useEffect, useContext } from "react";
import getStripe from "@/lib/payment/get-stripejs";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Box from "@mui/material/Box";
import { createSetupSession } from "@/app/actions/stripe";
import { UserContext } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";

const stripePromise = getStripe();

export default function SetupForm() {
  const { user } = useContext(UserContext);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user?.stripe_subscription_id) {
      // Create a Checkout Session as soon as the page loads
      createSetupSession({
        subscriptionId: user?.stripe_subscription_id,
      })
        .then(({ client_secret }) => setClientSecret(client_secret))
        .catch((error) => {
          console.error(error);
          router.replace("/app/dashboard");
        });
    }
  }, [user?.stripe_subscription_id, router]);

  return (
    <Box id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </Box>
  );
}
