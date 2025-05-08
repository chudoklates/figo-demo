import Stripe from "stripe";

export type PaymentStatus =
  | "succeeded"
  | "canceled"
  | "processing"
  | "action_required";

export type DateFilter = "this_month" | "last_month";

export type StatusFilter = PaymentStatus | "";

export type PaymentListProps = {
  invoicesPromise: Promise<Stripe.Invoice[] | null>;
  statusFilter: StatusFilter;
  dateFilter: DateFilter | "";
};

export type InvoiceItem = {
  id: string;
  amount: number;
  method: string | null | undefined;
  date: Date;
  link: string | null | undefined;
  status: Stripe.PaymentIntent["status"];
};
