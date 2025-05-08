"use client";

import { TransactionLight } from "@/api/types/transactions";
import { BookingCard } from "@/components";
import useTransactions from "@/lib/hooks/useTransactions";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import BookingContext from "@/lib/context/BookingContext";
import { useContext } from "react";
import { delay } from "@/utils/delay";
import { BookingsListProps } from "../types";
import { getActivityFromBooking } from "@/utils/activity";

export default function BookingsList({
  title,
  filter,
  inactive,
}: BookingsListProps) {
  const { transactions: bookings, loading } = useTransactions(filter);
  const { setOpen, setBooking, setState } = useContext(BookingContext);

  if (!inactive) {
    bookings.sort((...args) => {
      const [a, b] = args.map(getActivityFromBooking);

      if (!a || !b) return 0;

      return a.startDate.getTime() - b.startDate.getTime();
    });
  }

  const handleCancel = async (booking: TransactionLight) => {
    setBooking(booking);
    setState("cancelling");
    await delay(200);
    setOpen(true);
  };

  return (
    <Box>
      <Typography
        component="h2"
        sx={{
          fontSize: 20,
          lineHeight: "20px",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Stack
        spacing={3.5}
        sx={{
          mt: 3.5,
        }}
      >
        {loading ? <Skeleton variant="rectangular" height={298} /> : null}
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            inactive={inactive}
            handleCancel={handleCancel}
          />
        ))}
        {bookings.length === 0 && !loading ? (
          <Typography variant="subtitle1">Keine Buchungen vorhanden</Typography>
        ) : null}
      </Stack>
    </Box>
  );
}
