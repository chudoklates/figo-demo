"use client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { LocationOn } from "@mui/icons-material";
import { Box, CardActionArea } from "@mui/material";
import { ActivityRaw } from "@/api/types/activities";
import {
  getActivity,
  getActivityLocationString,
  getUrlEncodedID,
} from "@/utils/activity";
import Link from "next/link";
import { BookingCardProps } from "./types";

export default function BookingCard({
  booking,
  inactive,
  handleCancel,
}: BookingCardProps) {
  const { match } = booking;

  const activityRaw: ActivityRaw = {
    id: match.id_supply,
    fields: match.supply_fields,
    created_at: new Date().toISOString(),
    variants: [],
  };

  const activity = getActivity(activityRaw);

  return (
    <Card
      sx={{
        borderRadius: 0,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        ...(inactive && {
          opacity: 0.5,
        }),
      }}
      variant="outlined"
    >
      <CardMedia
        component="img"
        image={activity?.mainImage?.url || ""}
        alt={activity.name}
        height={271}
        sx={{
          width: { xs: "100%", sm: "40%" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          maxWidth: { xs: "100%", sm: "60%" },
        }}
      >
        <CardActionArea
          disableRipple
          disabled={inactive}
          sx={{
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
          }}
          {...(!inactive && {
            LinkComponent: Link,
            href: `/aktivitaet/${getUrlEncodedID(activity.id)}`,
          })}
        >
          <CardContent sx={{ overflow: "hidden" }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {activity.name}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                pb: 2.5,
              }}
            >
              <LocationOn />
              <Typography>{getActivityLocationString(activity)}</Typography>
            </Stack>
            <Typography
              sx={{
                fontWeight: 700,
                pb: 2.5,
              }}
            >
              {activity.startDate.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              {" • "}
              {activity.startDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
        {!inactive ? (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="text"
              size="large"
              color="error"
              onClick={() => handleCancel?.(booking)}
            >
              Buchung stornieren
            </Button>
          </CardActions>
        ) : (
          <div />
        )}
      </Box>
    </Card>
  );
}
