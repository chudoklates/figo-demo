import React from "react";
import { Event } from "@/graphql/types/event";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Link, Stack, Typography } from "@mui/material";

export default function LocationLink({ event }: { event: Event }) {
  const { location, placeId } = event;

  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
      }}
      {...(placeId && {
        component: Link,
        href: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`,
      })}
    >
      <Box>
        <Typography sx={{ fontWeight: 700, lineHeight: "20px" }} gutterBottom>
          {event.restaurant?.name}
        </Typography>
        {location ? (
          <Typography>
            {location.street} {location.house_number}, {location.postal_code} ·{" "}
            <strong>{location.neighbourhood?.replaceAll("Bezirk", "")}</strong>
          </Typography>
        ) : null}
      </Box>
      {placeId && <ArrowForwardIos color="disabled" />}
    </Stack>
  );
}
