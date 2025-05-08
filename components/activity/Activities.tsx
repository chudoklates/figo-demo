import { Activity } from "@/graphql/types/activities";
import { Box, Divider, Grid2, Stack } from "@mui/material";
import React from "react";
import ActivityCard from "./ActivityCard";

export default function Activities({
  location,
  activities,
  highlightMarker,
  unhighlightMarker,
  direction = "column",
}: {
  location?: { lat: number; lng: number };
  activities: Activity[];
  highlightMarker: (activity: Activity) => void;
  unhighlightMarker: (activity: Activity) => void;
  direction?: "column" | "row";
}) {
  return direction === "row" ? (
    <Stack
      spacing={2.5}
      sx={{
        textAlign: "center",
        justifyContent: "center",
        pt: 2.5,
      }}
    >
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          direction={direction}
          location={location}
          onMouseEnter={() => highlightMarker(activity)}
          onMouseLeave={() => unhighlightMarker(activity)}
        />
      ))}
    </Stack>
  ) : (
    <Box>
      <Grid2 container spacing={2}>
        {activities.map((activity) => (
          <Grid2
            key={activity.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <ActivityCard
              activity={activity}
              direction={direction}
              location={location}
              onMouseEnter={() => highlightMarker(activity)}
              onMouseLeave={() => unhighlightMarker(activity)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
