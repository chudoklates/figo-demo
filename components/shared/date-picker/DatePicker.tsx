"use client";

import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { Box, IconButton, Stack, Typography, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import Day from "./components/Day";
import { DatePickerProps } from "./types";

const StyledIconButton = styled(IconButton)(({ theme, disabled }) => ({
  border: `1px solid ${theme.palette.grey[800]}`,

  ...(disabled && {
    opacity: 0.5,
  }),
}));

dayjs.locale("de");

export default function DatePicker({
  firstAvailableDate,
  selectedDate,
  onChange,
  isDateDisabled,
}: DatePickerProps) {
  const today = useMemo(() => dayjs(), []);

  const [currentDate, setCurrentDate] = useState(dayjs(firstAvailableDate));

  const minAvailableDate = today.startOf("week");

  const startDate = currentDate.startOf("week");

  const days = [...new Array(7)].map((_, i) => startDate.add(i, "day"));

  const handleChangeWeek = (direction: -1 | 1) => {
    const newDate = currentDate.add(direction, "week");

    if (newDate.isBefore(minAvailableDate)) {
      return;
    }

    setCurrentDate(currentDate.add(direction, "week"));
  };

  const handleDateClick = (day: Dayjs) => {
    onChange(day.toDate());
  };

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <StyledIconButton
          aria-label="Vorherige Woche"
          onClick={() => handleChangeWeek(-1)}
          disabled={currentDate.add(-1, "week").isBefore(minAvailableDate)}
        >
          <ArrowBackIosNewRounded />
        </StyledIconButton>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          {currentDate.format("MMMM YYYY")}
        </Typography>
        <StyledIconButton
          aria-label="Nächste Woche"
          onClick={() => handleChangeWeek(1)}
        >
          <ArrowForwardIosRounded />
        </StyledIconButton>
      </Stack>
      <Box>
        <Grid2 container spacing={0.25} columns={7}>
          {days.map((day) => (
            <Grid2 key={day.toString()} size={1}>
              <Day
                day={day}
                onClick={() => handleDateClick(day)}
                selected={
                  selectedDate
                    ? dayjs(selectedDate).startOf("day").isSame(day)
                    : false
                }
                disabled={isDateDisabled(day)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Stack>
  );
}
