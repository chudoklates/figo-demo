"use client";

import { PageContainer } from "@/components";
import { PageHeading } from "@/components/shared/general";
import { Close, FlagOutlined, Schedule } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { Suspense, useContext, useMemo } from "react";
import PaymentList from "./components/PaymentList";
import { UserContext } from "@/lib/context/UserContext";
import { getInvoices, getPaymentMethod } from "@/app/actions/stripe";
import { DateFilter, PaymentStatus } from "./types";
import PaymentMethodsList from "./components/PaymentMethodsList";
import PaymentListMobile from "./components/PaymentListMobile";
import PaymentFailedAlert from "./components/PaymentFailedAlert";

const DATE = [
  {
    label: "Diesen Monat",
    value: "this_month",
  },
  {
    label: "Letzten Monat",
    value: "last_month",
  },
];

const PAYMENT_STATUS = [
  {
    label: "Erfolgreich",
    value: "succeeded",
  },
  {
    label: "Abgebrochen",
    value: "canceled",
  },
  {
    label: "In Bearbeitung",
    value: "processing",
  },
  {
    label: "Aktion erforderlich",
    value: "action_required",
  },
];

export default function Payments() {
  const { user } = useContext(UserContext);

  const [dateFilter, setDateFilter] = React.useState<DateFilter | "">("");
  const [statusFilter, setStatusFilter] = React.useState<PaymentStatus | "">(
    ""
  );

  const invoicesPromise = useMemo(() => {
    return getInvoices(user?.stripe_subscription_id);
  }, [user?.stripe_subscription_id]);

  const paymentMethodsPromise = useMemo(() => {
    return getPaymentMethod(user?.stripe_subscription_id);
  }, [user?.stripe_subscription_id]);

  return (
    <PageContainer
      containerOverrides={{ maxWidth: "xl" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
    >
      <PageHeading title="Zahlungen" />
      <Suspense fallback={null}>
        <PaymentFailedAlert invoicesPromise={invoicesPromise} />
      </Suspense>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          pt: 3,
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 2,
          }}
        >
          <Select
            variant="outlined"
            sx={{ fontSize: 16 }}
            startAdornment={<Schedule sx={{ mr: 1 }} />}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            displayEmpty
            renderValue={(value) => {
              const selectedDate = DATE.find((date) => date.value === value);
              return selectedDate?.label || "Zeitraum";
            }}
            {...(dateFilter && {
              IconComponent: () => (
                <IconButton
                  aria-label="clear"
                  onClick={() => setDateFilter("")}
                >
                  <Close />
                </IconButton>
              ),
            })}
          >
            {DATE.map((date) => (
              <MenuItem
                key={date.value}
                value={date.value}
                sx={{ fontSize: 16 }}
              >
                {date.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="outlined"
            sx={{ fontSize: 16 }}
            startAdornment={<FlagOutlined sx={{ mr: 1 }} />}
            displayEmpty
            renderValue={(value) => {
              const selectedStatus = PAYMENT_STATUS.find(
                (status) => status.value === value
              );
              return selectedStatus?.label || "Status";
            }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PaymentStatus)}
            {...(statusFilter && {
              IconComponent: () => (
                <IconButton
                  aria-label="clear"
                  onClick={() => setStatusFilter("")}
                >
                  <Close />
                </IconButton>
              ),
            })}
          >
            {PAYMENT_STATUS.map((status) => (
              <MenuItem
                key={status.value}
                value={status.value}
                sx={{ fontSize: 16 }}
              >
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {/* <OutlinedInput
          placeholder="Suche nach Betrag, Zahlung..."
          sx={{ width: 355, borderRadius: 20, fontSize: 16 }}
          startAdornment={<Search />}
        /> */}
      </Stack>
      <Box
        sx={{
          pt: 4,
          pb: 7,
        }}
      >
        <Suspense
          fallback={
            <Skeleton variant="rounded" animation="wave" height={200} />
          }
        >
          <PaymentList
            invoicesPromise={invoicesPromise}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
          />
        </Suspense>
      </Box>
      <PageHeading title="Zahlungsmethode" />
      <Box
        sx={{
          pt: 4,
        }}
      >
        <Suspense
          fallback={
            <Skeleton variant="rounded" animation="wave" height={200} />
          }
        >
          <PaymentMethodsList paymentMethodsPromise={paymentMethodsPromise} />
        </Suspense>
      </Box>
    </PageContainer>
  );
}
