import { Activity, Provider, Variant } from "@/api/types/activities";
import { TransactionLight } from "@/api/types/transactions";
import { ChangeEvent } from "react";

export type BookingFormProps = {
  activity: Activity;
  transactions: TransactionLight[];
};

export type ActivityPageProps = {
  params: Promise<{
    /**
     * Base64-encoded unique identifier of the activity. (without the spl- prefix)
     */
    id: string;
  }>;
};

export type ActivityInfoProps = {
  provider: Provider;
  activity: Activity;
};

export type SlotSelectorProps = {
  selectedVariant: Variant | null;
  handleChange: (event: ChangeEvent<unknown>, value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
};

export type ReviewsProps = { activity: Activity; provider: Provider };
