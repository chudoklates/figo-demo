"use client";

import { Link, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import googleLogo from "@/public/google.svg";

export default function GoogleReviewBox({
  place,
}: {
  place: google.maps.places.Place;
}) {
  return (
    <Stack
      spacing={1.25}
      direction={{ xs: "column", ss: "row", lg: "column" }}
      sx={{
        alignItems: "center",
        py: { xs: 0, lg: 2.5 },
        px: { xs: 2, lg: 2.5 },
        width: { xs: "unset", ss: "100%", lg: "unset" },
        justifyContent: { xs: "space-between", lg: "flex-start" },
      }}
    >
      <Stack
        spacing={1.25}
        sx={{
          alignItems: "inherit",
          flexBasis: { xs: "unset", ss: 200.75, lg: "unset" },
          flexShrink: 2,
          minWidth: 0,
        }}
      >
        <Image src={googleLogo} alt="Google logo" />
        <Typography
          component="legend"
          sx={{
            fontSize: 16,
            color: "grey.800",
            width: "100%",
            wordWrap: "break-word",
          }}
        >
          Durchschnittsbewertung
        </Typography>
      </Stack>
      <Stack
        spacing={1.25}
        sx={{
          alignItems: "inherit",
          flexBasis: { xs: "unset", ss: 150, lg: "unset" },
          flexShrink: 0,
        }}
      >
        <Rating readOnly value={place.rating} precision={0.5} />
        <Typography
          color="primary"
          sx={{
            fontWeight: 800,
            fontSize: 36,
          }}
        >
          {place.rating!.toFixed(1)}
        </Typography>
        <Link
          href={place.googleMapsURI!}
          underline="always"
          color="grey.800"
          sx={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {place.userRatingCount} Bewertungen
        </Link>
      </Stack>
    </Stack>
  );
}
