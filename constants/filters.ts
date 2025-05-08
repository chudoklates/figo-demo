import { DateFilterKey, LocationFilters } from "@/types/filters";
import dayjs from "dayjs";

export const INITIAL_FILTERS: LocationFilters = {
  location: null,
  radius: 5,
};

export const RADI: Array<{ value: number; label: string }> = [
  { value: 3, label: "<3 km" },
  { value: 5, label: "<5 km" },
  { value: 10, label: "<10 km" },
  { value: 20, label: "<20 km" },
];

export const KEY_DATE_MAP: Record<
  DateFilterKey,
  { startDate: string; endDate: string }
> = {
  dwoche: {
    startDate: dayjs().startOf("week").toISOString(),
    endDate: dayjs().endOf("week").toISOString(),
  },
  dmonat: {
    startDate: dayjs().startOf("month").toISOString(),
    endDate: dayjs().endOf("month").toISOString(),
  },
  nmonat: {
    startDate: dayjs().add(1, "month").startOf("month").toISOString(),
    endDate: dayjs().add(1, "month").endOf("month").toISOString(),
  },
};
