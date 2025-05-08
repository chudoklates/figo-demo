import { TimeSlotFilter } from "@/api/types/event";
import { getGeometryForAddress } from "@/app/actions/geo";
import { INITIAL_FILTERS, KEY_DATE_MAP } from "@/constants/filters";
import { approximateRadius } from "@/lib/geo/utils";
import { DateFilterKey, LocationFilters } from "@/types/filters";

export const getFilters = async (searchParams: {
  [x: string]: string;
}): Promise<TimeSlotFilter> => {
  const { startDate, endDate } =
    KEY_DATE_MAP[searchParams.datum as DateFilterKey] || {};

  const input = searchParams.ort || "";
  const locationParam = searchParams.location || "";

  const parsed = parseIfJSON(locationParam);

  const oldInput =
    typeof parsed === "object"
      ? (parsed?.input as string | undefined)
      : `${parsed}`;

  const geometry =
    input || oldInput ? await getGeometryForAddress(input || oldInput!) : null;

  const location = geometry?.location as google.maps.LatLngLiteral | undefined;

  const bounds = geometry?.bounds as
    | {
        northeast: google.maps.LatLngLiteral;
        southwest: google.maps.LatLngLiteral;
      }
    | undefined;

  const radius = searchParams.radius
    ? parseInt(searchParams.radius)
    : INITIAL_FILTERS.radius;

  const offsetRadius =
    bounds && location
      ? Math.floor(
          approximateRadius({
            start: location,
            ne: bounds.northeast,
            sw: bounds.southwest,
          })
        ) / 1000
      : 0;

  const filters: TimeSlotFilter = {
    ...(location
      ? {
          restaurant: {
            location_within_circle: {
              lat: location.lat,
              lon: location.lng,
              radius: radius + offsetRadius,
            },
          },
        }
      : {}),
    restaurant_exists: true,
    seats_gt: 0,
    AND: [
      ...(startDate && endDate
        ? [
            {
              startDate_gte: startDate,
              startDate_lt: endDate,
            },
          ]
        : []),
      {
        startDate_gte: new Date().toISOString(),
      },
    ],
  };

  return filters;
};

export const getClientSideFilters = (
  { location, radius }: LocationFilters,
  startDate: Date,
  exclude?: string
) => {
  const offsetRadius = location?.bounds
    ? Math.floor(
        approximateRadius({
          start: location,
          ne: location.bounds.ne,
          sw: location.bounds.sw,
        })
      ) / 1000
    : 0;

  const filters: TimeSlotFilter = {
    ...(location
      ? {
          restaurant: {
            location_within_circle: {
              lat: location.lat,
              lon: location.lng,
              radius: radius + offsetRadius,
            },
          },
        }
      : {}),
    ...(exclude && {
      sys: {
        id_not: exclude,
      },
    }),
    restaurant_exists: true,
    seats_gt: 0,
    startDate_gte: startDate.toISOString(),
  };

  return filters;
};

export function parseIfJSON(str: string) {
  try {
    const result = JSON.parse(str);

    return result;
  } catch (e) {
    return str;
  }
}
