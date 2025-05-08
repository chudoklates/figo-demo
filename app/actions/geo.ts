"use server";

import { getComponentsForGeocode } from "@/lib/geo/utils";
import { LatLng } from "@/types/geo";
import { GeocodeResult } from "use-places-autocomplete";

export const getLocationInfoForCoordinates = async (
  location: LatLng,
  placeId?: string
) => {
  const geocodedLocation = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${
      placeId ? `place_id=${placeId}` : `latlng=${location.lat},${location.lng}`
    }&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&region=de&language=de${
      placeId ? "" : `&result_type=street_address`
    }`,
    { cache: "force-cache" }
  ).then((res) => res.json());

  const result = geocodedLocation.results?.[0] as GeocodeResult | undefined;

  if (!result) return {};

  const address = result?.formatted_address;

  const locationInfo = getComponentsForGeocode(result);

  return { address, locationInfo };
};

export const getGeometryForAddress = async (address: string) => {
  const geocodedLocation = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&region=de&language=de`,
    { cache: "force-cache" }
  ).then((res) => res.json());

  const results = geocodedLocation.results as google.maps.GeocoderResult[];

  return results[0]?.geometry;
};
