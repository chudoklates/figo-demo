import { use } from "react";
import { filterInvoices, getRows } from "../utils";
import { PaymentListProps } from "../types";
import PaymentCard from "./PaymentCard";
import { Stack, Typography } from "@mui/material";

export default function PaymentListMobile({
  invoicesPromise,
  statusFilter,
  dateFilter,
}: PaymentListProps) {
  const invoices = use(invoicesPromise);

  const filteredInvoices = filterInvoices(invoices, statusFilter, dateFilter);

  return filteredInvoices.length > 0 ? (
    <Stack spacing={3}>
      {getRows(filteredInvoices).map((invoice) => (
        <PaymentCard key={invoice.id} item={invoice} />
      ))}
    </Stack>
  ) : (
    <Typography variant="subtitle2">Keine Zahlungen gefunden</Typography>
  );
}
