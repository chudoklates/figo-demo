import { gql } from "@apollo/client";
import { UserBasicData } from "../fragments/user";
import { SimpleFieldData } from "../fragments/fields";

export const GET_USER = gql`
  query me {
    me {
      ...UserBasicData
    }
  }
  ${UserBasicData}
`;

export const GET_MY_PARTICIPANTS = gql`
  query myParticipants {
    myParticipants {
      id
      status
      onboarding_progress {
        status
        status_tech_name
        next_steps {
          type
          config
        }
      }
      fields {
        ...SimpleFieldData
      }
    }
  }
  ${SimpleFieldData}
`;
