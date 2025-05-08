import {
  CREATE_TRANSACTION,
  START_TRANSACTION,
} from "@/graphql/mutations/transaction";
import { GET_TRANSACTION } from "@/graphql/queries/transactions";
import { TransactionLight } from "@/graphql/types/transactions";
import { delay } from "@/utils/delay";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { BookingStateExtended } from "../context/BookingContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getErrorMessage, getInternalErrorCode } from "@/utils/error";
import { useRouter } from "next/navigation";
import { getUrlEncodedID } from "@/utils/activity";
import { addTransactionToCache } from "@/utils/cache";

export default function useCreateBooking({
  booking,
  setState,
  setBooking,
  setLoading,
}: {
  booking?: TransactionLight | null;
  setState: (state: BookingStateExtended) => void;
  setBooking: (state: TransactionLight) => void;
  setLoading: (state: boolean) => void;
}) {
  const { user } = useContext(UserContext);

  const creditField = user?.fields?.find(
    ({ field_type }) => field_type?.tech_name === "credits"
  );

  const creditFieldIdentifier = creditField
    ? `${creditField.__typename}:${creditField.id}`
    : null;

  const [transaction, setTransaction] = useState<TransactionLight | null>(null);
  const router = useRouter();

  const [createTransaction] = useMutation<{
    createSingleDirectTransaction: { id: string };
  }>(CREATE_TRANSACTION);

  const [startTransaction] = useMutation<{
    startTransaction: { id: string };
  }>(START_TRANSACTION);

  const [fetchTransaction, { refetch }] = useLazyQuery<{
    mySingleDirectTransaction: TransactionLight;
  }>(GET_TRANSACTION, {
    onCompleted: async (data) => {
      let refetchCount = 0;

      /**
       * Recursively refetch the transaction until it's no longer in a pending
       * state. If the transaction is still pending after 5 attempts, show an
       * error message.
       */
      function recursiveRefetch() {
        refetch()
          .then(({ data }) => {
            const status =
              data.mySingleDirectTransaction.state.status_tech_name;

            if (["start", "match_created"].includes(status)) {
              if (refetchCount > 4) {
                setState("error");
                return;
              }

              refetchCount++;
              delay(1000).then(recursiveRefetch);
              return;
            }
            setTransaction(data.mySingleDirectTransaction);
          })
          .catch((err) => {
            console.error(err);
            setState("error");
          });
      }

      const status = data.mySingleDirectTransaction.state.status_tech_name;

      if (["start", "match_created"].includes(status)) {
        refetchCount++;
        await delay(1000);
        recursiveRefetch();
        return;
      }

      setTransaction(data.mySingleDirectTransaction);
    },
  });

  const client = useApolloClient();

  const updateCache = useCallback(
    (transaction: TransactionLight) => {
      for (const states of [
        ["booking_created", "booking_locked"],
        ["booking_created", "booking_locked", "cancelled", "past"],
      ]) {
        addTransactionToCache({
          transaction,
          states,
          cache: client.cache,
        });
      }

      if (!creditFieldIdentifier) return;

      try {
        client.cache.modify<{ value: number }>({
          id: creditFieldIdentifier,
          broadcast: false,
          fields: {
            value(prevValue) {
              return prevValue - 1;
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    [client.cache, creditFieldIdentifier]
  );

  const handleResetAuth = (id_supply: string) => {
    client.resetStore().catch();
    const redirect = encodeURIComponent(
      `/aktivitaet/${getUrlEncodedID(id_supply)}`
    );
    router.push(`/einloggen?to=${redirect}`);
  };

  useEffect(() => {
    (async () => {
      if (!transaction || booking) return;

      const status = transaction.state.status_tech_name;

      setBooking(transaction);
      setTransaction(null);
      setState(status);
      setLoading(false);

      if (!["booking_created", "booking_locked"].includes(status)) {
        return;
      }

      updateCache(transaction);
    })();
  }, [transaction, booking, setBooking, setState, setLoading, updateCache]);

  const handleCreate = async (id_supply: string) => {
    if (booking) return;

    setLoading(true);

    try {
      const { data } = await createTransaction({
        variables: {
          transaction_tech_name: "default_single_direct_transaction",
          id_supply,
        },
      });

      const transactionId = data?.createSingleDirectTransaction.id;

      if (!transactionId) {
        throw new Error("Transaction creation failed");
      }

      await startTransaction({
        variables: { id: transactionId },
      });

      await delay(1000);

      await fetchTransaction({
        variables: { id: transactionId },
      });
    } catch (err) {
      setLoading(false);

      if (getInternalErrorCode(err) === "ACCESS_DENIED") {
        if (getErrorMessage(err)?.includes("Guest session is not permitted")) {
          handleResetAuth(id_supply);
          return;
        }

        setState("not_onboarded");
        return;
      }

      if (getInternalErrorCode(err) === "TOKEN_MISSING_IN_REQUEST") {
        handleResetAuth(id_supply);
        return;
      }

      setState("error");
    }
  };

  return handleCreate;
}
