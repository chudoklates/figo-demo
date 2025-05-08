"use client";

import React, { PropsWithChildren, Suspense, use, useMemo } from "react";
import { createContext } from "react";
import loader from "@/lib/geo/loader";

export const GeocodingContext = createContext<google.maps.Geocoder | null>(
  null
);

function GeocodingServiceProvider({
  geocodingPromise,
  children,
}: PropsWithChildren & {
  geocodingPromise: Promise<google.maps.GeocodingLibrary | null>;
}) {
  const Geocoder = use(geocodingPromise)?.Geocoder;

  if (!Geocoder) {
    return children;
  }

  return (
    <GeocodingContext.Provider value={new Geocoder()}>
      {children}
    </GeocodingContext.Provider>
  );
}

export default function GeocodingProvider({
  children,
}: PropsWithChildren & { fallback?: React.ReactNode }) {
  const geocodingPromise = useMemo(() => {
    if (typeof window === "undefined") return Promise.resolve(null);
    return loader.importLibrary("geocoding");
  }, []);

  return (
    <Suspense>
      <GeocodingServiceProvider geocodingPromise={geocodingPromise}>
        {children}
      </GeocodingServiceProvider>
    </Suspense>
  );
}
