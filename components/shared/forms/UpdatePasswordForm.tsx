"use client";

import React, { useEffect, useRef, useState } from "react";

import Stack from "@mui/material/Stack";

import { object, string } from "yup";
import { Formik, Form } from "formik";

import { FormField, SubmitButton } from "@/components";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SubmitFunction } from "@/types/formik";
import { clearToken } from "@/lib/auth/utils";
import { getInternalErrorCode } from "@/utils/error";
import { SetPasswordFormProps, UpdatePasswordFormProps } from "./types";

const schema = object({
  currentPassword: string().required(
    "Bitte geben Sie Ihr aktuelles Passwort ein."
  ),
  password: string()
    .required("Bitte geben Sie Ihr Passwort ein.")
    .min(8, "Das Passwort darf mindestens 8 Zeichen lang sein.")
    .max(64, "Das Passwort darf maximal 64 Zeichen lang sein.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Das Passwort muss mindestens eine Zahl, einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten."
    ),
  confirmPassword: string()
    .required("Bitte bestätigen Sie Ihr neues Passwort.")
    .test(
      "passwords-match",
      "Passwörter müssen übereinstimmen.",
      (value, { parent }) => {
        return parent.password === value;
      }
    ),
});

const INITIAL_VALUES = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const ShowPasswordAdornment = ({
  toggleShowPassword,
  showPassword,
}: {
  toggleShowPassword: () => void;
  showPassword: boolean;
}) => (
  <InputAdornment position="end">
    <IconButton aria-label="Passwort anzeigen" onClick={toggleShowPassword}>
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
);

export default function UpdatePasswordForm({
  loginParticipant,
  email,
  loading,
  redirect,
  mutation,
  buttonLabel,
}: UpdatePasswordFormProps) {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [timeout]);

  const router = useRouter();

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values,
    { setFieldError }
  ) => {
    try {
      const verified = await mutation({
        variables: {
          current_password: values.currentPassword,
          new_password: values.password,
        },
      });

      if (verified) {
        try {
          clearToken();

          await loginParticipant({
            variables: {
              email,
              password: values.password,
            },
          });

          timeout.current = setTimeout(() => {
            router.replace(redirect);
          }, 1000);
        } catch (err) {
          // TODO: handle unsuccessful login
        }
        return;
      }
    } catch (err) {
      if (getInternalErrorCode(err) === "NAME_ALREADY_IN_USE") {
        setFieldError(
          "password",
          "Das neue Passwort kann nicht mit dem aktuellen identisch sein."
        );
      }
      if (getInternalErrorCode(err) === "INVALID_CREDENTIALS") {
        setFieldError(
          "currentPassword",
          "Das angegebene Passwort ist nicht korrekt."
        );
      }
      throw new Error();
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack
          spacing={4}
          sx={{
            pt: 4,
            pb: 8,
            textAlign: "left",
          }}
        >
          <FormField
            name="currentPassword"
            type={showPassword.currentPassword ? "text" : "password"}
            label="Altes Passwort"
            required
            fullWidth
            endAdornment={
              <ShowPasswordAdornment
                toggleShowPassword={() =>
                  setShowPassword((state) => ({
                    ...state,
                    currentPassword: !state.currentPassword,
                  }))
                }
                showPassword={showPassword.currentPassword}
              />
            }
          />
          <FormField
            name="password"
            type={showPassword.password ? "text" : "password"}
            label="Passwort"
            required
            fullWidth
            endAdornment={
              <ShowPasswordAdornment
                toggleShowPassword={() =>
                  setShowPassword((state) => ({
                    ...state,
                    password: !state.password,
                  }))
                }
                showPassword={showPassword.password}
              />
            }
          />
          <FormField
            name="confirmPassword"
            type={showPassword.confirmPassword ? "text" : "password"}
            label="Passwort bestätigen"
            required
            fullWidth
            endAdornment={
              <ShowPasswordAdornment
                toggleShowPassword={() =>
                  setShowPassword((state) => ({
                    ...state,
                    confirmPassword: !state.confirmPassword,
                  }))
                }
                showPassword={showPassword.confirmPassword}
              />
            }
          />
        </Stack>
        <SubmitButton loading={loading}>{buttonLabel}</SubmitButton>
      </Form>
    </Formik>
  );
}
