"use client";

import React from "react";

import { Container, Stack } from "@mui/material";
import FilterBox from "./components/FilterBox";
import useDateOptions from "@/lib/hooks/useDateOptions";
import LocationAutocompleteInput from "./components/LocationAutocompleteInput";
import { AutocompleteProvider, GeocodingProvider } from "../geo";

export default function EventsFilters({ short }: { short?: boolean }) {
  const options = useDateOptions();

  return (
    <GeocodingProvider>
      <AutocompleteProvider>
        <Stack sx={{ alignItems: "center" }}>
          <Container maxWidth="sm" disableGutters>
            <LocationAutocompleteInput />
            {!short && (
              <Stack
                direction="row"
                sx={{
                  justifyContent: { xs: "space-around", ss: "space-between" },
                  rowGap: 2,
                  flexWrap: { xs: "wrap", ss: "nowrap" },
                }}
              >
                {options.map((option) => (
                  <FilterBox
                    key={option.label}
                    label={option.label}
                    href={option.href}
                    active={option.active}
                  />
                ))}
              </Stack>
            )}
          </Container>
        </Stack>
      </AutocompleteProvider>
    </GeocodingProvider>
  );
}
