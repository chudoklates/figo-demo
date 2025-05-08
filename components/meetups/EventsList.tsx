import React from "react";

import { getUpcomingEvents } from "@/app/actions/cms";

import { EventCard } from "@/components";
import { Button, Divider, Grid2, Stack } from "@mui/material";
import EventsFilters from "./EventsFilters";
import EventsPagination from "./components/EventsPagination";
import { TimeSlotFilter } from "@/api/types/event";
import { ArrowBackRounded } from "@mui/icons-material";
import NextLink from "next/link";
import EmptyState from "./components/EmptyState";

const PAGE_SIZE = 9;

export default async function EventsList({
  page,
  filters,
  filtersChanged,
  short,
}: {
  page: number;
  filters: TimeSlotFilter;
  filtersChanged?: boolean;
  short?: boolean;
}) {
  const pageSize = short ? 3 : PAGE_SIZE;

  const skip = (page - 1) * pageSize;

  const { items, total = 0 } = await getUpcomingEvents(filters, {
    skip,
    limit: pageSize,
  });

  const count = Math.ceil(total / pageSize);

  return (
    <Stack spacing={5}>
      <Stack spacing={3.75}>
        <EventsFilters short={short} />
        {!short && <Divider flexItem />}
        {total === 0 && (
          <EmptyState>
            <Button
              variant="text"
              color="primary"
              LinkComponent={NextLink}
              href="/termine?clear=1"
            >
              Filter zurücksetzen
            </Button>
          </EmptyState>
        )}
        {total > 0 && (
          <Grid2
            container
            columnSpacing={3.75}
            rowSpacing={3.75}
            sx={{ justifyContent: "center" }}
          >
            {items.map((timeslot) => (
              <Grid2
                key={timeslot.sys.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                component={Stack}
              >
                <EventCard
                  restaurant={timeslot.restaurant!}
                  timeslot={timeslot}
                />
                <Divider
                  flexItem
                  sx={{ display: { xs: "block", sm: "none" }, mt: 3.75 }}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Stack>
      {count > 1 && !short && (
        <Stack sx={{ alignItems: "center" }}>
          <EventsPagination count={count} page={page} />
        </Stack>
      )}
      {filtersChanged && !short && total > 0 && (
        <Stack sx={{ alignItems: "center" }}>
          <Button
            variant="text"
            startIcon={<ArrowBackRounded />}
            color="inherit"
            LinkComponent={NextLink}
            href="/termine?clear=1"
          >
            Alle anzeigen
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
