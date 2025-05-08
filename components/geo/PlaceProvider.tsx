"use client";

import { PropsWithChildren, use, useMemo } from "react";
import { createContext } from "react";
import loader from "@/lib/geo/loader";

export const PlaceContext = createContext<
  typeof google.maps.places.Place | null
>(null);

function PlaceServiceProvider({
  placesPromise,
  children,
}: PropsWithChildren & {
  placesPromise: Promise<google.maps.PlacesLibrary>;
}) {
  const { Place } = use(placesPromise);

  return (
    <PlaceContext.Provider value={Place}>{children}</PlaceContext.Provider>
  );
}

export default function PlaceProvider({ children }: PropsWithChildren) {
  const placesPromise = useMemo(() => {
    return loader.importLibrary("places");
  }, []);

  return (
    <PlaceServiceProvider placesPromise={placesPromise}>
      {children}
    </PlaceServiceProvider>
  );
}
