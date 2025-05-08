"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { BERLIN_COORDINATES } from "./constants";
import { AutocompleteContext } from "@/components/geo/AutocompleteProvider";

const useLocationAutocomplete = (value: string) => {
  const AutocompleteService = useContext(AutocompleteContext);

  const [data, setData] = useState<google.maps.places.AutocompletePrediction[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestions = useCallback(
    (value: string) => {
      if (value.length > 0) {
        setLoading(true);
        AutocompleteService?.getPlacePredictions(
          {
            input: value,
            locationBias: BERLIN_COORDINATES,
            componentRestrictions: {
              country: ["de"],
            },
            region: "de",
            language: "de",
          },
          (predictions, status) => {
            setLoading(false);
            if (status === "OK" && predictions !== null) {
              setData(predictions);
            }
          }
        );
      }
      setData([]);
    },
    [AutocompleteService]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, fetchSuggestions]);

  return {
    suggestions: {
      data,
      loading,
    },
  };
};

export default useLocationAutocomplete;
