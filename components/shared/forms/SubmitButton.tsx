"use client";

import { useFormikContext } from "formik";
import React, { useState } from "react";
import ResultSnackbar from "./ResultSnackbar";
import LoadingButton from "./LoadingButton";

export default function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { submitForm, dirty, isValid } = useFormikContext();

  return (
    <React.Fragment>
      <ResultSnackbar
        snackbarOpen={snackbarOpen}
        closeSnackbar={() => setSnackbarOpen(false)}
        severity="success"
        message="Ihre Änderungen wurden erfolgreich gespeichert!"
      />
      <LoadingButton
        type="submit"
        loading={loading}
        disabled={!dirty || !isValid}
        variant="contained"
        color="primary"
        size="large"
        onClick={async () => {
          try {
            await submitForm();
            if (isValid) setSnackbarOpen(true);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {children}
      </LoadingButton>
    </React.Fragment>
  );
}
