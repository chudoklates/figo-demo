"use client";

import { Event } from "@/api/types/event";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import BookingButton from "./BookingButton";
import ShareButton from "./ShareButton";
import PaypalPaymentButton from "./PaypalPaymentButton";
import { useState } from "react";
import SeatSelector from "./SeatSelector";

const DEFAULT_PRICE = 7.5;

export default function BookToolbar({ event }: { event: Event }) {
  const [seats, setSeats] = useState(1);

  // Hard-set to true since website is inactive
  const bookingUnavailable = true;
  const maxSeats = Math.min(event.seats, 3); // max 3 bookings per person

  const bookingPrice = DEFAULT_PRICE;

  const startDate = new Date(event.startDate);

  const showSeats = event.seats < 3;

  return (
    <Container>
      <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }}>
        <Box sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
          <Typography>
            {getDateString(startDate)}
            <br />
            <strong>{event.name}</strong>
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexGrow: { xs: 1, lg: 0 },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ justifyContent: "center" }}>
            <Typography
              sx={{
                ...(showSeats
                  ? { fontSize: 24, lineHeight: "34px" }
                  : { fontSize: 28, lineHeight: "40px" }),
                fontWeight: 600,
              }}
            >
              € {bookingPrice.toFixed(2)}
            </Typography>
            {showSeats && (
              <Typography variant="body2">
                {bookingUnavailable
                  ? `Keine Plätze frei`
                  : `Noch ${event.seats} Plätz${event.seats === 1 ? "" : "e"}`}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: "inherit" }}>
            {!bookingUnavailable && (
              <SeatSelector
                seats={seats}
                setSeats={setSeats}
                maxSeats={maxSeats}
              />
            )}
            <ShareButton disabled={bookingUnavailable} />
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            flexGrow: { xs: 1, md: 0 },
            mt: { xs: 2, md: 0 },
            ml: { xs: 0, md: 2 },
            alignItems: "center",
          }}
        >
          <BookingButton
            eventId={event.timeSlotId}
            disabled={bookingUnavailable}
            seats={seats}
          />
          <Skeleton
            width="100%"
            height={56}
            variant="rounded"
            sx={{ borderRadius: "40px", minWidth: 167 }}
          />
          {/* <PaypalPaymentButton
            eventId={event.timeSlotId}
            disabled={bookingUnavailable}
            seats={seats}
          /> */}
        </Stack>
      </Stack>
    </Container>
  );
}

function getDateString(date: Date) {
  return `${date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })} · ${date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  })}`;
}
