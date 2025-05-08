import { useContext, useState } from "react";
import { GeocodingContext } from "@/components/geo/GeocodingProvider";
import useLocationAutocomplete from "../geo/useLocationAutocomplete";

export default function useLocationSearch(initialValue = "") {
  const geocoder = useContext(GeocodingContext);

  const [search, setSearch] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { suggestions } = useLocationAutocomplete(search);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const getLocationFromGeocoder = async (address: string) => {
    let geocoderResponse;

    try {
      geocoderResponse = await geocoder?.geocode({
        address,
        language: "de",
        region: "de",
      });
    } catch (err) {
      setError("Standort konnte nicht gefunden werden");
    }

    return geocoderResponse?.results[0].geometry ?? null;
  };

  return {
    search,
    setSearch,
    getLocationFromGeocoder,
    handleSearchChange,
    focused,
    setFocused,
    error,
    setError,
    suggestions,
  };
}
