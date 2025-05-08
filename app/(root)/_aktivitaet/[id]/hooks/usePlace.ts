import { PlaceContext } from "@/components/geo/PlaceProvider";
import { useContext, useEffect, useState } from "react";

export default function usePlace(placeId: string | undefined) {
  const Place = useContext(PlaceContext);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState<google.maps.places.Place | null>(null);

  useEffect(() => {
    if (!Place || !placeId) return;

    (async () => {
      setLoading(true);

      const googlePlace = new Place({
        id: placeId,
        requestedLanguage: "de",
      });

      await googlePlace.fetchFields({
        fields: ["rating", "googleMapsURI", "userRatingCount"],
      });

      setPlace(googlePlace);
      setLoading(false);
    })();
  }, [Place, placeId]);

  return { place, loading };
}
