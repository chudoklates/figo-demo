import { Activity, Variant } from "@/api/types/activities";
import { BookingState, TransactionLight } from "@/api/types/transactions";
import { createContext } from "react";

export type BookingStateExtended =
  | BookingState
  | "initial"
  | "confirm"
  | "too_late"
  | "registration_required"
  | "cancelling"
  | "not_onboarded"
  | "error";

type BookingContextType = {
  state: BookingStateExtended;
  booking?: TransactionLight | null;
  selectedVariant?: Variant | null;
  setBooking: (booking: TransactionLight) => void;
  setState: (state: BookingStateExtended) => void;
  setOpen: (open: boolean) => void;
};

const BookingContext = createContext<BookingContextType>({
  state: "initial",
  selectedVariant: null,
  setState: () => {},
  setBooking: () => {},
  setOpen: () => {},
});

export default BookingContext;
