import { ApolloError } from "@apollo/client";
import { NetworkError } from "@apollo/client/errors";

export const isApolloError = (error: unknown): error is ApolloError => {
  return error instanceof ApolloError;
};

export const getErrorMessage = (error: unknown) => {
  return isApolloError(error)
    ? error.graphQLErrors?.[0]?.message
      ? error.graphQLErrors[0].message
      : error.networkError &&
        "result" in error.networkError &&
        typeof error.networkError.result === "object"
      ? (error.networkError.result.errors[0].message as string)
      : error.message
    : error instanceof Error
    ? error.message
    : "";
};

export const getInternalErrorCode = (error: unknown) => {
  return (
    (isApolloError(error) &&
      (error?.graphQLErrors?.length
        ? error.graphQLErrors[0].extensions?.internal_code
        : getNetworkErrorInternalCode(error.networkError))) ||
    undefined
  );
};

export const getNetworkErrorInternalCode = (error: NetworkError) => {
  return (
    error &&
    "result" in error &&
    typeof error?.result === "object" &&
    error?.result?.errors[0]?.extensions?.internal_code
  );
};

export const getNetworkErrorCode = (error: unknown) => {
  return (
    (isApolloError(error) &&
      error.networkError &&
      "statusCode" in error.networkError &&
      error.networkError.statusCode) ||
    undefined
  );
};
