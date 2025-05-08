"use client";

import { FormField, ProfileEditSection } from "@/components";
import { UserContext } from "@/lib/context/UserContext";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useContext } from "react";

function AccountSettingsForm() {
  return (
    <Form>
      <Stack
        spacing={2}
        sx={{
          pb: 6,
        }}
      >
        <FormField name="email" label="Email" fullWidth readOnly disabled />
        <Typography variant="subtitle2">
          Wollen Sie Ihre Email Adresse ändern?{" "}
          <Link href="#">Schreiben Sie</Link> uns bitte eine Nachricht
        </Typography>
        {/* Timezone and Language out of scope of MVP */}
        {/* <FormSelect
          name="timezone"
          label="Zeitzone"
          options={["Europe/Berlin", "Europe/London", "Europe/Paris"]}
          fullWidth
        />
        <FormSelect
          name="language"
          label="Sprache"
          options={["Deutsch", "Englisch"]}
          fullWidth
        /> */}
      </Stack>
      <Link
        href="/app/passwort-aendern"
        component={NextLink}
        color="inherit"
        underline="always"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
          pb: 6,
        }}
      >
        Passwort ändern
        <ArrowForwardIos />
      </Link>
      {/* Notifications section - disabled for MVP */}
      {/* <Box pb={6}>
        <Typography variant="h5" component="h3" gutterBottom pb={3}>
          Benachrichtigungen
        </Typography>
        <ProfileEditSection
          heading="Email-Benachrichtigungen"
          description="Wählen Sie, welche Benachrichtigungen Sie per Email erhalten möchten."
          controlElement={
            <Button variant="outlined" size="small">
              Bearbeiten
            </Button>
          }
        />
        <ProfileEditSection
          heading="Push-Benachrichtigungen"
          description="Wählen Sie, welche Benachrichtigungen Sie auf Ihrem Handy oder Computer erhalten möchten."
          controlElement={
            <Button variant="outlined" size="small">
              Bearbeiten
            </Button>
          }
        />
      </Box> */}
      <Box
        sx={{
          pb: 6,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            pb: 3,
          }}
        >
          Deaktivierung und Pause
        </Typography>
        {/* <ProfileEditSection
          heading="Mitgliedschaft pausieren"
          description="Ihr Konto und Ihre Aktivitäten vorübergehend pausieren. Ihr Konto bleibt aktiv."
          controlElement={
            <Button variant="outlined" size="small">
              Mitgliedschaft pausieren
            </Button>
          }
        /> */}
        <ProfileEditSection
          heading="Konto schliessen"
          description="Löschen Sie Ihre Daten und alles, was mit Ihrem Konto verbunden ist, unwiderruflich."
        >
          <Typography variant="subtitle2">
            Falls Sie Ihr Konto schliessen wollen, schreiben Sie uns bitte{" "}
            <Link href="#">eine Email</Link>
          </Typography>
        </ProfileEditSection>
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          onClick={submitForm}
        >
          Änderungen speichern
        </Button> */}
      </Box>
    </Form>
  );
}

export default function AccountSettingsFormWrapper() {
  const { user } = useContext(UserContext);

  const initialValues = {
    email: user?.email,
  };

  return (
    <Formik onSubmit={(values) => {}} initialValues={initialValues}>
      <AccountSettingsForm />
    </Formik>
  );
}
