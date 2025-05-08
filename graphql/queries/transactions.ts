import { gql } from "@apollo/client";
import { SimpleFieldData } from "../fragments/fields";
import { FlowStateData, TransactionStateLightData } from "../fragments/flow";

export const GET_TRANSACTION = gql`
  query MY_SINGLE_DIRECT_TRANSACTION($id: ID!) {
    mySingleDirectTransaction(id: $id) {
      id
      created_at
      prepared_at
      initiated_at
      terminated_at
      cancelled_at
      state {
        ...FlowStateData
      }
      match {
        id_supply
        supply_fields {
          ...SimpleFieldData
        }
      }
    }
  }
  ${FlowStateData}
  ${SimpleFieldData}
`;

export const GET_TRANSACTIONS = gql`
  query MY_TRANSACTIONS($where: SingleDirectTransactionFilter!) {
    mySingleDirectTransactions(where: $where) {
      total_count
      page_info {
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
      edges {
        cursor
        node {
          id
          state {
            status_tech_name
          }
          match {
            id_supply
            supply_fields {
              ...SimpleFieldData
            }
          }
        }
      }
    }
  }
  ${SimpleFieldData}
`;
