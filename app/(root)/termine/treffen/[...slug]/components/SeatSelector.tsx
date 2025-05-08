"use client";

import { TextField } from "@mui/material";

type SeatSelectorProps = {
  seats: number;
  setSeats: (seats: number) => void;
  maxSeats: number;
};

export default function SeatSelector({
  seats,
  setSeats,
  maxSeats,
}: SeatSelectorProps) {
  return (
    <TextField
      type="number"
      value={seats}
      onChange={(e) => setSeats(parseInt(e.target.value))}
      slotProps={{
        input: {
          sx: {
            height: 56,
            boxSizing: "border-box",
          },
        },
        htmlInput: {
          min: 1,
          max: maxSeats,
        },
      }}
    />
  );
}
