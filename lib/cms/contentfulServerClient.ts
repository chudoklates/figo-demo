import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { makeContentfulClient } from "./contentful-client";

export const contentfulClient = registerApolloClient(makeContentfulClient);
