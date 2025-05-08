import { Button, Container, Stack, Typography } from "@mui/material";
import CatalogueSort from "./CatalogueSort";

export default function ActivityListHeader({
  hideMap,
  toggleMap,
  nActivities,
  setSortMethod,
}: {
  hideMap: boolean;
  toggleMap: () => void;
  nActivities: number;
  setSortMethod: (sortMethod: any) => void;
}) {
  return (
    <Container
      component={Stack}
      maxWidth="lg"
      direction="row"
      display="flex !important"
      justifyContent="space-between"
      pt={2.5}
      alignItems="baseline"
    >
      <Typography
        sx={{
          color: "grey.800",
          fontWeight: 500,
          fontSize: { xs: 16, lg: 18 },
        }}
      >
        {nActivities || "Keine"} {`Ergebniss${nActivities === 1 ? "" : "e"}`}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "baseline",
        }}
      >
        {nActivities > 0 ? (
          <CatalogueSort setSortMethod={setSortMethod} />
        ) : null}
        {hideMap ? (
          <Button
            onClick={toggleMap}
            variant="outlined"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            Karte zeigen
          </Button>
        ) : null}
      </Stack>
    </Container>
  );
}
