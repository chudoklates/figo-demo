import { Close, FilterList } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Stack,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import type { Filters } from "@/types/filters";
import {
  CATEGORIES,
  DATES,
  DURATIONS,
  INITIAL_FILTERS,
  RADI,
  TIMES,
} from "../constants/filters";
import { UserContext } from "@/lib/context/UserContext";

export default function MobileFilters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) {
  const { user } = useContext(UserContext);

  // Temporary filters to store changes before applying them
  const [tempFilters, setTempFilters] = React.useState<Filters>(filters);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFilterChange = (key: keyof Filters, value: any, checked: boolean) => {
    setTempFilters({
      ...tempFilters,
      [key]: checked ? value : INITIAL_FILTERS[key],
    });
  };

  const onMultipleFilterChange = (
    key: "categories" | "date" | "time",
    value: any,
    checked: boolean
  ) => {
    if (checked) {
      setTempFilters({
        ...tempFilters,
        [key]: [...tempFilters[key], value],
      });
    } else {
      setTempFilters({
        ...tempFilters,
        [key]: tempFilters[key].filter(
          (v) => JSON.stringify(v) !== JSON.stringify(value)
        ),
      });
    }
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    handleClose();
  };

  const clearFilters = () => {
    setTempFilters(INITIAL_FILTERS);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        startIcon={<FilterList />}
        color="inherit"
        onClick={handleClickOpen}
      >
        Filters
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="#filters"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
        <DialogTitle id={"filters"}>Filters</DialogTitle>
        <DialogContent dividers>
          {/* CATEGORY */}
          <Typography variant="h5" gutterBottom>
            Kategorie
          </Typography>
          <FormControl component="fieldset" variant="standard" sx={{ pb: 2 }}>
            <FormGroup>
              <Stack
                spacing={2}
                sx={{
                  pt: 2,
                }}
              >
                {CATEGORIES.map((category) => (
                  <FormControlLabel
                    key={category.value}
                    control={
                      <Checkbox
                        checked={tempFilters.categories.includes(
                          category.value
                        )}
                        onChange={(event) =>
                          onMultipleFilterChange(
                            "categories",
                            category.value,
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={category.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </FormControl>
          {/* DATE */}
          <Typography variant="h5" gutterBottom>
            Datum
          </Typography>
          <FormControl component="fieldset" variant="standard" sx={{ pb: 2 }}>
            <FormGroup>
              <Stack
                spacing={2}
                sx={{
                  pt: 2,
                }}
              >
                {DATES.map((date) => (
                  <FormControlLabel
                    key={date.label}
                    control={
                      <Checkbox
                        checked={tempFilters.date.some(
                          (d) =>
                            JSON.stringify(d) === JSON.stringify(date.value)
                        )}
                        onChange={(event) =>
                          onFilterChange(
                            "date",
                            [date.value],
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={date.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </FormControl>
          {/* TIME OF DAY */}
          <Typography variant="h5" gutterBottom>
            Tageszeit
          </Typography>
          <FormControl component="fieldset" variant="standard" sx={{ pb: 2 }}>
            <FormGroup>
              <Stack
                spacing={2}
                sx={{
                  pt: 2,
                }}
              >
                {TIMES.map((time) => (
                  <FormControlLabel
                    key={time.label}
                    control={
                      <Checkbox
                        checked={tempFilters.time.some(
                          (d) =>
                            JSON.stringify(d) === JSON.stringify(time.value)
                        )}
                        onChange={(event) =>
                          onMultipleFilterChange(
                            "time",
                            time.value,
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={time.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </FormControl>
          {/* DURATION */}
          <Typography variant="h5" gutterBottom>
            Dauer
          </Typography>
          <FormControl component="fieldset" variant="standard" sx={{ pb: 2 }}>
            <FormGroup>
              <Stack
                spacing={2}
                sx={{
                  pt: 2,
                }}
              >
                {DURATIONS.map((duration) => (
                  <FormControlLabel
                    key={duration.label}
                    control={
                      <Checkbox
                        checked={
                          JSON.stringify(tempFilters.duration) ===
                          JSON.stringify(duration.value)
                        }
                        onChange={(event) =>
                          onFilterChange(
                            "duration",
                            duration.value,
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={duration.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </FormControl>
          {/* DISTANCE */}
          <Typography variant="h5" gutterBottom>
            Entfernung
          </Typography>
          {!user?.location && !tempFilters.location ? (
            <Typography variant="subtitle2" gutterBottom>
              Bitte zuerst ein Standort wählen
            </Typography>
          ) : null}
          <FormControl
            disabled={!user?.location && !tempFilters.location}
            component="fieldset"
            variant="standard"
            sx={{ pb: 2 }}
          >
            <FormGroup>
              <Stack
                spacing={2}
                sx={{
                  pt: 2,
                }}
              >
                {RADI.map((radius) => (
                  <FormControlLabel
                    key={radius.label}
                    control={
                      <Checkbox
                        checked={
                          JSON.stringify(tempFilters.radius) ===
                          JSON.stringify(radius.value)
                        }
                        onChange={(event) =>
                          onFilterChange(
                            "radius",
                            radius.value,
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={radius.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              flexGrow: 1,
              color: "grey.800",
            }}
          >
            <Button
              onClick={applyFilters}
              variant="contained"
              size="large"
              color="primary"
            >
              Ergebnisse zeigen
            </Button>
            <Button
              onClick={clearFilters}
              color="inherit"
              disabled={
                JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)
              }
            >
              Alle entfernen
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
