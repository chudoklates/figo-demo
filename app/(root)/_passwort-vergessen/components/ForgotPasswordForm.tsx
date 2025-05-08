"use client";

import { REQUEST_PARTICIPANT_PASSWORD_RESET } from "@/api/mutations/user";
import { FormField, ResultSnackbar } from "@/components";
import { useMutation } from "@apollo/client";
import { Button, CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { object, string } from "yup";

const schema = object({
  email: string()
    .email("Muss eine gültige E-mail sein.")
    .required("Bitte geben Sie Ihre E-mail."),
});

export default function ForgotPasswordForm() {
  const [requestPasswordReset, { loading }] = useMutation<boolean>(
    REQUEST_PARTICIPANT_PASSWORD_RESET
  );
  const [snackbar, setSnackbar] = useState<"error" | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await requestPasswordReset({
        variables: {
          email: values.email,
        },
      });
      const encodedEmail = encodeURIComponent(values.email);
      router.replace(`/passwort-vergessen?sent=1&email=${encodedEmail}`);
    } catch (err) {
      setSnackbar("error");
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <Stack spacing={4}>
              <FormField name="email" label="Email" fullWidth />
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                {...(loading && {
                  startIcon: <CircularProgress size={18} color="inherit" />,
                })}
                onClick={submitForm}
              >
                Bestätigen
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <ResultSnackbar
        snackbarOpen={snackbar === "error"}
        closeSnackbar={() => setSnackbar(null)}
        severity="error"
        message="Es gab ein Problem beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut."
      />
    </React.Fragment>
  );
}
