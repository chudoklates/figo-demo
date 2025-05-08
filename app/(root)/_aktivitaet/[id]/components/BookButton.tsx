"use client";

import { Button } from "@mui/material";

export default function BookButton() {
  return (
    <Button
      sx={{ display: { xs: "flex", md: "none" } }}
      variant="contained"
      color="primary"
      fullWidth
      onClick={() =>
        document
          .getElementById("booking-form")
          ?.scrollIntoView({ block: "center", behavior: "smooth" })
      }
      size="large"
    >
      Buchen
    </Button>
  );
}
