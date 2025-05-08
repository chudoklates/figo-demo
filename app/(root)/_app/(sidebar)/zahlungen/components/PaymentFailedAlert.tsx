"use client";

import { ArrowForwardRounded } from "@mui/icons-material";
import { Alert, Button, ButtonProps } from "@mui/material";
import { use } from "react";
import Stripe from "stripe";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "#FFF1EC",
  borderColor: "#B5520B",
  color: "#B5520B",
  "& .MuiAlert-icon": {
    color: "#B5520B",
  },
  "& .MuiAlert-action": {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    minWidth: 350,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 24,
  },
  "& .MuiAlert-message": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function UpdatePaymentMethodLink(props: ButtonProps) {
  return (
    <Button
      color="inherit"
      variant="text"
      endIcon={<ArrowForwardRounded />}
      LinkComponent={Link}
      href="/app/zahlungen/bearbeiten"
      sx={{
        textDecoration: "underline",
        ...props.sx,
      }}
    >
      Zahlungsmethode aktualisieren
    </Button>
  );
}

export default function PaymentFailedAlert({
  invoicesPromise,
}: {
  invoicesPromise: Promise<Stripe.Invoice[] | null>;
}) {
  const invoices = use(invoicesPromise);

  const paymentFailed = invoices?.some(
    (invoice) =>
      (invoice.payment_intent as Stripe.PaymentIntent)?.status ===
      "requires_payment_method"
  );

  if (!paymentFailed) return null;

  return (
    <StyledAlert
      severity="error"
      action={<UpdatePaymentMethodLink />}
      variant="outlined"
    >
      <strong>Bei der Zahlung ist ein Problem aufgetreten</strong>
      <br />
      Wir haben ein Problem mit Ihrer letzten Zahlung festgestellt. Bitte
      aktualisieren Sie Ihre Zahlungsmethode, um einen kontinuierlichen Service
      zu gewährleisten.
      <UpdatePaymentMethodLink
        sx={{ display: { xs: "flex", md: "none" }, mt: 1, ml: -1 }}
      />
    </StyledAlert>
  );
}
