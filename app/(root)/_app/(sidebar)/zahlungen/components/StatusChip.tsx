import { Chip } from "@mui/material";
import { STATUS_COLOR, STATUS_ICON, STATUS_LABEL } from "../utils";
import Stripe from "stripe";

export default function StatusChip({
  status,
}: {
  status: Stripe.PaymentIntent.Status;
}) {
  const mainColor = STATUS_COLOR.get(status)!;
  return (
    <Chip
      label={STATUS_LABEL.get(status)}
      variant="outlined"
      size="small"
      icon={STATUS_ICON.get(status)}
      sx={(theme) => ({
        "& .MuiChip-label": {
          fontSize: 12,
          lineHeight: "20px",
        },
        "& svg": {
          fill: theme.palette[mainColor].main,
        },
      })}
      color={mainColor}
    />
  );
}
