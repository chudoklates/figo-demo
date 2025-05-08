"use client";

import {
  NotEnoughTime,
  NotEnoughCredits,
  BookingSuccessful,
  CancelBooking,
  BookingCancelled,
  NoSeats,
  NotOnboarded,
} from ".";
import { ErrorPage, RegistrationForm } from "@/components";
import BookingContext from "@/lib/context/BookingContext";
import { useContext } from "react";
import ConfirmBooking from "./ConfirmBooking";

export default function BookingStateDisplay() {
  const { state, selectedVariant } = useContext(BookingContext);

  switch (state) {
    case "confirm":
      return <ConfirmBooking />;
    case "registration_required":
      return <RegistrationForm embedded activityId={selectedVariant?.id} />;
    case "insufficient_credits":
      return <NotEnoughCredits />;
    case "no_seats":
      return <NoSeats />;
    case "too_late":
      return <NotEnoughTime />;
    case "cancelling":
      return <CancelBooking />;
    case "booking_created":
    case "booking_locked":
      return <BookingSuccessful />;
    case "cancelled":
      return <BookingCancelled />;
    case "not_onboarded":
      return <NotOnboarded />;

    default:
      return (
        <ErrorPage>
          Etwas ist schief gegangen! Bitte versuchen Sie es erneut
        </ErrorPage>
      );
  }
}
