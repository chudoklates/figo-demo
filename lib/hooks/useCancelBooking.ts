"use client";

import { useContext } from "react";
import BookingContext from "@/lib/context/BookingContext";
import { getActivityFromBooking } from "@/utils/activity";
import { GET_TRANSACTION } from "@/graphql/queries/transactions";
import { useQuery } from "@apollo/client";
import { Transaction } from "@/graphql/types/transactions";
import { TRIGGER_TRANSITION } from "@/graphql/mutations/transaction";
import { useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import {
  addTransactionToCache,
  removeTransactionFromCache,
} from "@/utils/cache";

export default function useCancelBooking() {
  const { booking: existingBooking, setState } = useContext(BookingContext);
  const { user } = useContext(UserContext);

  const creditField = user?.fields?.find(
    ({ field_type }) => field_type?.tech_name === "credits"
  );

  const creditFieldIdentifier = creditField
    ? `${creditField.__typename}:${creditField.id}`
    : null;

  const { data, loading } = useQuery<{
    mySingleDirectTransaction: Transaction;
  }>(GET_TRANSACTION, {
    variables: {
      id: existingBooking?.id,
    },
  });

  const [cancelBooking] = useMutation<{
    triggerManualTransactionTransition: boolean;
  }>(TRIGGER_TRANSITION);

  const booking = data?.mySingleDirectTransaction;

  const actions =
    booking?.state?.next_steps?.map((step) => ({
      label: step.action_message,
      transition: step.config.transition_tech_name,
    })) || [];

  const activity = getActivityFromBooking(booking);

  const handleCancel = async (transition: string) => {
    try {
      await cancelBooking({
        variables: {
          id_transaction: existingBooking?.id,
          transition_tech_name: transition,
        },
        update: (cache, { data: result }) => {
          const isInLessThan24Hours =
            existingBooking!.state.status_tech_name === "booking_locked";

          if (!result?.triggerManualTransactionTransition) return;

          // Modify existing booking state
          try {
            cache.modify({
              id: cache.identify(existingBooking!),
              fields: {
                state() {
                  return {
                    __typename: "FlowState",
                    status: "Booking cancelled",
                    status_tech_name: "cancelled",
                    next_steps: [],
                  };
                },
              },
            });
          } catch (err) {
            console.error(err);
          }

          // Filter active bookings
          removeTransactionFromCache({
            transaction: existingBooking!,
            states: ["booking_created", "booking_locked"],
            cache,
          });

          // Add booking to cancelled bookings
          addTransactionToCache({
            transaction: existingBooking!,
            states: ["cancelled"],
            cache,
          });

          if (creditFieldIdentifier && !isInLessThan24Hours) {
            // Add credit back to user
            try {
              cache.modify<{ value: number }>({
                id: creditFieldIdentifier,
                broadcast: false,
                fields: {
                  value(prevValue) {
                    return prevValue + 1;
                  },
                },
              });
            } catch (err) {
              console.error(err);
            }
          }

          setState("cancelled");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    loading,
    booking,
    actions,
    activity,
    handleCancel,
  };
}
