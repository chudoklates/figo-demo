"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { makeContentfulClient } from "./contentful-client";

function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeContentfulClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export default ApolloWrapper;
