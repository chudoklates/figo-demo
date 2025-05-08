"use client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { EventAvailable, LocationOn } from "@mui/icons-material";
import { Activity } from "@/graphql/types/activities";
import { getDistanceInKm } from "@/lib/geo/utils";
import Image from "next/image";
import { Box, CardActionArea } from "@mui/material";
import Link from "next/link";
import { getUrlEncodedID } from "@/utils/activity";
import React from "react";
import ActivityRecurringDisplay from "./components/ActivityRecurringDisplay";

type ActivityCardProps = CardProps & {
  activity: Activity;
  direction?: "row" | "column";
  location?: { lat: number; lng: number };
};

export default function ActivityCard({
  activity,
  direction = "column",
  location,
  ...cardOverrides
}: ActivityCardProps) {
  const isRow = direction === "row";

  const distance =
    location && activity.location
      ? getDistanceInKm(location, activity.location)
      : null;

  const neighbourhoodClean = activity.location?.neighbourhood
    ?.replace(/Bezirk/gi, "")
    ?.replace(/Kiez/gi, "");

  return (
    <Card
      sx={{
        borderRadius: "10px",
        textAlign: "left",
        ...(!isRow && { height: "100%" }),
      }}
      variant="outlined"
      {...cardOverrides}
    >
      <CardActionArea
        id={activity.id}
        disableRipple
        LinkComponent={Link}
        href={`/aktivitaet/${getUrlEncodedID(activity.id)}`}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: direction,
          justifyContent: "flex-start",
          alignItems: isRow ? "center" : "unset",
        }}
      >
        {activity.mainImage?.url ? (
          <CardMedia
            sx={{
              flexShrink: 0,
              height: !isRow ? 210 : 220,
              overflow: "hidden",
              ...(isRow && { width: { lg: 220, xl: 300 } }),
              transition: "width 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={activity.mainImage?.url}
                alt={activity?.meta?.image_alt || activity.name}
                fill
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </Box>
          </CardMedia>
        ) : null}
        <CardContent
          sx={(theme) => ({
            overflow: "hidden",
            height: isRow ? 220 : "100%",
            p: theme.spacing(3, 2),
            width: "100%",
          })}
          component={Stack}
          spacing={1}
          justifyContent="space-between"
        >
          <Box>
            <Typography
              component="h3"
              gutterBottom
              sx={{ fontSize: 24, lineHeight: "34px", fontWeight: 600 }}
            >
              {activity.name}
            </Typography>
            {activity.recurring.length > 0 ? (
              <ActivityRecurringDisplay activity={activity} />
            ) : null}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                color: "grey.800",
              }}
            >
              <LocationOn />
              <Typography noWrap>
                {neighbourhoodClean}
                <Typography variant="subtitle2" component="span">
                  {" "}
                  {distance ? `(${distance.toFixed(1)} km)` : ""}
                </Typography>
              </Typography>
            </Stack>
          </Box>
          <Button variant="outlined" color="primary" fullWidth>
            Details anzeigen
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
