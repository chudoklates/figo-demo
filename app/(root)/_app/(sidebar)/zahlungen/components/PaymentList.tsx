"use client";

import { Button, Theme, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { use } from "react";
import { filterInvoices, getRows } from "../utils";
import { InvoiceItem, PaymentListProps } from "../types";
import StatusChip from "./StatusChip";
import PaymentListMobile from "./PaymentListMobile";

const columns: GridColDef<InvoiceItem>[] = [
  { field: "id", headerName: "Zahlungskennung", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return <StatusChip status={params.row.status} />;
    },
  },
  {
    field: "amount",
    headerName: "Höhe",
    type: "number",
    headerAlign: "left",
    align: "left",
    width: 110,
    valueGetter: (params) => `€${params.row.amount.toFixed(2)}`,
  },
  {
    field: "method",
    headerName: "Methode",
    valueGetter: (params) =>
      params.row.method ? `•••• ${params.row.method}` : "N/A",
    width: 120,
  },
  {
    field: "date",
    headerName: "Kreationsdatum",
    flex: 1,
    valueGetter: (params) =>
      `${params.row.date.toLocaleDateString("de-DE", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}, ${params.row.date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
  },
  {
    field: "link",
    headerName: "Aktion",
    width: 200,
    renderCell: (params) =>
      params.row.status === "succeeded" && params.row.link ? (
        <Button
          href={params.row.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
        >
          Rechnung öffnen
        </Button>
      ) : null,
  },
];

function PaymentList({
  invoicesPromise,
  statusFilter,
  dateFilter,
}: PaymentListProps) {
  const invoices = use(invoicesPromise);

  const filteredInvoices = filterInvoices(invoices, statusFilter, dateFilter);

  return (
    <DataGrid
      autoHeight
      rows={getRows(filteredInvoices)}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      localeText={{
        noRowsLabel: "Keine Zahlungen gefunden",
      }}
    />
  );
}

export default function PaymentsListWrapper(
  paymentListProps: PaymentListProps
) {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return isMobile ? (
    <PaymentListMobile {...paymentListProps} />
  ) : (
    <PaymentList {...paymentListProps} />
  );
}
