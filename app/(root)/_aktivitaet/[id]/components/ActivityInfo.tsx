import { LocationOn, Schedule, SellOutlined } from "@mui/icons-material";
import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ActivityInfoProps } from "../types";
import BookButton from "./BookButton";
import { getActivityLocationString } from "@/utils/activity";
import MapLink from "./MapLink";
import GoogleRatingSmall from "./GoogleRatingSmall";
import ReviewsLink from "./ReviewsLink";

export default function ActivityInfo({
  provider,
  activity,
}: ActivityInfoProps) {
  const { first_name, last_name, name, profile_image, imprints, tAndCs } =
    provider;

  const providerName = first_name ? `${first_name} ${last_name}` : name;
  const providerImage = profile_image?.url;

  return (
    <Stack
      spacing={5}
      sx={{
        flexBasis: { xs: "unset", md: 390, lg: 680 },
        flexGrow: { xs: 0, md: 1, lg: 0 },
        minWidth: 0,
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: { xs: 90, md: 150 },
            height: { xs: 90, md: 150 },
            position: "relative",
          }}
        >
          {providerImage ? (
            <Image src={providerImage} alt={providerName} fill />
          ) : (
            providerName
          )}
        </Avatar>
        <Stack
          spacing={{ xs: 0, md: 1 }}
          sx={{
            justifyContent: "center",
          }}
        >
          <ReviewsLink>
            <GoogleRatingSmall provider={provider} />
          </ReviewsLink>
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <Typography>
            {first_name} {last_name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <SellOutlined />
            <Typography>
              {activity.categoryOptions
                ?.filter((option) =>
                  activity.activityCategory!.some(
                    (value) => option.value === value
                  )
                )
                .map((option) => option.label)
                .join(", ")}
            </Typography>
            <Schedule />
            <Typography>{activity.duration?.toFixed(0)}min</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "flex-start",
              display: { xs: "none", md: "flex" },
            }}
          >
            <LocationOn />
            <Box>
              <Typography
                sx={{
                  lineHeight: "24px",
                }}
              >
                {getActivityLocationString(activity)}
              </Typography>
              <MapLink />
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "flex-start",
          display: { xs: "flex", md: "none" },
        }}
      >
        <LocationOn />
        <Box>
          <Typography
            sx={{
              lineHeight: "24px",
            }}
          >
            {getActivityLocationString(activity)}
          </Typography>
          <MapLink />
        </Box>
      </Stack>
      <BookButton />
      <Typography variant="h3">Über diese Aktivität</Typography>
      <Typography variant="bodyLarge" sx={{ wordWrap: "break-word" }}>
        {activity.description || <i>Keine Beschreibung</i>}
      </Typography>
      {imprints || tAndCs ? (
        <Typography
          sx={{
            color: "grey.700",
          }}
        >
          {imprints ? (
            <Link
              href={imprints.url}
              color="inherit"
              underline="always"
              target="_blank"
            >
              Impressum
            </Link>
          ) : null}
          {imprints && tAndCs ? " • " : null}
          {tAndCs ? (
            <Link
              href={tAndCs.url}
              color="inherit"
              underline="always"
              target="_blank"
            >
              AGB
            </Link>
          ) : null}
        </Typography>
      ) : null}
    </Stack>
  );
}
