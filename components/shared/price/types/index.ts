import Stripe from "stripe";

export type Row = [number, string][];

export type ProductListProps = {
  products: Stripe.Product[];
};

export type SubscriptionBreakdownProps = {
  product: Stripe.Product;
};
