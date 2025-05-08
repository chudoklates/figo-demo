"use client";

import { LOGIN_PARTICIPANT, UPDATE_PASSWORD } from "@/api/mutations/user";
import { GET_MY_PARTICIPANTS, GET_USER } from "@/api/queries/users";
import { PageContainer, PageHeading, UpdatePasswordForm } from "@/components";
import { UserContext } from "@/lib/context/UserContext";
import { useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import { useContext } from "react";

export default function UpdatePassword() {
  const [updatePassword, { loading: updateLoading }] =
    useMutation<boolean>(UPDATE_PASSWORD);
  const [loginParticipant, { loading: loginLoading }] = useMutation(
    LOGIN_PARTICIPANT,
    {
      refetchQueries: [GET_MY_PARTICIPANTS, GET_USER],
    }
  );

  const loading = updateLoading || loginLoading;

  const { user } = useContext(UserContext);

  return (
    <PageContainer
      containerOverrides={{ maxWidth: "lg" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
    >
      <PageHeading title="Passwort ändern" />
      <Typography
        sx={{
          color: "grey.700",
        }}
      >
        Bitte erstellen Sie ein Passwort mit mindestens 8 Zeichen, eine Zahl,
        einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen.
        Vermeiden Sie gebräuchliche Wörter und verwenden Sie Passwörter nicht
        wieder.
      </Typography>
      <UpdatePasswordForm
        mutation={updatePassword}
        email={user?.email || ""}
        loading={loading}
        loginParticipant={loginParticipant}
        buttonLabel="Passwort ändern"
        redirect="/app/konto-einstellungen"
      />
    </PageContainer>
  );
}
