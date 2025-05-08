import { Activity } from "@/graphql/types/activities";
import { useEffect, useMemo, useState } from "react";
import usePrevious from "./usePrevious";

import { useRouter } from "next/navigation";
import { MarkerActivityDetails } from "@/components";
// import { getUrlEncodedID } from "@/utils/activity";
import { createRoot, Root } from "react-dom/client";
import ThemeRegistry from "@/theme/ThemeRegistry";

/**
 * Custom CSS to hide the InfoWindow header and close button
 */
const StyleOverride = () => (
  <style global jsx>{`
    .gm-ui-hover-effect {
      display: none !important;
    }

    .gm-style-iw-chr {
      display: none !important;
    }
  `}</style>
);

type ExtendedMarkerType = {
  id: string;
  marker: google.maps.marker.AdvancedMarkerElement;
  activities: Activity[];
};

export default function useActivityMarkers({
  activities: ungroupedActivities,
  mapRef,
}: {
  activities: Activity[];
  mapRef: google.maps.Map | null;
}) {
  const groupedActivities = useMemo(() => {
    const initialActivities: Record<string, Activity[]> = {};
    // group activities by lat/lng using Array.reduce
    return ungroupedActivities.reduce((acc, activity) => {
      if (!activity.location) return acc;

      const key = `${activity.location.lat}:${activity.location.lng}`;

      return {
        ...acc,
        [key]: [...(acc[key] || []), activity],
      };
    }, initialActivities);
  }, [ungroupedActivities]);

  const [markers, setMarkers] = useState<ExtendedMarkerType[]>([]);
  const [infoWindow, setInfoWindow] = useState<{
    ref: google.maps.InfoWindow;
    root: Root;
  } | null>(null);
  const prevMarkers = usePrevious(markers);

  const router = useRouter();

  useEffect(() => {
    if (!mapRef || infoWindow) return;

    const newInfoWindow = new google.maps.InfoWindow({
      content: document.createElement("div"),
      minWidth: 350,
      maxWidth: 350,
    });

    const root = createRoot(newInfoWindow.getContent() as Element);

    mapRef.addListener("click", () => {
      newInfoWindow.close();
    });

    setInfoWindow({ ref: newInfoWindow, root });
  }, [mapRef, infoWindow]);

  // Add markers to the map when the activities change
  useEffect(() => {
    if (!mapRef || !infoWindow) return;

    if (markers.length !== Object.entries(groupedActivities).length) {
      setMarkers(
        Object.entries(groupedActivities).map(([key, activities]) => {
          const existingMarker = markers.find((marker) => marker.id === key);

          if (existingMarker) {
            return {
              ...existingMarker,
              activities,
            };
          }

          const [lat, lng] = key.split(":").map(parseFloat);

          const pinElement = new google.maps.marker.PinElement({
            background: "#0067BE", // primary
            glyphColor: "#FB9266", //secondary
            borderColor: "#0067BE",
          });

          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: {
              lat,
              lng,
            },
            map: mapRef,
            title: `${activities[0].name}${
              activities.length > 1 ? ` (+${activities.length - 1})` : ""
            }`,
            gmpClickable: true,
            content: pinElement.element,
          });

          // marker.addEventListener("click", () => {
          //   router.push(`/aktivitaet/${getUrlEncodedID(activity.id)}`);
          // });

          marker.addListener("click", () => {
            infoWindow.ref.close();

            infoWindow.root.render(
              <ThemeRegistry>
                <StyleOverride />
                <MarkerActivityDetails activities={activities} />
              </ThemeRegistry>
            );

            infoWindow.ref.open(mapRef, marker);
          });

          // marker.addEventListener("mouseenter", () => {
          //   infoWindow.setContent(
          //     overrideString +
          //       ReactDOMServer.renderToString(
          //         <MarkerActivityDetails activity={activity} />
          //       )
          //   );
          //   infoWindow.open(mapRef, marker);
          // });

          // marker.addEventListener("mouseleave", () => {
          //   infoWindow.close();
          // });

          return {
            id: key,
            marker,
            activities,
          };
        })
      );
    }
  }, [groupedActivities, markers, mapRef, router, infoWindow]);

  // Remove markers from the map when the activities change
  useEffect(() => {
    if (!mapRef) return;

    if (
      prevMarkers &&
      Object.entries(groupedActivities).length !== prevMarkers.length
    ) {
      prevMarkers
        .filter((marker) => !groupedActivities[marker.id])
        .forEach((removed) => {
          if (removed.marker) {
            const greyedOutPinElement = new google.maps.marker.PinElement({
              background: "#BBBBC0", // secondary
              glyphColor: "#616274", // primary
              borderColor: "#BBBBC0",
              scale: 0.85,
            });
            removed.marker.content = greyedOutPinElement.element;
          }
        });
    }
  }, [groupedActivities, prevMarkers, mapRef]);

  const highlightMarker = (activity: Activity) => {
    if (!google.maps.marker) return;

    const existingMarker = markers.find(findActivityId(activity));

    if (!existingMarker) return;

    const { marker, activities } = existingMarker;

    const scaledPinElement = new google.maps.marker.PinElement({
      background: "#FB9266", // secondary
      glyphColor: "#0067BE", // primary
      borderColor: "#FB9266",
      scale: 1.25,
    });

    if (marker) {
      marker.content = scaledPinElement.element;
      mapRef?.panTo(marker.position!);

      if (
        infoWindow?.ref
          ?.getPosition()
          ?.equals(new google.maps.LatLng(marker.position!))
      ) {
        infoWindow.root.render(
          <ThemeRegistry>
            <StyleOverride />
            <MarkerActivityDetails
              activities={activities}
              highlight={activity.id}
            />
          </ThemeRegistry>
        );
      }
    }
  };

  const unhighlightMarker = (activity: Activity) => {
    if (!google.maps.marker) return;

    const marker = markers.find(findActivityId(activity))?.marker;

    const pinElement = new google.maps.marker.PinElement({
      background: "#0067BE", // primary
      glyphColor: "#FB9266", // secondary
      borderColor: "#0067BE",
    });

    if (marker) {
      marker.content = pinElement.element;
    }
  };

  return [highlightMarker, unhighlightMarker];
}

function findActivityId(activity: Activity) {
  return (existingMarker: ExtendedMarkerType) =>
    existingMarker.activities.map((a) => a.id).includes(activity.id);
}
