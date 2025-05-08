"use client";

import React, {
  ChangeEvent,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Phone, Check } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { object, string } from "yup";
import { Formik, useFormikContext } from "formik";

import type { Activity, VariantBookingOption } from "@/api/types/activities";
import type { BookingFormProps } from "../types";
import type { SubmitFunction } from "@/types/formik";

import {
  LoadingButton,
  BookingStateDisplay,
  BookingPopup,
  DatePicker,
} from "@/components";
import { Loading, SkeletonWrapper } from "@/components/Loading";
import BookingContext, {
  BookingStateExtended,
} from "@/lib/context/BookingContext";
import { UserContext } from "@/lib/context/UserContext";
import { findExistingBooking } from "@/utils/activity";
import { delay } from "@/utils/delay";
import useTransactions from "@/lib/hooks/useTransactions";
import SlotSelector from "./SlotSelector";

const VALIDATION_SCHEMA = object({
  variant: string().required("Bitte ein Datum wählen"),
});

const getLabel = (startDate: Date, activity: Activity) => {
  const endDate = activity.duration
    ? new Date(startDate.getTime() + activity.duration * 60 * 1000)
    : null;

  return `${startDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })}${
    endDate
      ? ` - ${endDate.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : ""
  } Uhr`;
};

const Seats = ({ seats }: { seats: number }) => {
  return (
    <Chip
      variant="seats"
      label={`${seats} Pl${seats === 1 ? "a" : "ä"}tz${
        seats === 1 ? "" : "e"
      } übrig`}
      color={seats > 1 ? (seats > 3 ? "info" : "warning") : "error"}
    />
  );
};

function SelectVariantForm({
  activity,
  selectedVariant,
  setSelectedVariant,
}: {
  activity: Activity;
  selectedVariant: VariantBookingOption | null;
  setSelectedVariant: (variant: VariantBookingOption | null) => void;
}) {
  const { submitForm, isSubmitting, values, setFieldValue, touched, errors } =
    useFormikContext<{
      variant: string;
    }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selectedVariant?.startDate || null
  );
  const { booking } = useContext(BookingContext);

  const { user } = useContext(UserContext);

  const { startDate, upcomingVariants, seats } = activity;

  const variantOptions = [...upcomingVariants];

  const startDateIsUpcoming = startDate > new Date();

  if (startDateIsUpcoming) {
    variantOptions.unshift({
      id: activity.id,
      seats,
      startDate,
      fields: activity.raw.fields,
      variant_group: activity.raw.variant_group,
    });
  }

  variantOptions.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const firstAvailableDate = variantOptions[0]?.startDate;

  const options = selectedDate
    ? variantOptions
        .filter((variant) => {
          return (
            variant.startDate.toDateString() === selectedDate.toDateString()
          );
        })
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .map((variant) => ({
          label: getLabel(variant.startDate, activity),
          value: variant.id,
          disabled: variant.seats === 0,
        }))
    : [];

  const cancelStates = ["booking_created", "booking_locked", "cancelling"];
  const canCancel = cancelStates.includes(
    booking?.state?.status_tech_name || ""
  );

  const getButtonLabel = () => {
    if (canCancel) return "Stornieren";

    if (!user) return "Registrieren und Buchen";

    return "Buchen";
  };

  const isDateDisabled = (date: Dayjs) => {
    return !variantOptions.some(
      (variant) =>
        variant.startDate.toDateString() === date.toDate().toDateString()
    );
  };

  const handleChange = (_event: ChangeEvent<unknown>, value: string) => {
    const variant = variantOptions.find((v) => v.id === value);

    if (variant) {
      setSelectedVariant(variant);
      setFieldValue("variant", value);

      document
        ?.getElementById("booking-button")
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const handleDateChange = (date: Date) => {
    if (selectedDate?.toDateString() === date.toDateString()) return;

    setSelectedDate(date);
    setSelectedVariant(null);
    setFieldValue("variant", "");
  };

  return (
    <Stack
      spacing={3}
      component={Paper}
      elevation={1}
      id="booking-form"
      sx={{
        py: 3,
        px: { xs: 2, md: 3 },
        minWidth: { xs: "100%", md: 390 },
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Details</Typography>
        {selectedVariant && <Seats seats={selectedVariant.seats} />}
      </Stack>
      <Typography variant="h5" component="label" htmlFor="variant">
        Datum auswählen
      </Typography>
      <DatePicker
        firstAvailableDate={firstAvailableDate}
        selectedDate={selectedDate}
        onChange={handleDateChange}
        isDateDisabled={isDateDisabled}
      />
      {selectedDate && (
        <SlotSelector
          options={options}
          handleChange={handleChange}
          selectedVariant={selectedVariant}
        />
      )}
      <FormHelperText
        error={!!errors.variant}
        sx={{ marginTop: "8px !important" }}
      >
        {(touched.variant && errors.variant) ||
          (canCancel && "Sie haben dieses Termin bereits gebucht") ||
          " "}
      </FormHelperText>
      <Stack spacing={2}>
        <LoadingButton
          id="booking-button"
          loading={isSubmitting}
          variant="contained"
          fullWidth
          color={canCancel ? "error" : "primary"}
          onClick={() => {
            submitForm();

            if (!values.variant) {
              document
                .getElementById("booking-form")
                ?.scrollIntoView({ block: "center" });
            }
          }}
          startIcon={<Check />}
        >
          {getButtonLabel()}
        </LoadingButton>
        <Button
          variant="outlined"
          fullWidth
          href="#"
          startIcon={<Phone />}
          endIcon={
            <Box
              sx={{
                width: 20,
              }}
            />
          }
          sx={{
            height: 52,
          }}
        >
          Anrufen
        </Button>
      </Stack>
    </Stack>
  );
}

function BookingForm({ activity, transactions }: BookingFormProps) {
  const initialVariant: VariantBookingOption = useMemo(() => {
    return {
      id: activity.id,
      variant_group: activity.raw.variant_group,
      fields: activity.raw.fields,
      startDate: activity.startDate,
      seats: activity.seats,
    };
  }, [activity]);

  const [selectedVariant, setSelectedVariant] =
    useState<VariantBookingOption | null>(initialVariant);

  const existingBooking = findExistingBooking(
    transactions || [],
    selectedVariant || activity
  );

  useEffect(() => {
    setBooking(existingBooking);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  const [state, setState] = useState<BookingStateExtended>(
    existingBooking?.state.status_tech_name || ("initial" as const)
  );
  const [booking, setBooking] = useState(existingBooking);
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const pathname = usePathname();

  const { user } = useContext(UserContext);

  const autobook = searchParams.get("auto");

  useEffect(() => {
    if (!autobook || !selectedVariant || !user) return;

    let timeout: NodeJS.Timeout | undefined;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setState("confirm");
      setOpen(true);

      replace(pathname);
    }, 150);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autobook, user, selectedVariant]);

  const handleSubmit: SubmitFunction<{ variant: string }> = async () => {
    if (!user) {
      setState("registration_required");
      setOpen(true);
      return;
    }

    if (existingBooking) {
      setState("cancelling");
      setOpen(true);
      return;
    }

    setState("confirm");
    setOpen(true);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        selectedVariant,
        booking,
        setBooking,
        setState,
        setOpen,
      }}
    >
      <Formik
        initialValues={{
          variant:
            existingBooking?.match?.id_supply || selectedVariant?.id || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_SCHEMA}
      >
        <SelectVariantForm
          activity={activity}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      </Formik>
      <BookingPopup
        open={open}
        onClose={async () => {
          setOpen(false);
          // Prevent flicker
          await delay(200);
          setBooking(existingBooking);
          setState(existingBooking?.state?.status_tech_name || "initial");
        }}
      >
        <BookingStateDisplay />
      </BookingPopup>
    </BookingContext.Provider>
  );
}

export default function BookingFormWrapper({
  activity,
}: {
  activity: Activity;
}) {
  const { transactions, loading } = useTransactions([
    "booking_created",
    "booking_locked",
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <SkeletonWrapper loading={loading}>
        <BookingForm activity={activity} transactions={transactions} />
      </SkeletonWrapper>
    </Suspense>
  );
}
