import { gql } from "@apollo/client";

export const REGISTER_PARTICIPANT = gql`
  mutation registerParticipant(
    $participant_tech_name: String!
    $email: String!
    $first_name: String!
    $last_name: String!
    $fields: [FieldInput!]
  ) {
    registerParticipant(
      participant_tech_name: $participant_tech_name
      email: $email
      first_name: $first_name
      last_name: $last_name
      fields: $fields
    )
  }
`;

export const REQUEST_PARTICIPANT_PASSWORD_RESET = gql`
  mutation requestParticipantPasswordReset($email: String!) {
    requestParticipantPasswordReset(email: $email)
  }
`;

export const RESET_PARTICIPANT_PASSWORD = gql`
  mutation resetParticipantPassword($token: String!, $password: String!) {
    resetParticipantPassword(token: $token, password: $password)
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updateMyPassword(
    $current_password: String!
    $new_password: String!
  ) {
    updateMyPassword(
      current_password: $current_password
      new_password: $new_password
    )
  }
`;

export const VERIFY_PARTICIPANT = gql`
  mutation verifyParticipant($token: String!, $password: String!) {
    verifyParticipant(token: $token, password: $password)
  }
`;

export const LOGIN_PARTICIPANT = gql`
  mutation loginParticipant($email: String!, $password: String!) {
    loginParticipant(email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_GUEST = gql`
  mutation getGuestToken {
    getGuestToken {
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation logoutMe {
    logoutMe
  }
`;

export const UPDATE_PARTICIPANT = gql`
  mutation updateParticipant($id: ID!, $fields: [FieldInput!]) {
    updateParticipant(id: $id, fields: $fields)
  }
`;

export const PREPARE_FILE_UPLOAD = gql`
  mutation prepareFileUpload(
    $file_name: String!
    $type: FileKind!
    $extension: String!
    $name: String
    $description: String
  ) {
    prepareFileUpload(
      file_name: $file_name
      type: $type
      extension: $extension
      name: $name
      description: $description
    ) {
      id
      upload_url
    }
  }
`;
