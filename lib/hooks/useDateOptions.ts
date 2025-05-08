import { DateFilterKey } from "@/types/filters";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useCallback, useMemo } from "react";

const OPTIONS = [
  { label: "Alle anzeigen" },
  {
    label: "Diese Woche",
    key: "dwoche" as const,
  },
  {
    label: "Dieser Monat",
    key: "dmonat" as const,
  },
  {
    label: "Nächster Monat",
    key: "nmonat" as const,
  },
];

export default function useDateOptions() {
  const readOnlySearchParams = useSearchParams();
  const baseUrl = usePathname();

  const getHref = useCallback(
    (key?: DateFilterKey) => {
      const searchParams = new URLSearchParams(readOnlySearchParams.toString());

      searchParams.delete("page");

      if (!key) {
        searchParams.delete("datum");

        return `${baseUrl}?${searchParams.toString()}`;
      }

      searchParams.set("datum", key);

      return `${baseUrl}?${searchParams.toString()}`;
    },
    [baseUrl, readOnlySearchParams]
  );

  const options = useMemo(
    () =>
      OPTIONS.map((option) => ({
        ...option,
        href: getHref(option.key),
        active: isActive(readOnlySearchParams, option.key),
      })),
    [getHref, readOnlySearchParams]
  );

  return options;
}

function isActive(
  params: ReadonlyURLSearchParams,
  key: DateFilterKey | undefined
) {
  const paramKey = params.get("datum");

  if (!paramKey) {
    return typeof key === "undefined";
  }

  return paramKey === key;
}
