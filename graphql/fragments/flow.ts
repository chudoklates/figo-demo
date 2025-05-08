import { gql } from "@apollo/client";

export const FlowStateData = gql`
  fragment FlowStateData on FlowState {
    status
    status_tech_name
    next_steps {
      type
      action_message
      config
    }
  }
`;

export const TransactionStateLightData = gql`
  fragment TransactionStateLightData on TransactionStateLight {
    status_tech_name
  }
`;
