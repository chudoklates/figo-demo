import { gql } from "@apollo/client";

export const UserBasicData = gql`
  fragment UserBasicData on User {
    id
    first_name
    last_name
    email
  }
`;
