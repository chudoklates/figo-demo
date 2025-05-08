import { gql } from "@apollo/client";
import {
  ObjectFieldData,
  ObjectFieldWithVariantsData,
  ObjectSetFieldData,
  SimpleFieldData,
  SimpleFieldWithVariantsData,
} from "../fragments/fields";

export const DISCOVER_ACTIVITIES = gql`
  query discoverTransactionSuppliesNEW(
    $transaction_tech_name: String!
    $where: SupplyDiscoverFilter!
    $availability_params: [FieldParameterInput!]
    $available_supply_only: Boolean
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    discoverTransactionSuppliesNEW(
      transaction_tech_name: $transaction_tech_name
      where: $where
      availability_params: $availability_params
      available_supply_only: $available_supply_only
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
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
          fields {
            ... on SimpleField {
              ...SimpleFieldData
            }
            ... on ObjectField {
              ...ObjectFieldData
            }
          }
          provider {
            id_participant
            fields {
              ... on SimpleField {
                ...SimpleFieldData
              }
              ... on ObjectField {
                ...ObjectFieldData
              }
            }
          }
        }
      }
    }
  }
  ${SimpleFieldData}
  ${ObjectFieldData}
`;

// export const GET_ACTIVITY = gql`
//   query DISCOVER_TRANSACTION_SUPPLY_DETAILS(
//     $transaction_tech_name: String!
//     $id_supply: ID!
//   ) {
//     discoverTransactionSupplyDetails(
//       transaction_tech_name: $transaction_tech_name
//       id_supply: $id_supply
//     ) {
//       id
//       type {
//         name
//         match_configurations {
//           pricing_enabled
//         }
//       }
//       availability
//       fields {
//         ...SimpleFieldWithVariantsData
//       }
//       variant_group
//       variants {
//         id
//         availability
//         variant_group
//         fields {
//           ...SimpleFieldWithVariantsData
//         }
//       }
//       provider {
//         id_participant
//         fields {
//           ...SimpleFieldData
//         }
//       }
//     }
//   }
//   ${SimpleFieldWithVariantsData}
//   ${SimpleFieldData}
// `;

export const API_GET_ACTIVITY = gql`
  query GET_SUPPLY($id: ID!) {
    getSupply(id: $id) {
      id
      is_active
      type {
        name
        match_configurations {
          pricing_enabled
        }
      }
      availability
      fields {
        ... on SimpleField {
          ...SimpleFieldData
        }
        ... on ObjectField {
          ...ObjectFieldData
        }
        ... on ObjectSetField {
          ...ObjectSetFieldData
        }
      }
      variant_group
      variants {
        id
        availability
        is_active
        variant_group
        fields {
          ... on SimpleField {
            ...SimpleFieldWithVariantsData
          }
          ... on ObjectField {
            ...ObjectFieldWithVariantsData
          }
          ... on ObjectSetField {
            ...ObjectSetFieldData
          }
        }
      }
      provider {
        id
        fields {
          ... on SimpleField {
            ...SimpleFieldData
          }
          ... on ObjectField {
            ...ObjectFieldData
          }
          ... on ObjectSetField {
            ...ObjectSetFieldData
          }
        }
      }
    }
  }
  ${SimpleFieldWithVariantsData}
  ${SimpleFieldData}
  ${ObjectFieldWithVariantsData}
  ${ObjectFieldData}
  ${ObjectSetFieldData}
`;

export const API_LIST_ACTIVITIES = gql`
  query GET_SUPPLIES(
    $supply_tech_name: String!
    $where: SupplyFilterNew
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    getSuppliesNew(
      supply_tech_name: $supply_tech_name
      where: $where
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
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
          created_at
        }
      }
    }
  }
`;
