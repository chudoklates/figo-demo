"use client";

import React, { Suspense } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import usePlace from "../hooks/usePlace";
import { Provider } from "@/api/types/activities";
import { Star } from "@mui/icons-material";

const PlaceProvider = dynamic(() => import("@/components/geo/PlaceProvider"), {
  ssr: false,
  loading: LoadingState,
});

function GoogleRatingSmall({ provider }: { provider: Provider }) {
  const { place, loading } = usePlace(provider.placeId);

  if (loading) return <LoadingState />;

  if (!place) return null;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        alignItems: "center",
      }}
    >
      <Star color="inherit" sx={{ color: "#F4B71D" }} />
      <Typography>
        <strong>{place.rating?.toFixed(1)}</strong> ({place.userRatingCount}{" "}
        Bewertungen)
      </Typography>
    </Stack>
  );
}

export default function GoogleRatingWrapper({
  ...props
}: {
  provider: Provider;
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      <PlaceProvider>
        <GoogleRatingSmall {...props} />
      </PlaceProvider>
    </Suspense>
  );
}

function LoadingState() {
  return (
    <Skeleton>
      <Typography>4.8 (202 Bewertungen)</Typography>
    </Skeleton>
  );
}
