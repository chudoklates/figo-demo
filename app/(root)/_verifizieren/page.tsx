import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { VERIFY_PARTICIPANT } from "@/api/mutations/user";
import decodeToJSONObject from "@/lib/decodeToJSONObject";
import { BrokenLink, PageContainer, SetPasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function VerifyAccount(props: {
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
        <Typography variant="h3">Passwort wählen</Typography>
        {/* <Typography variant="subtitle1">
          Bitte erstellen Sie ein Passwort mit mindestens 8 Zeichen, eine Zahl,
          einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen.
          Vermeiden Sie gebräuchliche Wörter und verwenden Sie Passwörter nicht
          wieder.
        </Typography> */}
        <SetPasswordForm
          mutation={VERIFY_PARTICIPANT}
          email={email}
          token={token}
          buttonLabel="Bestätigen"
          redirect="/app/einfuehrung/interessen"
        />
      </Stack>
    </PageContainer>
  );
}
