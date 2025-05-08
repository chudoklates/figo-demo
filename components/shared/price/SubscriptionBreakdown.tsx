import { Stack, Typography } from "@mui/material";
import ClassBreakdown from "./ClassBreakdown";
import { SubscriptionBreakdownProps } from "./types";
import Stripe from "stripe";

export default function SubscriptionBreakdown({
  product,
}: SubscriptionBreakdownProps) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        textAlign: "left",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          lineHeight: "24px",
          fontWeight: 600,
        }}
      >
        {product.name}
      </Typography>
      <Typography
        sx={{
          fontSize: 20,
          lineHeight: "36px",
        }}
      >
        Mit <strong>{product.name}</strong> können Sie sich{" "}
        <strong>{product.metadata.credits} Aktivitäten</strong>
        {(product.default_price as Stripe.Price).type === "recurring"
          ? " pro Monat "
          : " "}
        nach Wahl aussuchen.
        <br />
        <em>Hier ist ein Beispiel:</em>
      </Typography>
      <ClassBreakdown nActivities={product.metadata.credits} />
    </Stack>
  );
}
