"use client";

import loader from "@/lib/geo/loader";
import { Suspense, use, useEffect, useMemo } from "react";
import { Loading } from "../Loading";
import { BERLIN_CENTER } from "@/lib/geo/constants";

function Map({
  mapPromise,
  setMapRef,
}: {
  mapPromise: Promise<google.maps.MapsLibrary>;
  setMapRef: React.Dispatch<google.maps.Map | null>;
}) {
  const { Map } = use(mapPromise);

  useEffect(() => {
    if (!Map) return;

    loader.importLibrary("marker").then(() => {
      setMapRef(
        new Map(document.getElementById("map") as HTMLElement, {
          center: BERLIN_CENTER,
          zoom: 12,
          mapId: "e1b7b1b3b1b7b1b3",
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
        })
      );
    });
  }, [Map, setMapRef]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}

export default function MapProvider({
  setMapRef,
}: {
  setMapRef: React.Dispatch<google.maps.Map | null>;
}) {
  const mapPromise = useMemo(() => {
    return loader.importLibrary("maps");
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Map mapPromise={mapPromise} setMapRef={setMapRef} />
    </Suspense>
  );
}
