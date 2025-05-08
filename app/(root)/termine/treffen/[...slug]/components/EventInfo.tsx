import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  Accessible,
  CalendarTodayOutlined,
  NotAccessible,
  PlaceOutlined,
} from "@mui/icons-material";
import { Event } from "@/api/types/event";
import LocationLink from "./LocationLink";

export default function EventInfo({ event }: { event: Event }) {
  const eventDate = new Date(event.startDate);

  return (
    <Stack spacing={2.5}>
      <Typography variant="h2" component="h1">
        {event.name}
      </Typography>
      <Divider flexItem />
      <Stack direction="row" spacing={1.25}>
        <CalendarTodayOutlined />
        <Box>
          <Typography sx={{ fontWeight: 700, lineHeight: "20px" }} gutterBottom>
            {eventDate.toLocaleDateString("de-DE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography>
            {eventDate.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Berlin",
            })}
          </Typography>
        </Box>
      </Stack>
      <Divider flexItem />
      <Stack direction="row" spacing={1.25}>
        <PlaceOutlined />
        <LocationLink event={event} />
      </Stack>
      <Divider flexItem />
      {event.wheelchairAccessible !== null && (
        <React.Fragment>
          <Stack direction="row" spacing={1.25}>
            {event.wheelchairAccessible ? <Accessible /> : <NotAccessible />}
            <Typography sx={{ lineHeight: "24px" }}>
              {event.wheelchairAccessible ? "" : "Nicht "}Barrierefrei
            </Typography>
          </Stack>
          <Divider flexItem />
        </React.Fragment>
      )}
    </Stack>
  );
}
