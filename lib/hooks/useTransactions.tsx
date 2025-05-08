import { GET_TRANSACTIONS } from "@/graphql/queries/transactions";
import {
  BookingState,
  TransactionPagination,
} from "@/graphql/types/transactions";
import { useQuery } from "@apollo/client";

export default function useTransactions(states: BookingState[] = []) {
  const { data, loading, error } = useQuery<{
    mySingleDirectTransactions: TransactionPagination;
  }>(GET_TRANSACTIONS, {
    variables: {
      where: {
        transaction_tech_name: "default_single_direct_transaction",
        state_tech_names: states,
      },
    },
  });

  const transactions =
    data?.mySingleDirectTransactions?.edges?.map((edge) => edge.node) || [];

  const totalCount = data?.mySingleDirectTransactions?.total_count || 0;

  return {
    transactions,
    totalCount,
    loading,
    error,
  };
}
