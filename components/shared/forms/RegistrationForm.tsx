"use client";

import React from "react";

import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import NextLink from "next/link";

import { useMutation } from "@apollo/client";
import { boolean, object, string } from "yup";
import { Formik, Form } from "formik";

import { REGISTER_PARTICIPANT } from "@/api/mutations/user";
import { CheckboxField, FormField, FormPhoneField } from "@/components";
import { getErrorMessage } from "@/utils/error";
import { usePathname, useRouter } from "next/navigation";
import { SubmitFunction } from "@/types/formik";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const schema = object({
  first_name: string().required("Bitte geben Sie Ihre Vorname."),
  last_name: string().required("Bitte geben Sie Ihre Nachname."),
  // birth_date: date()
  //   .nullable()
  //   .min(
  //     new Date("1900-01-01"),
  //     ({ min }) =>
  //       `Das Datum muss nach dem ${getDateLabel(min as Date)} liegen.`
  //   )
  //   .max(dayjs().subtract(18, "years").toDate(), ({ value }) => {
  //     if (!value) return;

  //     return value.getTime() >= Date.now()
  //       ? "Kann nicht in der Zukunft liegen."
  //       : "Sie müssen mindestens 18 Jahre alt sein, um diesen Dienst nutzen zu können.";
  //   }),
  phone_number: string()
    .nullable()
    .matches(/^\+49[1-9]{1}[0-9]{8,10}$/, "Ungültige Telefonnummer."),
  email: string()
    .email("Muss eine gültige E-mail sein.")
    .required("Bitte geben Sie Ihre E-mail."),
  consent: boolean().oneOf(
    [true],
    "Sie müssen die Nutzungsbedingungen und Datenschutzrichtlinien zustimmen."
  ),
});

type InitialValues = {
  first_name: string;
  last_name: string;
  email: string;
  // birth_date: Dayjs | null;
  phone_number: string | null;
  requested_callback?: boolean;
  consent: boolean;
};

const INITIAL_VALUES: InitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  // birth_date: null,
  phone_number: null,
  consent: false,
};

export default function RegistrationForm({
  embedded,
  activityId,
}: {
  embedded?: boolean;
  activityId?: string;
}) {
  const [registerUser, { loading }] =
    useMutation<boolean>(REGISTER_PARTICIPANT);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values,
    { setFieldError }
  ) => {
    try {
      const fields = [];

      // if (values.birth_date) {
      //   fields.push({
      //     tech_name: "birth_date",
      //     value: values.birth_date.toISOString(),
      //   });
      // }

      if (values.phone_number) {
        fields.push({
          tech_name: "phone_number",
          value: values.phone_number,
        });
        if (values.requested_callback) {
          fields.push({
            tech_name: "requested_callback",
            value: values.requested_callback,
          });
        }
      }

      if (activityId) {
        fields.push({
          tech_name: "auto_book_activity",
          value: activityId,
        });
      }

      await registerUser({
        variables: {
          participant_tech_name: "consumer",
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          ...(fields.length > 0 && {
            fields,
          }),
        },
      });

      const encodedEmail = encodeURIComponent(values.email);

      router.replace(`/registrieren?success=1&email=${encodedEmail}`);
    } catch (err) {
      if (getErrorMessage(err) === "NAME_ALREADY_IN_USE") {
        setFieldError(
          "email",
          "Diese E-mail Adresse wurde schon benutzt. Bitte prüfen Sie Ihren Posteingang auf eine Bestätigungsnachricht."
        );
      }
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, values }) => (
        <Form>
          {embedded ? (
            <Stack
              spacing={4.5}
              sx={{
                pb: 5,
                pt: 4,
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={3}>
                <Image
                  src="/figo-circle.svg"
                  alt="Logo"
                  width={45}
                  height={45}
                />
                <Typography variant="h3">Registrieren</Typography>
              </Stack>
              <Typography>
                Sie haben bereits ein Konto?{" "}
                <Link component={NextLink} href={`/einloggen?to=${pathname}`}>
                  Einloggen
                </Link>
              </Typography>
            </Stack>
          ) : null}
          <Grid2 container columnSpacing={3} rowSpacing={1}>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormField name="first_name" label="Vorname" required fullWidth />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormField name="last_name" label="Nachname" required fullWidth />
            </Grid2>
            <Grid2 size={12}>
              <FormField name="email" label="Email" required fullWidth />
            </Grid2>
            <Grid2 size={12}>
              {/* <FormDateField name="birth_date" label="Geburtsdatum" fullWidth /> */}
              <FormPhoneField
                name="phone_number"
                label="Telefonnummer (optional)"
                fullWidth
              />
            </Grid2>
          </Grid2>
          <Stack
            spacing={2}
            sx={{
              pt: 2,
            }}
          >
            <Box
              sx={{
                pl: "9px",
              }}
            >
              <CheckboxField
                name="requested_callback"
                label="Ich möchte zurückgerufen werden."
                disabled={!values.phone_number}
              />
              <CheckboxField
                name="consent"
                required
                label={
                  <Typography component="span">
                    Ich stimme zu allen{" "}
                    <Link component={NextLink} href="/agb-fuer-mitglieder">
                      Nutzungsbedingungen
                    </Link>{" "}
                    und zu der{" "}
                    <Link component={NextLink} href="/datenschutz">
                      Datenschutzrichtlinie
                    </Link>{" "}
                    zu
                  </Typography>
                }
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              {...(loading && {
                startIcon: <CircularProgress size={18} color="inherit" />,
              })}
              onClick={submitForm}
            >
              Konto erstellen
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

// function getDateLabel(date: Date) {
//   return dayjs(date).format("DD.MM.YYYY");
// }
