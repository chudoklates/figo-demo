"use client";

import useTransactions from "@/lib/hooks/useTransactions";
import { getActivityFromBooking } from "@/utils/activity";
import { Stack, Typography, Skeleton } from "@mui/material";
import { BookingCard, BookingPopup, BookingStateDisplay } from "../booking";
import BookingContext, {
  BookingStateExtended,
} from "@/lib/context/BookingContext";
import { useState } from "react";

export default function UpcomingActivity() {
  const { transactions: bookings, loading } = useTransactions([
    "booking_created",
    "booking_locked",
  ]);

  const [open, setOpen] = useState(false);

  bookings.sort((...args) => {
    const [a, b] = args.map(getActivityFromBooking);

    if (!a || !b) return 0;

    return a.startDate.getTime() - b.startDate.getTime();
  });

  const [upcomingActivity] = bookings;

  const [state, setState] = useState<BookingStateExtended>(
    upcomingActivity?.state?.status_tech_name || "initial"
  );

  return (
    <BookingContext.Provider
      value={{
        booking: upcomingActivity,
        setBooking: () => {},
        setOpen,
        state,
        setState,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          textAlign: "left",
        }}
      >
        <Typography variant="h4">Ihre nächste Aktivität</Typography>
        {loading ? <Skeleton variant="rectangular" height={298} /> : null}
        {upcomingActivity ? (
          <BookingCard
            booking={upcomingActivity}
            handleCancel={() => {
              setState("cancelling");
              setOpen(true);
            }}
          />
        ) : null}
        {!upcomingActivity && !loading ? (
          <Typography variant="subtitle1">
            Keine bevorstehenden Aktivitäten
          </Typography>
        ) : null}
      </Stack>
      <BookingPopup open={open} onClose={() => setOpen(false)}>
        <BookingStateDisplay />
      </BookingPopup>
    </BookingContext.Provider>
  );
}
