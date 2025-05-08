"use client";

import React, { PropsWithChildren, Suspense, use, useMemo } from "react";
import { createContext } from "react";
import loader from "@/lib/geo/loader";

export const AutocompleteContext =
  createContext<google.maps.places.AutocompleteService | null>(null);

function AutocompleteServiceProvider({
  placesPromise,
  children,
}: PropsWithChildren & {
  placesPromise: Promise<google.maps.PlacesLibrary | null>;
}) {
  const AutocompleteService = use(placesPromise)?.AutocompleteService;

  if (!AutocompleteService) {
    return children;
  }

  return (
    <AutocompleteContext.Provider value={new AutocompleteService()}>
      {children}
    </AutocompleteContext.Provider>
  );
}

export default function AutocompleteProvider({
  children,
}: PropsWithChildren & { fallback?: React.ReactNode }) {
  const placesPromise = useMemo(() => {
    if (typeof window === "undefined") return Promise.resolve(null);
    return loader.importLibrary("places");
  }, []);

  return (
    <Suspense>
      <AutocompleteServiceProvider placesPromise={placesPromise}>
        {children}
      </AutocompleteServiceProvider>
    </Suspense>
  );
}
