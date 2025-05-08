"use client";

import { MappedActivity } from "@/api/types/activities";
import { Activities, Loading, TopActivities } from "@/components";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ActivityListProps, SortFunction } from "../types";
import { getTimeFilters } from "@/utils/filters";
import useActivityMarkers from "@/lib/hooks/useActivityMarkers";
import ActivityListHeader from "./ActivityListHeader";
import useEnforceGuestToken from "@/lib/hooks/useEnforceGuestToken";
import useActivityList from "@/lib/hooks/useActivityList";

const INITIAL_SORT: SortFunction<MappedActivity> = (a, b) => a.score - b.score;

export default function ActivityList({
  fullWidth,
  mapRef,
  filters,
  toggleMap,
  user,
}: ActivityListProps) {
  const direction = fullWidth ? "column" : "row";

  const authToken = useEnforceGuestToken();

  const { location } = user || {};

  const [sortMethod, setSortMethod] = useState<SortFunction<MappedActivity>>(
    () => INITIAL_SORT
  );

  const { activities, loading } = useActivityList({
    filters,
    skip: !authToken,
  });

  const sortedActivities = activities
    .filter(getTimeFilters(filters))
    .sort(sortMethod);

  const [highlightMarker, unhighlightMarker] = useActivityMarkers({
    activities: sortedActivities,
    mapRef,
  });

  if (loading || !authToken) return <Loading />;

  return (
    <Box>
      <ActivityListHeader
        hideMap={fullWidth}
        toggleMap={toggleMap}
        nActivities={sortedActivities.length}
        setSortMethod={setSortMethod}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            pt: 2.5,
            pb: 16,
          }}
        >
          {!fullWidth ? <Divider flexItem /> : null}
          {sortedActivities.length === 0 ? (
            <Stack
              spacing={2.5}
              sx={{
                pt: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                Es gab nichts, was Ihrer Suche entsprach, aber diese Optionen
                könnten Ihnen gefallen.
              </Typography>
              <Divider flexItem />
              <TopActivities
                heading="Das könnte Ihnen auch gefallen..."
                showTip={false}
                direction={direction}
                showAllButton={false}
                {...(filters.location ? { location: filters.location } : {})}
              />
            </Stack>
          ) : (
            <Activities
              location={filters.location || location}
              activities={sortedActivities}
              highlightMarker={highlightMarker}
              unhighlightMarker={unhighlightMarker}
              direction={direction}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
