"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { BookingDetails } from "@/components";
import Link from "next/link";
import { useContext } from "react";
import BookingContext from "@/lib/context/BookingContext";
import { getActivityFromBooking } from "@/utils/activity";
import checkBigBlue from "@/public/check-big-blue.svg";

export default function BookingSuccessful() {
  const { booking } = useContext(BookingContext);

  const activity = getActivityFromBooking(booking);

  return (
    <Container
      maxWidth="xs"
      component={Stack}
      spacing={5}
      alignItems="center"
      textAlign="center"
      minWidth={{ xs: "unset", md: 450 }}
    >
      <Stack
        spacing={2.5}
        sx={{
          alignItems: "center",
        }}
      >
        <Image src={checkBigBlue} alt="check" />
        <Typography variant="h3">Buchung bestätigt</Typography>
      </Stack>
      {activity && <BookingDetails activity={activity} />}
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        href={`/app/buchungen`}
        LinkComponent={Link}
      >
        Buchungen einsehen
      </Button>
    </Container>
  );
}
