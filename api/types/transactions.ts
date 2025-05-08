import { Field } from "./fields";
import { Pagination } from "./misc";

export type BookingState =
  | "start"
  | "insufficient_credits"
  | "no_seats"
  | "booking_created"
  | "booking_locked"
  | "cancelled"
  | "past";

export type TransactionLight = {
  id: string;
  state: {
    status_tech_name: BookingState;
  };
  match: {
    id_supply: string;
    supply_fields: Field<any>[];
  };
};

export type Transaction = {
  id: string;
  created_at: string;
  updated_at: string;
  initiated_at: string;
  terminated_at: string;
  cancelled_at: string;
  state: {
    status_tech_name: BookingState;
    next_steps: {
      type: string;
      action_message: string;
      config: {
        transition_tech_name: string;
      };
    }[];
  };
  match: {
    id_supply: string;
    supply_fields: Field<any>[];
  };
};

export type TransactionPagination = Pagination<TransactionLight>;
