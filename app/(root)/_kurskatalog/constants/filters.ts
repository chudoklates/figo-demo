import dayjs from "dayjs";
import { Filters, OpenRangeFilter, RangeFilter } from "@/types/filters";
import { ActivityCategory } from "@/api/types/activities";

export const CATEGORIES: Array<{ value: ActivityCategory; label: string }> = [
  { value: "painting", label: "Malen" },
  { value: "drawing", label: "Zeichnen" },
  { value: "it", label: "Informatik" },
  { value: "cantienica", label: "Bewegungskurse" },
  { value: "pilates", label: "Pilates" },
  { value: "creative_writing", label: "Kreatives Schreiben" },
  { value: "yoga", label: "Yoga" },
  { value: "tai_chi", label: "Tai Chi" },
  { value: "qigong", label: "Qigong" },
  { value: "dancing", label: "Tanzen" },
  { value: "macrame", label: "Macrame" },
  { value: "language_classes", label: "Sprachcafé" },
  { value: "kungfu", label: "Kampfsport" },
  { value: "theater", label: "Theater" },
  { value: "meditation", label: "Meditation" },
];

export const LOCATIONS: Array<{
  value: { lat: number; lng: number };
  label: string;
}> = [
  { label: "Mitte", value: { lat: 52.520008, lng: 13.404954 } },
  { label: "Kreuzberg", value: { lat: 52.497222, lng: 13.395833 } },
  { label: "Prenzlauer Berg", value: { lat: 52.539167, lng: 13.425278 } },
  { label: "Friedrichshain", value: { lat: 52.515833, lng: 13.461111 } },
  { label: "Neukölln", value: { lat: 52.481111, lng: 13.435833 } },
  { label: "***REMOVED***", value: { lat: 52.516667, lng: 13.283333 } },
  { label: "Schöneberg", value: { lat: 52.483333, lng: 13.35 } },
  { label: "Wedding", value: { lat: 52.550833, lng: 13.341667 } },
  { label: "Moabit", value: { lat: 52.533333, lng: 13.35 } },
  { label: "Tempelhof", value: { lat: 52.47, lng: 13.385833 } },
  { label: "Lichtenberg", value: { lat: 52.516667, lng: 13.5 } },
  { label: "Reinickendorf", value: { lat: 52.583333, lng: 13.3 } },
];

export const RADI: Array<{ value: number | null; label: string }> = [
  { value: 3000, label: "<3 km" },
  { value: 5000, label: "<5 km" },
  { value: 10000, label: "<10 km" },
  { value: 20000, label: "<20 km" },
  { value: null, label: "Automatisch" },
];

export const DURATIONS: Array<{
  value: OpenRangeFilter<number>;
  label: string;
}> = [
  { value: { min_value: 0, max_value: 59 }, label: "< 1 Stunde" },
  { value: { min_value: 60, max_value: 119 }, label: "< 2 Stunden" },
  { value: { min_value: 120 }, label: "2+ Stunden" },
];

export const DATES: Array<{
  value: RangeFilter<string>;
  label: string;
}> = [
  {
    value: {
      min_value: dayjs().startOf("day").toISOString(),
      max_value: dayjs().endOf("day").toISOString(),
    },
    label: "Heute",
  },
  {
    value: {
      min_value: dayjs().add(1, "day").startOf("day").toISOString(),
      max_value: dayjs().add(1, "day").endOf("day").toISOString(),
    },
    label: "Morgen",
  },
  {
    value: {
      min_value: dayjs().add(2, "day").startOf("day").toISOString(),
      max_value: dayjs().add(2, "day").endOf("day").toISOString(),
    },
    label: "Übermorgen",
  },
  {
    label: "Diese Woche",
    value: {
      min_value: dayjs().startOf("week").toISOString(),
      max_value: dayjs().endOf("week").toISOString(),
    },
  },
  {
    label: "Nächste Woche",
    value: {
      min_value: dayjs().add(1, "week").startOf("week").toISOString(),
      max_value: dayjs().add(1, "week").endOf("week").toISOString(),
    },
  },
];

export const TIMES: Array<{
  value: RangeFilter<number>;
  label: string;
}> = [
  { value: { min_value: 6, max_value: 11 }, label: "Morgen (6:00 - 12:00)" },
  {
    value: { min_value: 12, max_value: 17 },
    label: "Nachmittag (12:00 - 18:00)",
  },
  { value: { min_value: 18, max_value: 22 }, label: "Abend (18:00 - 22:00)" },
];

export const INITIAL_FILTERS: Filters = {
  search: "",
  location: null,
  categories: [],
  date: [],
  time: [],
  radius: 5000,
  duration: null,
};
