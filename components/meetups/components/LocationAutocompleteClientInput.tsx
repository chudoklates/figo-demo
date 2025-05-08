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
import { SyntheticEvent, useCallback } from "react";
import useLocationSearch from "@/lib/hooks/useLocationSearch";
import { LocationAutocomplete } from "@/components";
import { RADI } from "@/constants/filters";
import { LocationFilters } from "@/types/filters";

export default function LocationAutocompleteClientInput({
  filters,
  setFilters,
}: {
  filters: LocationFilters;
  setFilters: (filters: LocationFilters) => void;
}) {
  const {
    search,
    setSearch,
    getLocationFromGeocoder,
    suggestions,
    handleSearchChange,
    focused,
    setFocused,
    error,
    setError,
  } = useLocationSearch(filters?.location?.input);

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
    setFilters({
      ...filters,
      location: null,
    });
  }, [setSearch, setError, setFilters, filters]);

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

        getLocationFromGeocoder(address).then((geometry) => {
          if (geometry) {
            const { location, bounds } = geometry;

            setError(null);

            setFilters({
              ...filters,
              location: {
                lat: location.lat(),
                lng: location.lng(),
                input: address,
                bounds: bounds
                  ? {
                      ne: bounds.getNorthEast().toJSON(),
                      sw: bounds.getSouthWest().toJSON(),
                    }
                  : undefined,
              },
            });
          }
        });
      }
    },
    [getLocationFromGeocoder, setSearch, setError, filters, setFilters]
  );

  const handleRadiusChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setFilters({
        ...filters,
        radius: event.target.value as number,
      });
    },
    [setFilters, filters]
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
          value={filters?.radius ?? ""}
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
