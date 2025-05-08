import { Restaurant, TimeSlot } from "@/api/types/event";
import { getLocationInfoForCoordinates } from "@/app/actions/geo";
import { ContentfulImage } from "@/components";
import {
  CalendarTodayOutlined,
  PlaceOutlined,
  SvgIconComponent,
} from "@mui/icons-material";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default async function EventInfoCard({
  restaurant,
  timeSlot,
}: {
  restaurant: Restaurant;
  timeSlot: TimeSlot;
}) {
  const startDate = new Date(timeSlot.startDate);

  const { locationInfo } = await getLocationInfoForCoordinates(
    restaurant.location,
    restaurant.placeId
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "20px",
      }}
    >
      <CardContent
        component={Stack}
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{
          p: 2.5,
          pb: "20px !important",
          justifyContent: "space-between",
        }}
      >
        {restaurant.restaurantImage?.url && (
          <CardMedia
            sx={{
              height: { xs: 150, lg: 109 },
              width: { xs: "100%", lg: 140 },
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ContentfulImage
              src={restaurant.restaurantImage.url}
              alt={restaurant.restaurantImage.title || ""}
              fill
              style={{ objectFit: "cover" }}
            />
          </CardMedia>
        )}
        <Stack spacing={0.5} sx={{ alignItems: "flex-start", flexGrow: 1 }}>
          <Typography variant="h4new">{restaurant.name}</Typography>
          <IconLabel Icon={CalendarTodayOutlined}>
            <Typography>{getDateString(startDate)}</Typography>
          </IconLabel>
          <IconLabel Icon={PlaceOutlined}>
            <Typography>
              {locationInfo.street} {locationInfo.house_number},{" "}
              {locationInfo.postal_code} ·{" "}
              <strong>
                {locationInfo.neighbourhood?.replaceAll("Bezirk", "")?.trim()}
              </strong>
            </Typography>
          </IconLabel>
        </Stack>
      </CardContent>
    </Card>
  );
}

function getDateString(date: Date) {
  return `${date
    .toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    })
    .slice(0, -1)} · ${date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  })}`;
}

function IconLabel({
  children,
  Icon,
}: PropsWithChildren & { Icon: SvgIconComponent }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Icon fontSize="small" />
      {children}
    </Stack>
  );
}
