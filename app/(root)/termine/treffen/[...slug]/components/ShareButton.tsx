"use client";

import { IconButton, Portal } from "@mui/material";
import { ShareOutlined } from "@mui/icons-material";
import React from "react";
import { ResultSnackbar } from "@/components";

export default function ShareButton({ disabled }: { disabled?: boolean }) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Portal>
        <ResultSnackbar
          message="Link in die Zwischenablage kopiert"
          severity="success"
          snackbarOpen={snackbarOpen}
          closeSnackbar={() => setSnackbarOpen(false)}
        />
      </Portal>
      <IconButton
        sx={{
          color: "primary.main",
          border: "1px solid",
          borderColor: "primary.main",
          width: 56,
          height: 56,

          "&.Mui-disabled": {
            color: "text.secondary",
            borderColor: "grey.500",
          },
        }}
        disabled={disabled}
        onClick={() => {
          try {
            navigator?.clipboard?.writeText(window?.location?.href);

            setSnackbarOpen(true);
          } catch (err) {}
        }}
      >
        <ShareOutlined color="inherit" />
      </IconButton>
    </React.Fragment>
  );
}
