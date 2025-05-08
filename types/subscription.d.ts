import Stripe from "stripe";

export interface PriceDisplayProps {
  price: number;
  recurring?: boolean;
}

export type SubscriptionWithSchedule = Stripe.Subscription & {
  schedule?: Stripe.SubscriptionSchedule;
};

export interface SubscriptionCardHorizontalProps {
  readOnly?: boolean;
  active?: boolean;
  upcomingDate?: string;
  selected?: boolean;
  setSelected?: () => void;
  product: Stripe.Product;
}

export interface SubscriptionCardProps {
  readOnly?: boolean;
  active?: boolean;
  selected?: boolean;
  upcomingDate?: string;
  setSelected?: () => void;
  centered?: boolean;
  isNotRedeemable?: boolean;
  product: Stripe.Product;
}

export type SubscriptionListProps = {
  products: Stripe.Product[];
};
