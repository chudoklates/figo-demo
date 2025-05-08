"use client";

import { LOGIN_PARTICIPANT } from "@/api/mutations/user";
import { FormField } from "@/components";
import { SubmitFunction } from "@/types/formik";
import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import Button from "@mui/material/Button";
import { CircularProgress, Stack } from "@mui/material";
import { getInternalErrorCode } from "@/utils/error";
import { useRouter } from "next/navigation";
import { GET_MY_PARTICIPANTS, GET_USER } from "@/api/queries/users";
import { clearToken } from "@/lib/auth/utils";

const schema = object({
  email: string()
    .email("Muss eine gültige E-mail sein.")
    .required("Bitte geben Sie Ihre E-mail."),
  password: string().required("Bitte geben Sie Ihr Passwort ein."),
});

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export default function LoginForm({
  redirect,
  query,
}: {
  redirect?: string;
  query?: string;
}) {
  const [login, { loading }] = useMutation(LOGIN_PARTICIPANT, {
    refetchQueries: [GET_MY_PARTICIPANTS, GET_USER],
    awaitRefetchQueries: true,
  });

  const router = useRouter();

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values,
    { setErrors }
  ) => {
    try {
      await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      router.push(redirect ? `${redirect}?${query}` : "/app/dashboard");
    } catch (err) {
      if (getInternalErrorCode(err) === "INVALID_CREDENTIALS") {
        setErrors({
          email: "Ungültige Zugangsdaten",
          password: "Ungültige Zugangsdaten",
        });
        return;
      }
      clearToken();
      setErrors({
        email: "Ein Fehler ist aufgetreten",
      });
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form>
          <Stack>
            <FormField name="email" label="Email" />
            <FormField name="password" label="Password" type="password" />
            <Button
              variant="contained"
              size="large"
              fullWidth
              {...(loading && {
                startIcon: <CircularProgress size={18} color="inherit" />,
              })}
              sx={{ mt: 4 }}
              onClick={submitForm}
            >
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
