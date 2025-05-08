import { Close, LocationOn, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { Filters, RangeFilter } from "@/types/filters";
import {
  CATEGORIES,
  DATES,
  DURATIONS,
  INITIAL_FILTERS,
  RADI,
  TIMES,
} from "../constants/filters";
import { SyntheticEvent, useContext } from "react";
import { UserContext } from "@/lib/context/UserContext";
import { ActivityCategory } from "@/api/types/activities";
import useLocationSearch from "@/lib/hooks/useLocationSearch";
import { LocationAutocomplete } from "@/components";

const gradientBackground = `
  radial-gradient(
    circle at center left,
    rgba(0, 103, 190, 0.44),
    #ffff 50%
  ),
  radial-gradient(ellipse at top right, rgba(255, 148, 48, 0.60), #ffff 40%);
`;

export default function CatalogueFilters({
  filters,
  setFilters,
  clearFilters,
  hidden,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  hidden: boolean;
}) {
  const { user } = useContext(UserContext);

  const {
    search,
    setSearch,
    getLocationFromGeocoder,
    suggestions,
    handleSearchChange,
    updated,
    setUpdated,
    focused,
    setFocused,
    error,
    setError,
  } = useLocationSearch({ location: filters.location });

  const handleInputChange = (
    event: SyntheticEvent | null,
    newValue: string
  ) => {
    if (event) {
      handleSearchChange(newValue);
    }
  };

  const renderInput = (params: any) => (
    <OutlinedInput
      id={params.id}
      inputProps={params.inputProps}
      fullWidth={params.fullWidth}
      {...params.InputProps}
      sx={{
        borderRadius: { xs: "20px", lg: "40px 0 0 40px" },
        backgroundColor: "white",
      }}
      error={!!error}
      placeholder="Stadtteil oder PLZ"
      onFocus={() => {
        setFocused(true);
        if (search === user?.location?.postal_code && !updated) {
          setSearch("");
        }
      }}
      onBlur={() => {
        setFocused(false);
        if (search === "" && !updated) {
          setSearch(user?.location?.postal_code || "");
        }
      }}
      startAdornment={<LocationOn />}
      endAdornment={
        search.length > 0 ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear"
              onClick={() => {
                setUpdated(true);
                setFilters({
                  ...filters,
                  location: null,
                });
                setError(null);
                setSearch("");
              }}
            >
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
  );

  const handleAutocompleteChange = (
    _event: SyntheticEvent,
    newValue: string | google.maps.places.AutocompletePrediction
  ) => {
    if (newValue) {
      const address =
        typeof newValue === "string" ? newValue : newValue.description;

      setUpdated(true);
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
  };

  return (
    <Stack
      sx={{
        display: { xs: hidden ? "none" : "flex", lg: "flex" },
        pt: { xs: 4.5, lg: 10.5 },
        px: 5,
        pb: 4,
        alignItems: "center",
        backgroundImage: gradientBackground,
        backgroundBlendMode: "multiply",
      }}
    >
      <Stack
        sx={{
          width: { xs: "100%", md: 600, lg: "unset" },
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 0 }}
        >
          <LocationAutocomplete
            renderInput={renderInput}
            sx={{
              width: { xs: "100%", lg: 433 },
            }}
            inputValue={search}
            onInputChange={handleInputChange}
            open={focused && search.length > 0 && suggestions?.data.length > 0}
            options={suggestions?.data || []}
            loading={suggestions?.loading}
            onChange={handleAutocompleteChange}
          />
          <Select
            value={filters.radius || ""}
            displayEmpty
            sx={{
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: "white",
              width: { xs: "100%", lg: 220 },
            }}
            onChange={(event) => {
              setFilters({
                ...filters,
                radius: event.target.value as number,
              });
            }}
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
          <Button
            variant="secondary"
            disabled
            sx={(theme) => ({
              color: "white !important",
              borderRadius: "40px",
              [theme.breakpoints.up("lg")]: {
                borderRadius: "0 40px 40px 0",
              },
              "& .MuiButton-label": {
                display: "block",
                [theme.breakpoints.up("lg")]: {
                  display: "none",
                },
              },
              "& .MuiButton-endIcon": {
                [theme.breakpoints.up("lg")]: {
                  marginLeft: 0,
                },
                "& svg": {
                  width: 24,
                  height: 24,
                },
              },
            })}
            endIcon={<Search />}
          >
            <span className="MuiButton-label">Suche</span>
          </Button>
        </Stack>
        <FormHelperText error={!!error} sx={{ pl: { xs: 0, lg: 4 } }}>
          {error || " "}
        </FormHelperText>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: { xs: "none", lg: "flex" },
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 2,
          justifyContent: "center",
          px: 8,
          pt: 3,
        }}
      >
        <Select
          value={filters.categories || []}
          displayEmpty
          sx={{ backgroundColor: "white", width: 230, borderRadius: "20px" }}
          multiple
          onChange={(event) => {
            setFilters({
              ...filters,
              categories: event.target.value as ActivityCategory[],
            });
          }}
          renderValue={(value) =>
            value.length === 0
              ? "Kategorie"
              : value
                  .map(
                    (v) => CATEGORIES.find(({ value }) => v === value)?.label
                  )
                  .join(", ")
          }
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 450,
              },
            },
          }}
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              <Checkbox
                checked={filters.categories.indexOf(category.value) > -1}
              />
              {category.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={filters.date[0] ? JSON.stringify(filters.date[0]) : ""}
          displayEmpty
          sx={{ backgroundColor: "white", width: 160, borderRadius: "20px" }}
          onChange={(event) => {
            setFilters({
              ...filters,
              date: [JSON.parse(event.target.value) as RangeFilter<string>],
            });
          }}
          renderValue={(value) =>
            DATES.find(({ value: v }) => value === JSON.stringify(v))?.label ||
            "Jederzeit"
          }
          {...(filters.date.length > 0 && {
            IconComponent: () => (
              <IconButton
                aria-label="clear"
                onClick={() =>
                  setFilters({
                    ...filters,
                    date: [],
                  })
                }
              >
                <Close />
              </IconButton>
            ),
          })}
        >
          {DATES.map((date) => (
            <MenuItem key={date.label} value={JSON.stringify(date.value)}>
              <Checkbox
                checked={filters.date.some(
                  (v) => JSON.stringify(v) === JSON.stringify(date.value)
                )}
              />
              {date.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={filters.time.map((value) => JSON.stringify(value)) || []}
          multiple
          displayEmpty
          sx={{ backgroundColor: "white", width: 220, borderRadius: "20px" }}
          onChange={(event) => {
            setFilters({
              ...filters,
              time: (event.target.value as string[]).map((value) =>
                JSON.parse(value)
              ) as RangeFilter<number>[],
            });
          }}
          renderValue={(value) =>
            value
              .map(
                (v) =>
                  TIMES.find(({ value }) => JSON.stringify(value) === v)?.label
              )
              .join(", ") || "Tageszeit"
          }
        >
          {TIMES.map((time) => (
            <MenuItem key={time.label} value={JSON.stringify(time.value)}>
              <Checkbox
                checked={filters.time.some(
                  (v) => JSON.stringify(v) === JSON.stringify(time.value)
                )}
              />
              {time.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={filters.duration ? JSON.stringify(filters.duration) : ""}
          displayEmpty
          sx={{ backgroundColor: "white", width: 150, borderRadius: "20px" }}
          onChange={(event) => {
            setFilters({
              ...filters,
              duration: JSON.parse(event.target.value) as RangeFilter<number>,
            });
          }}
          renderValue={(value) =>
            DURATIONS.find(({ value: v }) => value === JSON.stringify(v))
              ?.label || "Dauer"
          }
          {...(filters.duration && {
            IconComponent: () => (
              <IconButton
                aria-label="clear"
                onClick={() =>
                  setFilters({
                    ...filters,
                    duration: null,
                  })
                }
              >
                <Close />
              </IconButton>
            ),
          })}
        >
          {DURATIONS.map((duration) => (
            <MenuItem
              key={duration.label}
              value={JSON.stringify(duration.value)}
            >
              {duration.label}
            </MenuItem>
          ))}
        </Select>
        {/* <Tooltip
          title={
            !user?.location && !filters.location
              ? "Bitte zuerst ein Standort wählen"
              : ""
          }
          {...(filters.radius && {
            IconComponent: () => (
              <IconButton
                aria-label="clear"
                onClick={() =>
                  setFilters({
                    ...filters,
                    radius: null,
                  })
                }
              >
                <Close />
              </IconButton>
            ),
          })}
        >
          <Select
            disabled={!user?.location && !filters.location}
            value={filters.radius || ""}
            displayEmpty
            sx={{ backgroundColor: "white", width: 160, borderRadius: "20px" }}
            onChange={(event) => {
              setFilters({
                ...filters,
                radius: event.target.value as number,
              });
            }}
            renderValue={(value) =>
              RADI.find(({ value: v }) => value === v)?.label || "Entfernung"
            }
          >
            {RADI.map((radius) => (
              <MenuItem key={radius.value} value={radius.value}>
                {radius.label}
              </MenuItem>
            ))}
          </Select>
        </Tooltip> */}
        <Button
          variant="text"
          onClick={() => {
            clearFilters();
            setSearch("");
            setUpdated(true);
            setError(null);
          }}
          disabled={JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)}
        >
          Alle entfernen
        </Button>
      </Stack>
    </Stack>
  );
}
