"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BookingDetails, ErrorPage } from "@/components";
import useCancelBooking from "@/lib/hooks/useCancelBooking";

const RefundAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.text.primary,
  "& .MuiAlert-icon": {
    alignItems: "center",
  },
  "& .MuiAlert-message": {
    textAlign: "left",
    fontSize: 18,
    lineHeight: "26px",
    fontWeight: 500,
    padding: 0,
  },
}));

export default function CancelBooking() {
  const { loading, booking, handleCancel, actions, activity } =
    useCancelBooking();

  if (loading)
    return (
      <Stack
        sx={{
          pt: 5,
          minWidth: { xs: "unset", md: 450 },
          minHeight: 500,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={150} />
      </Stack>
    );

  if (!booking || !activity)
    return (
      <ErrorPage>
        Das Buchung konnte nicht gefunden werden. Bitte später versuchen oder
        kontaktieren Sie uns
      </ErrorPage>
    );

  const isInLessThan24Hours =
    booking.state.status_tech_name === "booking_locked";

  return (
    <Stack
      spacing={5}
      sx={{
        pt: 5,
        alignItems: "center",
        textAlign: "center",
        minWidth: { xs: "unset", md: 450 },
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h3">
          Sind Sie sicher, dass Sie diese Buchung stornieren möchten?
        </Typography>
      </Container>
      <BookingDetails activity={activity} />
      {isInLessThan24Hours ? (
        <RefundAlert severity="error">
          Da die Aktivität in weniger als 24 Stunden beginnt, wird Ihr Guthaben
          nicht zurückerstattet.
        </RefundAlert>
      ) : (
        <Typography
          sx={{
            color: "grey.700",
          }}
        >
          Wir werden Ihnen Ihr Guthaben zurückerstatten.
        </Typography>
      )}
      {actions.map((action) => (
        <Button
          key={action.transition}
          variant="contained"
          color="error"
          size="large"
          fullWidth
          onClick={() => handleCancel(action.transition)}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
}
