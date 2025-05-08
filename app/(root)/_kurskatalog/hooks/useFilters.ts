import { User } from "@/api/types/user";
import { useEffect, useMemo, useState } from "react";
import { INITIAL_FILTERS } from "../constants/filters";
import { Filters } from "@/types/filters";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function useFilters({ user }: { user: User | null }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const initialFilterState = useMemo(() => {
    const searchParamFilters = Object.fromEntries(
      Object.keys(INITIAL_FILTERS).map((key) => {
        const searchParamValue = searchParams.get(key);

        return [
          key,
          searchParamValue
            ? decodeSearchParam(searchParamValue)
            : INITIAL_FILTERS[key as keyof Filters],
        ];
      })
    ) as Filters;

    return {
      ...searchParamFilters,
      location: searchParamFilters.location || parseUserLocation(user),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filters, setFilters] = useState<Filters>(initialFilterState);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (
        JSON.stringify(value) !==
        JSON.stringify(INITIAL_FILTERS[key as keyof Filters])
      ) {
        params.set(key, encodeSearchParam(value));
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  }, [filters, searchParams, pathname, replace]);

  return {
    filters,
    setFilters,
  };
}

function encodeSearchParam(value: Filters[keyof Filters]) {
  return JSON.stringify(value);
}

function decodeSearchParam(value: string) {
  return JSON.parse(value);
}

function parseUserLocation(user: User | null) {
  return user?.location
    ? {
        input: user.location.postal_code,
        lat: user.location.lat,
        lng: user.location.lng,
      }
    : null;
}
