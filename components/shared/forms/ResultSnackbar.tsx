import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";

export default function ResultSnackbar({
  snackbarOpen,
  closeSnackbar,
  severity = "success",
  message = "Ihre Änderungen wurden erfolgreich gespeichert!",
}: {
  snackbarOpen: boolean;
  closeSnackbar: () => void;
  severity: "success" | "error" | null;
  message: string;
}) {
  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={snackbarOpen}
      onClose={closeSnackbar}
      color={severity || "success"}
    >
      <Alert
        severity={severity || "success"}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
