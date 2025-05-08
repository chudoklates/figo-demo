"use client";

import { FormField, PageContainer, ProfileEditSection } from "@/components";
import { PageHeading } from "@/components/shared/general";
import { Button, Link, Stack, Switch } from "@mui/material";
import { Form, Formik } from "formik";

import NextLink from "next/link";

const INITIAL_VALUES = {
  name: "",
  description: "",
  gender: "",
  place: "",
};

export default function Profile() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "sm" }}
      boxOverrides={{ sx: { pt: 12 } }}
    >
      <Stack spacing={2}>
        <PageHeading
          title="Profil bearbeiten"
          subtitle="Diese Informationen werden in Ihrem öffentlichen Profil erscheinen"
        />
        <Formik onSubmit={(values) => {}} initialValues={INITIAL_VALUES}>
          {({ submitForm }) => (
            <Form>
              <Stack
                spacing={2}
                sx={{
                  pb: 4,
                }}
              >
                <FormField name="name" label="Name" />
                <FormField
                  name="description"
                  label="Beschreibung"
                  multiline
                  minRows={3}
                  maxRows={5}
                  placeholder="Schreiben Sie was über sich selbst"
                />
                <FormField name="place" label="Lage" />
                {/* <FormSelect
                  label="Geschlecht"
                  name="gender"
                  options={["Weiblich", "Männlich", "Andere"]}
                /> */}
                <ProfileEditSection
                  heading="Interessen"
                  description="Auf Ihrer Profilseite, jeder kann Ihre Interessen sehen"
                  controlElement={
                    <Switch
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                >
                  <Link
                    href="/app/interessen"
                    color="primary"
                    component={NextLink}
                    sx={{ textDecoration: "underline" }}
                  >
                    Interesse speichern
                  </Link>
                </ProfileEditSection>
                <ProfileEditSection
                  heading="Privatsphäre"
                  description="Passen Sie Ihre Datenschutzeinstellungen an: Legen Sie
                  fest, wer Sie kontaktieren kann, Ihre Inhalte sehen kann
                  und vieles mehr."
                >
                  <Link
                    href="/app/account-privacy"
                    color="primary"
                    component={NextLink}
                    sx={{ textDecoration: "underline" }}
                  >
                    Privatsphäre verwalten
                  </Link>
                </ProfileEditSection>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                Profil speichern
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </PageContainer>
  );
}
