"use client";

import dynamic from "next/dynamic";
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { LatLng } from "@/types/geo";

const Map = dynamic(() => import("@/components/geo/Map"), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={240} />,
});

export default function MapDisplay({ location }: { location?: LatLng }) {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef && location) {
      const { lat, lng } = location;
      mapRef.setCenter({ lat, lng });
      mapRef.setZoom(15);

      const pinElement = new google.maps.marker.PinElement({
        background: "#0067BE", // primary
        glyphColor: "#FB9266", //secondary
        borderColor: "#0067BE",
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: mapRef,
        title: "Standort",
        content: pinElement.element,
      });
    }
  }, [mapRef, location]);

  return (
    <Box
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        width: "100%",
        height: 240,
      }}
    >
      <Map setMapRef={setMapRef} />
    </Box>
  );
}
