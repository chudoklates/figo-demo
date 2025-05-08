import { GeocodingContext } from "@/components/geo/GeocodingProvider";
import { useContext, useEffect, useState } from "react";
import { getComponentsForGeocode } from "./utils";
import { LatLng, LocationInfo } from "@/types/geo";

export default function useReverseGeocode(location?: LatLng, placeId?: string) {
  const Geocoder = useContext(GeocodingContext);
  const [loading, setLoading] = useState(true);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  useEffect(() => {
    if (!Geocoder || !(location || placeId)) return;

    (async () => {
      setLoading(true);

      const response = await Geocoder.geocode({
        ...(placeId ? { placeId } : { location }),
        language: "de",
        region: "de",
      });

      const formattedComponents = getComponentsForGeocode(response.results[0]);

      setLocationInfo(formattedComponents);
      setLoading(false);
    })();
  }, [Geocoder, location, placeId]);

  return { locationInfo, loading };
}
