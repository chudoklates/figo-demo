"use client";

import Typography from "@mui/material/Typography";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { LocationSuggestion } from "@/types/geo";

export default function LocationAutocomplete(
  props: AutocompleteProps<LocationSuggestion | string, undefined, true, true>
) {
  return (
    <Autocomplete
      id="location-input"
      {...props}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option?.description
      }
      fullWidth
      filterOptions={(x) => x}
      filterSelectedOptions
      noOptionsText="Keine Ergebnisse"
      disableClearable
      blurOnSelect
      freeSolo
      openOnFocus
      forcePopupIcon={false}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            key={typeof option === "string" ? option : option.place_id}
          >
            <Typography
              variant="body2"
              sx={{
                pl: 2.5,
              }}
            >
              {typeof option === "string" ? option : option.description}
            </Typography>
          </li>
        );
      }}
    />
  );
}
