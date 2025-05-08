import { ApolloLink, HttpLink, from } from "@apollo/client";
import {
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";
import { clearToken, setToken } from "./auth/utils";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_RANDEVU_API_URL,
  fetch,
});

/**
 * This middleware is used to set the authorization header for each protected request
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const authToken = localStorage.getItem("randevu-session-token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authToken ? { authorization: authToken } : {}),
      "x-randevu-key": process.env.NEXT_PUBLIC_RANDEVU_API_TOKEN,
    },
  }));

  return forward(operation);
});

/**
 * This middleware is used to set the authorization header for SSR requests
 */
const SSRAuthMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-randevu-key": process.env.NEXT_PUBLIC_RANDEVU_API_TOKEN,
    },
  }));

  return forward(operation);
});

/**
 * This afterware is used to save the session token to localStorage
 * after login or with a guest token
 */
const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (
      operation.operationName !== "loginParticipant" &&
      operation.operationName !== "getGuestToken"
    )
      return response;

    const { data } = response;

    const sessionToken = data?.[operation.operationName].token;

    if (sessionToken) {
      setToken(sessionToken);
    }

    return response;
  });
});

/**
 * Middleware for handling errors on the client
 */
const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors && graphQLErrors.length > 0) {
      const error = graphQLErrors[0];
      if (error.extensions?.internal_code === "INVALID_TOKEN_IN_REQUEST") {
        clearToken();
        operation.setContext(
          ({ headers }: { headers: Record<string, any> }) => {
            delete headers.authorization;
            return {
              headers: {
                ...headers,
              },
            };
          }
        );

        return forward(operation);
      }
    }
    if (
      networkError &&
      "statusCode" in networkError &&
      networkError.statusCode === 401
    ) {
      clearToken();
    }
  }
);

/**
 * Strip all fragments marked with the \@defer directive from the query
 *
 * {@link https://www.apollographql.com/blog/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router#client-components-with-server-side-rendering|Source}
 */
const multipartLink = new SSRMultipartLink({
  stripDefer: true,
});

export const makeClient = () => {
  return new ApolloClient({
    link:
      typeof window === "undefined"
        ? from([multipartLink, SSRAuthMiddleware, httpLink]) // SSR
        : from([authAfterware, authMiddleware, errorLink, httpLink]),
    cache: new InMemoryCache({
      dataIdFromObject: (object) => {
        if (object.__typename) {
          if (object.id !== undefined) {
            return `${object.__typename}:${object.id}`;
          }
          if (object._id !== undefined) {
            return `${object.__typename}:${object._id}`;
          }
        }
        return false;
      },
    }),
  });
};
