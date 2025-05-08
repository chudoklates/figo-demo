import { MappedActivity } from "@/api/types/activities";
import { User } from "@/api/types/user";
import { Filters } from "@/types/filters";

export type ActivityListProps = {
  fullWidth: boolean;
  mapRef: google.maps.Map | null;
  filters: Filters;
  toggleMap: () => void;
  user: User | null;
};

export type SortFunction<T> = (a: T, b: T) => number;

export type SortOption = {
  label: string;
  value: string;
  sortMethod: SortFunction<MappedActivity>;
};

export type SortGroup = {
  label: string;
  options: SortOption[];
};
