"use client";

import { sendContactMessage } from "@/app/actions/brevo";
import { FormField, LoadingButton, ResultSnackbar } from "@/components";
import { SubmitFunction } from "@/types/formik";
import { Container, Grid2 } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { object, string } from "yup";

const VALIDATION_SCHEMA = object({
  email: string()
    .email("Muss eine gültige E-mail sein.")
    .required("Bitte geben Sie Ihre E-mail."),
  firstName: string().required("Bitte geben Sie Ihre Vorname."),
  lastName: string().required("Bitte geben Sie Ihre Nachname."),
  message: string().required("Bitte schreiben Sie Ihre Nachricht."),
});

const INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  message: "",
};

export default function ContactForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values,
    { resetForm }
  ) => {
    const response = await sendContactMessage(values);

    if (!response) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut."
      );
      setSnackbarOpen(true);
      return;
    }

    setSnackbarSeverity("success");
    setSnackbarMessage("Ihre Nachricht wurde erfolgreich gesendet!");
    setSnackbarOpen(true);
    resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <ResultSnackbar
            snackbarOpen={snackbarOpen}
            closeSnackbar={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            message={snackbarMessage}
          />
          <Container maxWidth="sm">
            <Grid2 container columnSpacing={2} rowSpacing={1}>
              <Grid2
                size={{
                  xs: 12,
                  lg: 6,
                }}
              >
                <FormField
                  name="firstName"
                  label="Vorname"
                  required
                  fullWidth
                />
              </Grid2>
              <Grid2
                size={{
                  xs: 12,
                  lg: 6,
                }}
              >
                <FormField
                  name="lastName"
                  label="Nachname"
                  required
                  fullWidth
                />
              </Grid2>
              <Grid2 size={12}>
                <FormField name="email" label="Email" required fullWidth />
              </Grid2>
              <Grid2 size={12}>
                <FormField
                  name="message"
                  label="Nachricht"
                  placeholder="Schreiben Sie Ihre Nachricht"
                  required
                  multiline
                  minRows={3}
                  maxRows={6}
                  fullWidth
                />
              </Grid2>
            </Grid2>
            <LoadingButton
              onClick={submitForm}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2.5 }}
              loading={isSubmitting}
            >
              Bestätigen
            </LoadingButton>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
