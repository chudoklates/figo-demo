import { Button, Container, Divider, Stack } from "@mui/material";
import MobileFilters from "./MobileFilters";
import { Map } from "@mui/icons-material";
import type { Filters } from "@/types/filters";
import { INITIAL_FILTERS } from "../constants/filters";

export default function MobileFiltersContainer({
  setFilters,
  filters,
  hideMap,
  toggleMap,
  clearFilters,
}: {
  setFilters: (filters: any) => void;
  filters: Filters;
  hideMap: boolean;
  toggleMap: () => void;
  clearFilters: () => void;
}) {
  return (
    <Stack>
      <Container
        component={Stack}
        maxWidth="lg"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        display={{ xs: "flex", lg: "none" }}
        color="grey.800"
      >
        <MobileFilters setFilters={setFilters} filters={filters} />
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={toggleMap}
          startIcon={<Map />}
        >
          Karte {hideMap ? "zeigen" : "ausblenden"}
        </Button>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={clearFilters}
          disabled={JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)}
        >
          Alle entfernen
        </Button>
      </Container>
      <Divider flexItem />
    </Stack>
  );
}
