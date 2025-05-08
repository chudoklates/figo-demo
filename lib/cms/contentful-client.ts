import { ApolloLink, HttpLink, from } from "@apollo/client";
import {
  InMemoryCache,
  ApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_URL}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  fetch,
});

/**
 * This middleware is used to set the authorization header for queries
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${
        context.draft
          ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
          : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  }));

  return forward(operation);
});

/**
 * Middleware for handling errors from Contentful
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length > 0) {
    const error = graphQLErrors[0];

    console.error(JSON.stringify(error, null, 2));
  }
  if (networkError) {
    console.error(JSON.stringify(networkError, null, 2));
  }
});

export const makeContentfulClient = () => {
  return new ApolloClient({
    link: from([authMiddleware, errorLink, httpLink]), // SSR
    cache: new InMemoryCache(),
  });
};
