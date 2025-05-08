import { LocationInfo } from "@/types/geo";
import {
  getLatLng,
  getGeocode,
  getZipCode,
  LatLng,
} from "use-places-autocomplete";

export const getComponentsForGeocode = (
  geocode: google.maps.GeocoderResult,
  input?: string
): LocationInfo => {
  const findComponent = (type: string) =>
    geocode.address_components?.find((component: any) =>
      component.types.includes(type)
    );

  const { lat, lng } =
    typeof geocode.geometry.location.toJSON === "function"
      ? geocode.geometry.location.toJSON()
      : (geocode.geometry.location as unknown as {
          lat: number;
          lng: number;
        });

  const house_number = findComponent("street_number");
  const street = findComponent("route");
  const county = findComponent("administrative_area_level_2");
  const city = findComponent("locality");
  const state = findComponent("administrative_area_level_1");
  const neighborhood = findComponent("sublocality");
  const country = findComponent("country");

  return {
    lat,
    lng,
    input,
    postal_code: getZipCode(geocode, false),
    country_code: country?.short_name,
    country_name: country?.long_name,
    state: state?.long_name,
    county: county?.long_name,
    city: city?.long_name,
    neighbourhood: neighborhood?.long_name,
    street: street?.long_name,
    house_number: house_number?.long_name,
  };
};

export const getLocationDataForSuggestion = async (
  value: google.maps.places.AutocompletePrediction
) => {
  const [geocode] = await getGeocode({ address: value.description });

  return getComponentsForGeocode(geocode, value.description);
};

export const getDistanceInKm = (
  { lat: lat1, lng: lon1 }: { lat: number; lng: number },
  { lat: lat2, lng: lon2 }: { lat: number; lng: number }
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const approximateRadius = ({
  start,
  ne,
  sw,
}: {
  start: LatLng;
  ne: LatLng;
  sw: LatLng;
}): number => {
  const distanceToNE = calculateHaversineDistance(
    start.lat,
    start.lng,
    ne.lat,
    ne.lng
  );
  const distanceToSW = calculateHaversineDistance(
    start.lat,
    start.lng,
    sw.lat,
    sw.lng
  );

  // Approximate radius as the average or max of the two distances
  const radius = (distanceToNE + distanceToSW) / 2;
  // For maximum distance use: const radius = Math.max(distanceToNE, distanceToSW);

  return radius; // Radius in meters
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = lat1 * (Math.PI / 180);
  const phi2 = lat2 * (Math.PI / 180);
  const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
  const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
