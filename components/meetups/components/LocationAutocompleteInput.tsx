"use client";

import { Close, Search } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { SyntheticEvent, useCallback, useEffect } from "react";
import useLocationSearch from "@/lib/hooks/useLocationSearch";
import { LocationAutocomplete } from "@/components";
import { RADI } from "@/constants/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseIfJSON } from "@/utils/filters";

export default function LocationAutocompleteInput() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const input = searchParams.get("ort") || "";
  const location = searchParams.get("location") || "";

  const parsed = parseIfJSON(location);
  const oldInput =
    typeof parsed === "object"
      ? (parsed?.input as string | undefined)
      : `${parsed}`;

  const radius = searchParams.get("radius") || "5";

  const {
    search,
    setSearch,
    suggestions,
    handleSearchChange,
    focused,
    setFocused,
    error,
    setError,
  } = useLocationSearch(input || oldInput);

  useEffect(() => {
    const clear = searchParams.get("clear");

    if (clear) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("clear");

      setError(null);
      setSearch("");

      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, setSearch, setError, replace, pathname]);

  const handleInputChange = (
    event: SyntheticEvent | null,
    newValue: string
  ) => {
    if (event) {
      handleSearchChange(newValue);
    }
  };

  const handleClear = useCallback(() => {
    setError(null);
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("ort");
    params.delete("radius");

    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace, setSearch, setError]);

  const renderInput = useCallback(
    (params: any) => (
      <OutlinedInput
        id={params.id}
        inputProps={params.inputProps}
        fullWidth={params.fullWidth}
        {...params.InputProps}
        sx={{
          borderRadius: { xs: "40px", ss: "40px 0 0 40px" },
          backgroundColor: "white",
        }}
        error={!!error}
        placeholder="Stadtteil oder PLZ"
        startAdornment={<Search />}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        endAdornment={
          search.length > 0 ? (
            <InputAdornment position="end">
              <IconButton aria-label="clear" onClick={handleClear}>
                <Close />
              </IconButton>
            </InputAdornment>
          ) : (
            <Box
              sx={{
                width: 40,
                height: 40,
              }}
            />
          )
        }
      />
    ),
    [error, search, setFocused, handleClear]
  );

  const handleAutocompleteChange = useCallback(
    (
      _event: SyntheticEvent,
      newValue: string | google.maps.places.AutocompletePrediction
    ) => {
      if (newValue) {
        const address =
          typeof newValue === "string" ? newValue : newValue.description;

        setSearch(address);

        const params = new URLSearchParams(searchParams.toString());

        params.set("ort", address);

        params.delete("page");

        replace(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams, pathname, replace, setSearch]
  );

  const handleRadiusChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      const value = `${event.target.value}`;

      if (value) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("radius", value);

        params.delete("page");

        replace(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams, pathname, replace]
  );

  return (
    <Stack>
      <Stack direction={{ xs: "column", ss: "row" }} spacing={{ xs: 2, ss: 0 }}>
        <LocationAutocomplete
          renderInput={renderInput}
          sx={{
            width: { xs: "100%", ss: 400 },
          }}
          inputValue={search}
          onInputChange={handleInputChange}
          open={focused && search.length > 0 && suggestions?.data.length > 0}
          options={suggestions?.data || []}
          loading={suggestions?.loading}
          onChange={handleAutocompleteChange}
        />
        <Select
          value={radius ? parseInt(radius, 10) : ""}
          displayEmpty
          sx={{
            borderRadius: { xs: "40px", ss: "0 40px 40px 0" },
            backgroundColor: "white",
            width: { xs: "100%", ss: 200 },
          }}
          onChange={handleRadiusChange}
          renderValue={(value) =>
            RADI.find(({ value: v }) => value === v)?.label || "Automatisch"
          }
        >
          {RADI.map((radius) => (
            <MenuItem key={radius.label} value={radius.value as number}>
              {radius.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <FormHelperText error={!!error} sx={{ pl: { xs: 0, lg: 4 } }}>
        {error || " "}
      </FormHelperText>
    </Stack>
  );
}
