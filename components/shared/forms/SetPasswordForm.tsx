"use client";

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { object, string } from "yup";
import { Formik, Form } from "formik";

import { useMutation } from "@apollo/client";
import { FormField } from "@/components";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SubmitFunction } from "@/types/formik";
import { clearToken } from "@/lib/auth/utils";
import { getErrorMessage } from "@/utils/error";
import { SetPasswordFormProps } from "./types";

import { GET_MY_PARTICIPANTS, GET_USER } from "@/graphql/queries/users";
import { LOGIN_PARTICIPANT } from "@/graphql/mutations/user";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const schema = object({
  password: string()
    .required("Bitte geben Sie Ihr Passwort ein.")
    .min(8, "Das Passwort darf mindestens 8 Zeichen lang sein.")
    .max(64, "Das Passwort darf maximal 64 Zeichen lang sein.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Das Passwort muss mindestens eine Zahl, einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten."
    ),
  confirmPassword: string()
    .required("Bitte bestätigen Sie Ihr Passwort.")
    .test(
      "passwords-match",
      "Das erneut eingegebene Passwort stimmt nicht mit Ihrem Passwort überein.",
      (value, { parent }) => {
        return parent.password === value;
      }
    ),
});

const INITIAL_VALUES = {
  password: "",
  confirmPassword: "",
};

export default function SetPasswordForm({
  email,
  token,
  redirect,
  mutation,
  buttonLabel,
}: SetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [hideExtended, setHideExtended] = useState(true);

  const [setPassword, { loading: setPasswordLoading }] =
    useMutation<boolean>(mutation);

  const [loginParticipant, { loading: loginLoading }] = useMutation(
    LOGIN_PARTICIPANT,
    {
      refetchQueries: [GET_MY_PARTICIPANTS, GET_USER],
    }
  );

  const loading = setPasswordLoading || loginLoading;

  const ShowPasswordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="Passwort anzeigen"
        onClick={() => setShowPassword((state) => !state)}
        onMouseDown={() => setShowPassword((state) => !state)}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const router = useRouter();

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values
  ) => {
    try {
      const verified = await setPassword({
        variables: {
          password: values.password,
          token,
        },
      });

      if (verified) {
        clearToken();

        await loginParticipant({
          variables: {
            email,
            password: values.password,
          },
        });
        router.replace(redirect);
        return;
      }
    } catch (err) {
      if (getErrorMessage(err) === "INVALID_TOKEN_IN_REQUEST") {
        router.replace("?error=invalid_token");
      }
      if (getErrorMessage(err) === "INVALID_PARAMETERS") {
        router.replace("?error=expired");
      }
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          {/* Hidden field for password managers to save the password for this user email */}
          <input
            type="text"
            name="email"
            value={email}
            autoComplete="username"
            style={{ display: "none" }}
          />
          <Stack
            sx={{
              pt: 4,
              pb: 8,
              textAlign: "left",
            }}
          >
            <FormField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Passwort"
              required
              fullWidth
              endAdornment={ShowPasswordAdornment}
              onFocus={() => setHideExtended(false)}
              onBlur={() => setHideExtended(true)}
              autoComplete="new-password"
              inputProps={{
                /* Information for password managers on how to generate a correct password for this site */
                passwordRules:
                  "minlength: 8; maxlength: 64; required: lower; required: upper; required: digit; required: [-];",
              }}
            />
            <PasswordStrengthIndicator
              password={values.password}
              hideExtended={hideExtended}
            />
            <FormField
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              label="Passwort bestätigen"
              required
              fullWidth
              autoComplete="new-password"
              endAdornment={ShowPasswordAdornment}
              sx={{ mt: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              {...(loading && {
                startIcon: <CircularProgress size={18} color="inherit" />,
              })}
              sx={{ mt: 4 }}
            >
              {buttonLabel}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
