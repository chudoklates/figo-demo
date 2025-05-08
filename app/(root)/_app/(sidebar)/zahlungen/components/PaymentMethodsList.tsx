import { Edit } from "@mui/icons-material";
import { Button, Theme, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import Stripe from "stripe";
import PaymentMethodsListMobile from "./PaymentMethodListMobile";

const columns: GridColDef<Stripe.PaymentMethod>[] = [
  {
    field: "type",
    width: 120,
    renderCell: (params) => {
      const type = params.row.type;

      const cardBrand = type === "card" && params.row.card?.brand;

      return (
        <Image
          src={`/payment-methods/${cardBrand || type}.svg`}
          alt={cardBrand || type}
          width={60}
          height={24}
          style={{ width: 60, height: "auto" }}
        />
      );
    },
  },
  {
    field: "number",
    flex: 1,
    valueGetter: (params) =>
      params.row.type === "card"
        ? `•••• •••• •••• ${params.row.card?.last4}`
        : `•• •••• •••• •••• •••• ${params.row.sepa_debit?.last4}`,
  },
  {
    field: "expires",
    width: 120,
    valueGetter: (params) =>
      params.row.card?.exp_month && params.row.card?.exp_year
        ? `${params.row.card.exp_month.toLocaleString("de-DE", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}/${params.row.card.exp_year}`
        : "N/A",
  },
  {
    field: "actions",
    type: "actions",
    width: 120,
    getActions: () => [
      <Button
        key="edit"
        aria-label="Bearbeiten"
        startIcon={<Edit />}
        href="/app/zahlungen/bearbeiten"
        LinkComponent={Link}
      >
        Bearbeiten
      </Button>,
    ],
  },
];

function PaymentMethodsList({
  paymentMethodsPromise,
}: {
  paymentMethodsPromise: Promise<Stripe.PaymentMethod | null>;
}) {
  const paymentMethod = use(paymentMethodsPromise);

  return (
    <DataGrid
      autoHeight
      rows={paymentMethod ? [paymentMethod] : []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            page: 1,
            pageSize: 5,
          },
        },
      }}
      hideFooter
      disableRowSelectionOnClick
      slots={{
        columnHeaders: React.forwardRef(HideHeader),
      }}
      localeText={{
        noRowsLabel: "Keine Zahlungsmethode konfiguriert",
      }}
    />
  );
}

export default function PaymentMethodsListWrapper({
  paymentMethodsPromise,
}: {
  paymentMethodsPromise: Promise<Stripe.PaymentMethod | null>;
}) {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return isMobile ? (
    <PaymentMethodsListMobile paymentMethodsPromise={paymentMethodsPromise} />
  ) : (
    <PaymentMethodsList paymentMethodsPromise={paymentMethodsPromise} />
  );
}

function HideHeader() {
  return null;
}
