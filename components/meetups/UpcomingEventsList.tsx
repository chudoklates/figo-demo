"use client";

import React from "react";
import { Divider, Grid2, Skeleton, Stack } from "@mui/material";
import EmptyState from "./components/EmptyState";
import { useQuery } from "@apollo/client";
import { GET_UPCOMING_TIMESLOTS } from "@/graphql/queries/event";
import { Collection } from "@/graphql/types/cms";
import { TimeSlot, TimeSlotFilter } from "@/graphql/types/event";
import EventClientCard from "./EventClientCard";

export default function UpcomingEventsList({
  filters,
  draft,
}: {
  filters: TimeSlotFilter;
  draft?: boolean;
}) {
  const { data, loading, error } = useQuery<
    { timeSlotCollection: Collection<TimeSlot> },
    {
      where: TimeSlotFilter;
      preview?: boolean;
      limit?: number;
    }
  >(GET_UPCOMING_TIMESLOTS, {
    variables: {
      where: filters,
      preview: !!draft,
      limit: 3,
    },
    context: {
      draft,
    },
  });

  if (error) {
    console.error(error);
  }

  if (loading) {
    return (
      <Grid2 container columnSpacing={3.75} rowSpacing={3.75}>
        {[...new Array(3)].map((_, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }} component={Stack}>
            <Skeleton
              variant="rounded"
              height={390}
              sx={{ borderRadius: "20px" }}
            />
            <Divider
              flexItem
              sx={{ display: { xs: "block", sm: "none" }, mt: 3.75 }}
            />
          </Grid2>
        ))}
      </Grid2>
    );
  }

  const { items = [], total = 0 } = data?.timeSlotCollection || {};

  return (
    <React.Fragment>
      {total === 0 && <EmptyState />}
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
              <EventClientCard
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
    </React.Fragment>
  );
}
