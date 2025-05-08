import Stripe from "stripe";
import { DateFilter, PaymentStatus } from "../types";
import { STATUS_FILTER_MAP } from "./enums";
import dayjs from "dayjs";

export const getRows = (invoices: Stripe.Invoice[] | null) =>
  invoices?.map((invoice) => {
    // These two properties are expanded in the query
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent | null;

    const paymentMethod =
      paymentIntent?.payment_method as Stripe.PaymentMethod | null;

    return {
      id: paymentIntent?.id || invoice.id,
      status: paymentIntent?.status || "processing",
      amount: invoice.total / 100,
      method: paymentMethod
        ? paymentMethod.type === "card"
          ? paymentMethod.card?.last4
          : paymentMethod.sepa_debit?.last4
        : null,
      date: new Date(invoice.created * 1000),
      link: invoice.hosted_invoice_url,
    };
  }) || [];

export const filterInvoices = (
  invoices: Stripe.Invoice[] | null,
  statusFilter: PaymentStatus | "",
  dateFilter: DateFilter | ""
) => {
  if (!invoices) return [];

  return invoices
    .filter(
      (invoice) =>
        !statusFilter ||
        STATUS_FILTER_MAP[statusFilter].includes(
          (invoice.payment_intent as Stripe.PaymentIntent | null)?.status ||
            "processing"
        )
    )
    .filter((invoice) => {
      const createdAt = new Date(invoice.created * 1000);
      let startPeriod;
      let endPeriod;

      switch (dateFilter) {
        case "this_month":
          startPeriod = dayjs().startOf("month").toDate();
          endPeriod = dayjs().endOf("month").toDate();
          return createdAt >= startPeriod && createdAt <= endPeriod;
        case "last_month":
          startPeriod = dayjs().subtract(1, "month").startOf("month").toDate();
          endPeriod = dayjs().subtract(1, "month").endOf("month").toDate();
          return createdAt >= startPeriod && createdAt <= endPeriod;
        default:
          return true;
      }
    });
};

export * from "./enums";
