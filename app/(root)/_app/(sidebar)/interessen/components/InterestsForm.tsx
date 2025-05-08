"use client";

import { Alert, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import InterestsField from "./InterestsField";
import { useContext } from "react";
import { UserContext } from "@/lib/context/UserContext";
import { useMutation } from "@apollo/client";
import { UPDATE_PARTICIPANT } from "@/api/mutations/user";
import { SubmitFunction } from "@/types/formik";
import { SubmitButton } from "@/components";
import { array, object } from "yup";

const validationSchema = object({
  interests: array().min(1, "Bitte wählen Sie mindestens ein Interesse."),
});

function InterestsForm({
  loading,
  options,
}: {
  loading: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <Form>
      <Stack
        spacing={{ xs: 8, md: 4 }}
        sx={{
          pb: 4,
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        <InterestsField options={options} />
        {/* Distance for activities out of scope of MVP */}
        {/* <Grid2 container alignItems="center">
          <Grid2 item xs={8}>
            <Typography>
              Aktivitäten empfehlen, die maximal so weit von mir sind:
            </Typography>
          </Grid2>
          <Grid2 item xs={2}>
            <FormSelect
              name="maxDistance"
              label=""
              helperText=""
              options={["2 km", "5 km", "10 km", "20 km"]}
              fullWidth
            />
          </Grid2>
        </Grid2> */}
        <SubmitButton loading={loading}>Änderungen speichern</SubmitButton>
      </Stack>
    </Form>
  );
}

export default function InterestsFormWrapper() {
  const { user } = useContext(UserContext);
  const [mutate, { loading }] = useMutation<{ updateParticipant: boolean }>(
    UPDATE_PARTICIPANT
  );

  const initialValues = {
    interests: user?.preferred_categories || [],
  };

  const categoriesField = user?.fields.find(
    ({ field_type }) => field_type.tech_name === "preferred_categories"
  );

  if (!categoriesField) {
    return (
      <Alert severity="error">
        Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
      </Alert>
    );
  }

  const categoryFieldIdentifier = `${categoriesField.__typename}:${categoriesField.id}`;

  const options = categoriesField.field_type.ui_config.options.map(
    ({ value, label }) => ({ value, label })
  );

  const handleSubmit: SubmitFunction<typeof initialValues> = async (
    values,
    { resetForm }
  ) => {
    const variables = {
      fields: [
        {
          tech_name: "preferred_categories",
          value: values.interests,
        },
      ],
      id: user?.id,
    };

    try {
      await mutate({
        variables,
        update: (cache, { data }) => {
          if (data?.updateParticipant) {
            try {
              cache.modify<{ value: string[] }>({
                id: categoryFieldIdentifier,
                broadcast: false,
                fields: {
                  value() {
                    return values.interests;
                  },
                },
              });
            } catch (err) {
              console.error(err);
            }
          }
        },
      });
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <InterestsForm loading={loading} options={options} />
    </Formik>
  );
}
