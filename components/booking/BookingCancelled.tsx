"use client";

import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { BookingDetails } from "@/components";
import { useContext } from "react";
import BookingContext from "@/lib/context/BookingContext";
import { getActivityFromBooking } from "@/utils/activity";

export default function BookingCancelled() {
  const { booking } = useContext(BookingContext);

  const activity = getActivityFromBooking(booking);

  return (
    <Stack
      spacing={5}
      sx={{
        alignItems: "center",
        textAlign: "center",
        minWidth: { xs: "unset", md: 450 },
      }}
    >
      <Image src="/cross-big.svg" alt="cross" width={140} height={140} />
      <Typography variant="h3">Buchung storniert</Typography>
      {activity && <BookingDetails activity={activity} />}
    </Stack>
  );
}
