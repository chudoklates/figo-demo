"use client";

import { PageContainer, ResultSnackbar } from "@/components";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REQUEST_PARTICIPANT_PASSWORD_RESET } from "@/api/mutations/user";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function SuccessPage({ email }: { email?: string }) {
  const [snackbar, setSnackbar] = useState<"success" | "error" | null>(null);

  const [requestConfirmation, { loading }] = useMutation<{
    requestParticipantPasswordReset: boolean;
  }>(REQUEST_PARTICIPANT_PASSWORD_RESET);

  if (!email) {
    redirect("/passwort-vergessen");
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
          Email für die Passwort-Wiederherstellungs gesendet
        </Typography>
        <Image
          width={140}
          height={140}
          alt="Circled checkmark"
          src="/check-big.svg"
        />
        <Typography align="center">
          Ihre Anfrage zum Zurücksetzen des Passworts wurde erhalten. Eine
          E-Mail mit weiteren Anweisungen wurde an <strong>{email}</strong>{" "}
          gesendet. Bitte überprüfen Sie Ihr Postfach und folgen Sie dem
          bereitgestellten Link, um Ihr Passwort zurückzusetzen.
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
