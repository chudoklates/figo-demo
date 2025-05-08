"use client";

import { captureOrder, createOrder } from "@/app/actions/paypal";
import { ResultSnackbar } from "@/components";
import { SkeletonWrapper } from "@/components/Loading";
import { ApiError, OrderStatus } from "@paypal/paypal-server-sdk";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CreateOrder = PayPalButtonsComponentProps["createOrder"];
type OnApprove = PayPalButtonsComponentProps["onApprove"];
type Style = PayPalButtonsComponentProps["style"];

export default function PaypalPaymentButton({
  eventId,
  disabled,
  seats,
}: {
  eventId: string;
  disabled?: boolean;
  seats: number;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const environment =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
      ? "production"
      : "sandbox";

  const options: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    environment: environment,
    ...(environment === "sandbox" && {
      buyerCountry: "DE",
    }),
    currency: "EUR",
    locale: "de_DE",
    enableFunding: "paypal",
  };

  const style: Style = {
    shape: "pill",
    layout: "horizontal",
    height: 55,
    tagline: false,
    color: "gold",
    label: "paypal",
  };

  const handleCreateOrder: CreateOrder = async () => {
    const order = await createOrder(eventId, seats);

    return order.id!;
  };

  const handleApprove: OnApprove = async (data, actions) => {
    try {
      const order = await captureOrder(data.orderID);

      if (order.status === OrderStatus.Completed) {
        router.replace(`/zahlung/bestaetigt?oid=${order.id}`);
        return;
      }

      throw new Error("Order could not be completed");
    } catch (err) {
      if (err instanceof ApiError && err.name === "UNPROCESSABLE_ENTITY") {
        const parsedError = JSON.parse(err.body.toString());

        const issue = parsedError?.details?.[0]?.issue;

        if (issue === "INSTRUMENT_DECLINED") {
          actions.restart();
          return;
        }
      }
      setMessage(
        "Es gab ein Problem mit Ihrer PayPal-Zahlung. Bitte versuche es erneut."
      );
    }
  };

  return (
    <React.Fragment>
      <ResultSnackbar
        severity="error"
        snackbarOpen={!!message}
        closeSnackbar={() => setMessage("")}
        message={message}
      />
      <SkeletonWrapper
        loading={loading}
        width="100%"
        height={56}
        variant="rounded"
        sx={{ borderRadius: "40px", minWidth: 167 }}
      >
        <PayPalScriptProvider options={options}>
          <PayPalButtons
            style={style}
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            disabled={disabled}
            className="paypal-buttons"
            onInit={() => setLoading(false)}
          />
        </PayPalScriptProvider>
      </SkeletonWrapper>
      <style jsx global>{`
        .paypal-buttons {
          height: 56px;
          width: 100%;
        }
      `}</style>
    </React.Fragment>
  );
}
