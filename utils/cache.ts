import { GET_TRANSACTIONS } from "@/graphql/queries/transactions";
import {
  TransactionLight,
  TransactionPagination,
} from "@/graphql/types/transactions";
import { User } from "@/graphql/types/user";
import { ApolloCache, FetchResult, Reference } from "@apollo/client";
import { fieldIsObjectSetType, fieldIsObjectType } from "./field";
import { Field } from "@/graphql/types/fields";
import { SimpleFieldData } from "@/graphql/fragments/fields";

/**
 * Returns an updater function for the cache that updates the user's fields
 * based on a result from Formik form submission
 *
 * @param user The user object from context
 * @param values The values from the form
 */
export function updateUserFields<R>(
  user: User | null,
  values: Record<string, any>
) {
  return function (
    cache: ApolloCache<any>,
    { data }: Omit<FetchResult<R>, "context">
  ) {
    if (!data || !user) return;

    cache.modify({
      id: `${user.__typename}:${user.id}`,
      fields: {
        fields(value = [], { isReference }) {
          return (
            value.map((field: Reference | Field<any>) => {
              if (isReference(field)) {
                const fieldData = cache.readFragment<Field<any>>({
                  id: field.__ref,
                  fragment: SimpleFieldData,
                });

                if (fieldData && fieldData.field_type.tech_name in values) {
                  cache.writeFragment({
                    id: field.__ref,
                    fragment: SimpleFieldData,
                    data: {
                      ...fieldData,
                      simpleValue: values[fieldData.field_type.tech_name],
                    },
                  });
                }

                return field;
              }

              if (fieldIsObjectType(field) || fieldIsObjectSetType(field))
                return field;

              if (field.field_type.tech_name in values) {
                return {
                  ...field,
                  simpleValue: values[field.field_type.tech_name],
                };
              }
              return field;
            }) || []
          );
        },
      },
    });
  };
}

export function addTransactionToCache({
  transaction,
  states,
  cache,
}: {
  transaction: TransactionLight;
  states: string[];
  cache: ApolloCache<any>;
}) {
  try {
    cache.updateQuery<{
      mySingleDirectTransactions: TransactionPagination;
    }>(
      {
        query: GET_TRANSACTIONS,
        variables: {
          where: {
            transaction_tech_name: "default_single_direct_transaction",
            state_tech_names: states,
          },
        },
      },
      (data) => {
        if (!data) return null;

        return {
          mySingleDirectTransactions: {
            ...data.mySingleDirectTransactions,
            total_count: data.mySingleDirectTransactions.total_count + 1,
            edges: [
              {
                cursor: transaction.id,
                node: transaction,
                __typename: "SingleDirectTransactionEdge",
              },
              ...data.mySingleDirectTransactions.edges,
            ],
          },
        };
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export function removeTransactionFromCache({
  transaction,
  states,
  cache,
}: {
  transaction: TransactionLight;
  states: string[];
  cache: ApolloCache<any>;
}) {
  try {
    cache.updateQuery<{
      mySingleDirectTransactions: TransactionPagination;
    }>(
      {
        query: GET_TRANSACTIONS,
        variables: {
          where: {
            transaction_tech_name: "default_single_direct_transaction",
            state_tech_names: states,
          },
        },
      },
      (data) => {
        if (!data) return null;

        return {
          mySingleDirectTransactions: {
            ...data.mySingleDirectTransactions,
            total_count: data.mySingleDirectTransactions.total_count - 1,
            edges: data.mySingleDirectTransactions.edges.filter(
              (edge) => edge.node.id !== transaction.id
            ),
          },
        };
      }
    );
  } catch (err) {
    console.error(err);
  }
}
