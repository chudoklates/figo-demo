import { Button, Paper, Stack, Typography } from "@mui/material";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "@mui/icons-material";

const getDateLabel = (item: Stripe.PaymentMethod) =>
  item.card?.exp_month && item.card?.exp_year
    ? `${item.card.exp_month.toLocaleString("de-DE", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${item.card.exp_year}`
    : "N/A";

export default function PaymentMethodCard({
  item,
}: {
  item: Stripe.PaymentMethod;
}) {
  const type = item.type;

  const cardBrand = type === "card" && item.card?.brand;

  return (
    <Stack
      spacing={2}
      component={Paper}
      variant="outlined"
      elevation={0}
      sx={{
        px: 2,
        py: 3,
        color: "grey.800",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Image
          src={`/payment-methods/${cardBrand || type}.svg`}
          alt={cardBrand || type}
          width={60}
          height={24}
          style={{ width: 60, height: "auto" }}
        />
        <Typography color="inherit">
          {type === "card"
            ? `•••• •••• •••• ${item.card?.last4}`
            : `•• •••• •••• •••• •••• ${item.sepa_debit?.last4}`}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography color="inherit">{getDateLabel(item)}</Typography>
        <Button
          size="small"
          href="/app/zahlungen/bearbeiten"
          LinkComponent={Link}
          startIcon={<Edit />}
        >
          Bearbeiten
        </Button>
      </Stack>
    </Stack>
  );
}
