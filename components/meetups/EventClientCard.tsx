import { Restaurant, TimeSlot } from "@/graphql/types/event";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ContentfulImage } from "../cms";
import {
  CalendarToday,
  LocationOn,
  SvgIconComponent,
} from "@mui/icons-material";
import { PropsWithChildren } from "react";
import DateDot from "./DateDot";
import { arima } from "@/theme/fonts";
import useReverseGeocode from "@/lib/geo/useReverseGeocode";
import { SkeletonWrapper } from "../Loading";

export default function EventClientCard({
  restaurant,
  timeslot,
}: {
  restaurant: Restaurant;
  timeslot?: TimeSlot;
}) {
  const { locationInfo, loading } = useReverseGeocode(
    restaurant?.location,
    restaurant?.placeId
  );

  const startDate = timeslot ? new Date(timeslot.startDate) : null;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "20px",
        position: "relative",
        overflow: "unset",
      }}
    >
      <CardActionArea
        href={`/termine/treffen/${timeslot?.slug || ""}`}
        LinkComponent={Link}
        disableRipple
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        {startDate && (
          <DateDot>
            <Typography
              component="p"
              sx={{
                fontSize: 22,
                lineHeight: "20px",
                fontWeight: 700,
                fontFamily: arima.style.fontFamily,
              }}
            >
              {startDate
                .toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "short",
                })
                .toUpperCase()
                .replaceAll(".", "")
                .substring(0, 6)}
            </Typography>
          </DateDot>
        )}
        {restaurant.restaurantImage?.url && (
          <ContentfulImage
            src={restaurant.restaurantImage.url}
            alt={restaurant.restaurantImage.title || ""}
            width={390}
            height={240}
            style={{ objectFit: "cover", height: 240, width: "auto" }}
          />
        )}
        <CardContent
          component={Stack}
          spacing={0.5}
          sx={{
            p: 2.5,
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">{restaurant.name}</Typography>
          {startDate ? (
            <IconLabel Icon={CalendarToday}>
              <Typography>{getDateString(startDate)}</Typography>
            </IconLabel>
          ) : null}
          <SkeletonWrapper loading={loading} variant="text">
            <IconLabel Icon={LocationOn}>
              <Typography>
                {locationInfo?.street} {locationInfo?.house_number},{" "}
                {locationInfo?.postal_code} ·{" "}
                <strong>
                  {locationInfo?.neighbourhood
                    ?.replaceAll("Bezirk", "")
                    ?.trim()}
                </strong>
              </Typography>
            </IconLabel>
          </SkeletonWrapper>
        </CardContent>
      </CardActionArea>
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
