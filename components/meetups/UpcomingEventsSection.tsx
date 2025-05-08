"use client";

import { ComponentUpcomingEventsSection, CTAType } from "@/graphql/types/cms";
import { Container, Stack, Typography } from "@mui/material";
import CTA from "../landing/components/CTA";
import UpcomingEventsList from "./UpcomingEventsList";
import { useMemo, useState } from "react";
import { LocationFilters } from "@/types/filters";
import LocationAutocompleteClientInput from "./components/LocationAutocompleteClientInput";
import { getClientSideFilters } from "@/utils/filters";
import { AutocompleteProvider, GeocodingProvider } from "../geo";

const DEFAULT_CTA: CTAType = {
  color: "Figo Primary",
  variant: "contained",
  endIcon: "ArrowForward",
  label: "Alle Termine einsehen",
  href: "/termine",
};

export default function UpcomingEventsSection({
  title = "Nächste Termine",
  cta = DEFAULT_CTA,
  draft,
  exclude,
}: Partial<ComponentUpcomingEventsSection> & {
  draft?: boolean;
  exclude?: string;
}) {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    location: null,
    radius: 5,
  });

  const startDate = useMemo(() => new Date(), []);

  const filters = getClientSideFilters(locationFilters, startDate, exclude);

  const updatedLink = locationFilters.location
    ? cta.href +
      `?ort=${locationFilters.location.input}&radius=${locationFilters.radius}`
    : cta.href;

  return (
    <GeocodingProvider>
      <AutocompleteProvider>
        <Container
          component={Stack}
          spacing={7.5}
          sx={{ py: 10, alignItems: "center" }}
        >
          <Stack spacing={3.75} sx={{ width: "100%" }}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              {title}
            </Typography>
            <Stack sx={{ alignItems: "center" }}>
              <Container maxWidth="sm" disableGutters>
                <LocationAutocompleteClientInput
                  filters={locationFilters}
                  setFilters={setLocationFilters}
                />
              </Container>
            </Stack>
            <UpcomingEventsList filters={filters} draft={draft} />
          </Stack>
          <CTA {...cta} href={updatedLink} />
        </Container>
      </AutocompleteProvider>
    </GeocodingProvider>
  );
}
