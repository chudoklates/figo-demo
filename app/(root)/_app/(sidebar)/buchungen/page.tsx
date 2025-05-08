"use client";

import { TransactionLight } from "@/api/types/transactions";
import { BookingPopup, PageContainer, BookingStateDisplay } from "@/components";
import { PageHeading } from "@/components/shared/general";
import { Stack } from "@mui/material";
import BookingContext, {
  BookingStateExtended,
} from "@/lib/context/BookingContext";
import { useState } from "react";
import { delay } from "@/utils/delay";
import FilterChip from "./components/FilterChip";
import BookingsList from "./components/BookingsList";

const INITIAL_FILTER = [
  "active" as const,
  "cancelled" as const,
  "past" as const,
];

type FilterType = typeof INITIAL_FILTER;

export default function Bookings() {
  const [state, setState] = useState<BookingStateExtended>("initial");
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<TransactionLight | null>(null);
  const [filter, setFilter] = useState<FilterType>(INITIAL_FILTER);

  return (
    <PageContainer
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
      containerOverrides={{ maxWidth: "md" }}
    >
      <PageHeading title="Buchungen" />
      <Stack spacing={4.5}>
        <Stack
          direction="row"
          sx={{
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FilterChip
            label="Alle sehen"
            filter={["booking_created", "booking_locked", "cancelled", "past"]}
            onClick={() => setFilter([...INITIAL_FILTER])}
          />
          <FilterChip
            label="Vergangene Aktivitäten"
            filter={["past"]}
            onClick={() => setFilter(["past"])}
          />
          <FilterChip
            label="Stornierte Aktivitäten"
            filter={["cancelled"]}
            onClick={() => setFilter(["cancelled"])}
          />
        </Stack>
        <BookingContext.Provider
          value={{
            state,
            setState,
            setOpen,
            booking,
            setBooking,
          }}
        >
          {filter.includes("active") && (
            <BookingsList
              title="Kommende Aktivitäten"
              filter={["booking_created", "booking_locked"]}
            />
          )}
          {filter.includes("past") && (
            <BookingsList
              title="Vergangene Aktivitäten"
              filter={["past"]}
              inactive
            />
          )}
          {filter.includes("cancelled") && (
            <BookingsList
              title="Stornierte Aktivitäten"
              filter={["cancelled"]}
              inactive
            />
          )}
          <BookingPopup
            open={open}
            onClose={async () => {
              setOpen(false);
              await delay(200);
              setState("initial");
              setBooking(null);
            }}
          >
            <BookingStateDisplay />
          </BookingPopup>
        </BookingContext.Provider>
      </Stack>
    </PageContainer>
  );
}
