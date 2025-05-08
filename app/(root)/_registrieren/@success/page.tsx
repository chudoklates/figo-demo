"use client";

import { PageContainer, ResultSnackbar } from "@/components";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REQUEST_PARTICIPANT_PASSWORD_RESET } from "@/api/mutations/user";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function Success() {
  const params = useSearchParams();
  const [snackbar, setSnackbar] = useState<"success" | "error" | null>(null);

  const [requestConfirmation, { loading }] = useMutation<{
    requestParticipantPasswordReset: boolean;
  }>(REQUEST_PARTICIPANT_PASSWORD_RESET);

  const email = params.get("email");

  if (!email) {
    redirect("/registrieren");
  }

  const handleResendEmail = async () => {
    try {
      const result = await requestConfirmation({
        variables: {
          email,
        },
      });

      if (result?.data?.requestParticipantPasswordReset) {
        setSnackbar("success");
      }
    } catch (err) {
      console.error(err);
      setSnackbar("error");
    }
  };

  return (
    <PageContainer>
      <Stack
        spacing={7}
        sx={{
          alignItems: "center",
        }}
      >
        <ResultSnackbar
          snackbarOpen={snackbar !== null}
          closeSnackbar={() => setSnackbar(null)}
          severity={snackbar!}
          message={
            snackbar === "success"
              ? "E-mail wurde erfolgreich gesendet!"
              : "Etwas ist schief gelaufen!"
          }
        />
        <Typography variant="h3">
          Bitte bestätigen Sie Ihre E-mail Adresse
        </Typography>
        <Image
          width={140}
          height={140}
          alt="Circled checkmark"
          src="/check-big.svg"
        />
        <Typography align="center">
          Ihr Konto wurde erstellt und eine E-Mail Bestätigung wurde an{" "}
          <strong>{email}</strong> gesendet.
          <br />
          Bitte klicken Sie auf den in der E-Mail enthaltenen
          Verifizierungslink, um Ihre Registrierung abzuschließen.
        </Typography>
        <Typography variant="subtitle1">
          Keine E-mail bekommen?{" "}
          <MuiLink
            color="primary"
            component="button"
            onClick={handleResendEmail}
          >
            Klicken Sie hier
            {loading ? (
              <CircularProgress size={10} sx={{ ml: 1 }} />
            ) : null}{" "}
          </MuiLink>{" "}
          um die E-mail wieder zu senden.
        </Typography>
      </Stack>
    </PageContainer>
  );
}
