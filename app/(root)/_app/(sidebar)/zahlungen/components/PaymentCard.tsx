import { Paper, Stack, Typography } from "@mui/material";
import { InvoiceItem } from "../types";
import StatusChip from "./StatusChip";

const getDateLabel = (date: Date) => {
  return `${date.toLocaleDateString("de-DE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}, ${date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export default function PaymentCard({ item }: { item: InvoiceItem }) {
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
        <Typography
          color="inherit"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.id}
        </Typography>
        <Typography color="inherit">€{item.amount.toFixed(2)}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography color="inherit">
          {item.method ? `•••• ${item.method}` : "N/A"}
        </Typography>
        <Typography color="inherit">{getDateLabel(item.date)}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <StatusChip status={item.status} />
      </Stack>
    </Stack>
  );
}
