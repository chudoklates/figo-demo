"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
import { BookingDetails, ErrorPage, LoadingButton } from "@/components";
import useCreateBooking from "@/lib/hooks/useCreateBooking";
import { useContext, useState } from "react";
import BookingContext from "@/lib/context/BookingContext";
import { getActivity } from "@/utils/activity";
// import { EventAvailable } from "@mui/icons-material";

export default function ConfirmBooking() {
  const { booking, selectedVariant, setState, setOpen, setBooking } =
    useContext(BookingContext);
  const [loading, setLoading] = useState(false);

  const createBooking = useCreateBooking({
    booking,
    setState,
    setBooking,
    setLoading,
  });

  if (booking || !selectedVariant)
    return (
      <ErrorPage>
        Die Buchung ist bereits erstellt oder die Aktivität konnte nicht
        gefunden werden.
      </ErrorPage>
    );

  return (
    <Container
      maxWidth="xs"
      component={Stack}
      spacing={5}
      pt={5}
      alignItems="center"
      textAlign="center"
      minWidth={{ xs: "unset", md: 450 }}
    >
      <Typography variant="h3">
        Möchten Sie diese Buchung bestätigen?
      </Typography>
      <BookingDetails activity={getActivity(selectedVariant)} />
      <Stack
        spacing={2}
        sx={{
          pt: 2,
        }}
      >
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          onClick={() => {
            createBooking(selectedVariant.id);
          }}
        >
          Buchung bestätigen
        </LoadingButton>
        <Button variant="text" size="large" onClick={() => setOpen(false)}>
          Andere Optionen ansehen
        </Button>
      </Stack>
    </Container>
  );
}
