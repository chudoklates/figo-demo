import type { DocumentNode, MutationFunction } from "@apollo/client";

export interface SetPasswordFormProps {
  mutation: DocumentNode;
  email: string;
  token: string;
  buttonLabel: string;
  redirect: string;
}

export interface UpdatePasswordFormProps {
  mutation: MutationFunction<boolean>;
  loginParticipant: MutationFunction<boolean>;
  email: string;
  loading: boolean;
  buttonLabel: string;
  redirect: string;
}
