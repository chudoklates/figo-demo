import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CREATE_SINGLE_DIRECT_TRANSACTION(
    $transaction_tech_name: String!
    $id_supply: ID
    $fields: [FieldInput!]
  ) {
    createSingleDirectTransaction(
      transaction_tech_name: $transaction_tech_name
      id_supply: $id_supply
      fields: $fields
    ) {
      id
    }
  }
`;

export const START_TRANSACTION = gql`
  mutation START_SINGLE_DIRECT_TRANSACTION($id: ID!) {
    startSingleDirectTransaction(id: $id) {
      id
    }
  }
`;

export const TRIGGER_TRANSITION = gql`
  mutation TRIGGER_MANUAL_TRANSACTION_TRANSITION(
    $id_transaction: ID!
    $transition_tech_name: String!
  ) {
    triggerManualTransactionTransition(
      id_transaction: $id_transaction
      transition_tech_name: $transition_tech_name
    )
  }
`;
