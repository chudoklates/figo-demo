import { ActivityCategory } from "@/api/types/activities";
import { LatLng, FiltersLocation } from "./geo";

type FieldFilterOperator = {
  datetime?: {
    gt?: string;
    lt?: string;
  };
  date?: {
    gt?: string;
    lt?: string;
    gte?: string;
    lte?: string;
  };
  text?: {
    contains?: string;
  };
  multi_select?: {
    in?: string[];
  };
  location?: {
    radius?: {
      point: LatLng;
      radius: number;
    };
  };
  integer?: {
    gte?: number;
    gt?: number;
    lt?: number;
    lte?: number;
  };
};

export type NestedFieldFilter = {
  tech_name: string;
  value: FieldFilterOperator;
};

export type RangeFilter<K> = {
  min_value: K;
  max_value: K;
};

export type OpenRangeFilter<K> = {
  min_value?: K;
  max_value?: K;
};

export type Filters = {
  search: string;
  location: FiltersLocation | null;
  categories: ActivityCategory[];
  date: RangeFilter<string>[];
  time: RangeFilter<number>[];
  radius: number | undefined;
  duration: OpenRangeFilter<number> | null;
};

export type LocationFilters = {
  location: FiltersLocation | null;
  radius: number;
};

export type DateFilterKey = "dwoche" | "dmonat" | "nmonat";
