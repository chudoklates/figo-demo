"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { makeClient } from "./client";

function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export default ApolloWrapper;
