import { Cancel, CheckCircle, Schedule } from "@mui/icons-material";
import Stripe from "stripe";

export const STATUS_COLOR = new Map<
  Stripe.PaymentIntent.Status,
  "warning" | "error" | "success" | "info"
>([
  ["succeeded", "success" as const],
  ["canceled", "info" as const],
  ["processing", "warning" as const],
  ["requires_payment_method", "error" as const],
  ["requires_confirmation", "error" as const],
  ["requires_capture", "error" as const],
  ["requires_action", "error" as const],
]);

export const STATUS_ICON = new Map([
  ["succeeded", <CheckCircle key="paid" />],
  ["canceled", <Cancel key="void" />],
  ["processing", <Schedule key="processing" />],
  ["requires_payment_method", <Cancel key="void" />],
  ["requires_confirmation", <Cancel key="void" />],
  ["requires_capture", <Cancel key="void" />],
  ["requires_action", <Cancel key="void" />],
]);

export const STATUS_LABEL = new Map([
  ["succeeded", "Erfolgreich"],
  ["canceled", "Abgebrochen"],
  ["processing", "In Bearbeitung"],
  ["requires_payment_method", "Aktion erforderlich"],
  ["requires_confirmation", "Aktion erforderlich"],
  ["requires_capture", "Aktion erforderlich"],
  ["requires_action", "Aktion erforderlich"],
]);

export const STATUS_FILTER_MAP = {
  succeeded: ["succeeded"],
  canceled: ["canceled"],
  processing: ["processing"],
  action_required: [
    "requires_payment_method",
    "requires_confirmation",
    "requires_capture",
    "requires_action",
  ],
};
