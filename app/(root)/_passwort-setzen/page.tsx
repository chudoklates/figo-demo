import React from "react";

import { RESET_PARTICIPANT_PASSWORD } from "@/api/mutations/user";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import decodeToJSONObject from "@/lib/decodeToJSONObject";
import { BrokenLink, PageContainer, SetPasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function ResetPassword(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const data = searchParams?.data;
  const error = searchParams?.error;

  if (error) {
    // Error in query params - show broken link page
    return <BrokenLink errorCode={error} />;
  }

  if (!data) {
    // No token provided - show broken link page
    return <BrokenLink />;
  }

  const { token, email } = decodeToJSONObject(data);

  if (!token || !email) {
    // Invalid token - show broken link page
    return <BrokenLink />;
  }

  return (
    <PageContainer containerOverrides={{ maxWidth: "sm" }}>
      <Stack
        spacing={4}
        sx={{
          pb: 16,
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Neues Passwort einrichten</Typography>
        {/* <Typography variant="subtitle1">
          Bitte erstellen Sie ein Passwort mit mindestens 8 Zeichen, eine Zahl,
          einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen.
          Vermeiden Sie gebräuchliche Wörter und verwenden Sie Passwörter nicht
          wieder.
        </Typography> */}
        <SetPasswordForm
          mutation={RESET_PARTICIPANT_PASSWORD}
          email={email}
          token={token}
          redirect="/app/dashboard"
          buttonLabel="Passwort zurücksetzen"
        />
      </Stack>
    </PageContainer>
  );
}
