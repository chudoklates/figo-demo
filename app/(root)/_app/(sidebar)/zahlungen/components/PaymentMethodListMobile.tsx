import { Typography } from "@mui/material";
import { use } from "react";
import Stripe from "stripe";
import PaymentMethodCard from "./PaymentMethodCard";

export default function PaymentMethodsListMobile({
  paymentMethodsPromise,
}: {
  paymentMethodsPromise: Promise<Stripe.PaymentMethod | null>;
}) {
  const paymentMethod = use(paymentMethodsPromise);

  return paymentMethod ? (
    <PaymentMethodCard item={paymentMethod} />
  ) : (
    <Typography variant="subtitle2">
      Keine Zahlungsmethode konfiguriert
    </Typography>
  );
}
