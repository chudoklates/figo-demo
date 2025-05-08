"use client";

import { Button, Portal } from "@mui/material";
import { ShareOutlined } from "@mui/icons-material";
import React from "react";
import { ResultSnackbar } from "@/components";

export default function ShareButton({ link }: { link: string }) {
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
      <Button
        variant="contained"
        fullWidth
        size="large"
        color="primary"
        endIcon={<ShareOutlined />}
        sx={{
          borderRadius: "40px",
          fontWeight: 700,
        }}
        onClick={() => {
          try {
            const sharelink = `${window.location.origin}${link}`;

            navigator?.clipboard?.writeText(sharelink);

            setSnackbarOpen(true);
          } catch (err) {}
        }}
      >
        Teilen
      </Button>
    </React.Fragment>
  );
}
