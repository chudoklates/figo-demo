import { Activity } from "@/api/types/activities";
import { EventAvailable } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";

export default function ActivityRecurringDisplay({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <Stack
      direction="row"
      sx={{
        rowGap: 1,
        columnGap: 1,
        alignItems: "center",
        pb: 0.5,
      }}
    >
      <EventAvailable color="primary" />
      {activity.recurring.map((recurring, i) => (
        <React.Fragment key={recurring.value}>
          <Typography
            color="primary"
            sx={{
              fontWeight: 700,
            }}
          >
            {activity.recurring.length === 1
              ? `Jeden ${recurring.label}`
              : recurring.label.slice(0, 2)}
          </Typography>
          {i < activity.recurring.length - 1 ? (
            <Typography
              color="primary"
              sx={{
                fontWeight: 700,
              }}
            >
              •
            </Typography>
          ) : null}
        </React.Fragment>
      ))}
    </Stack>
  );
}
