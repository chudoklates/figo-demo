"use client";

import { UPDATE_PARTICIPANT } from "@/api/mutations/user";
import { FormField, SubmitButton, FormDateField } from "@/components";
import GeocodingProvider, {
  GeocodingContext,
} from "@/components/geo/GeocodingProvider";
import { UserContext } from "@/lib/context/UserContext";
import { BERLIN_COORDINATES } from "@/lib/geo/constants";
import { getComponentsForGeocode } from "@/lib/geo/utils";
import { SubmitFunction } from "@/types/formik";
import { updateUserFields } from "@/utils/cache";
import { useMutation } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { date, object, string } from "yup";

const VALIDATION_SCHEMA = object({
  first_name: string().required("Bitte geben Sie Ihren Vornamen."),
  last_name: string().required("Bitte geben Sie Ihren Nachnamen."),
  birth_date: date()
    .nullable()
    .min(
      new Date("1900-01-01"),
      ({ min }) =>
        `Das Datum muss nach dem ${getDateLabel(min as Date)} liegen.`
    )
    .max(dayjs().subtract(18, "years").toDate(), ({ value }) => {
      if (!value) return;

      return value.getTime() >= Date.now()
        ? "Kann nicht in der Zukunft liegen."
        : "Sie müssen mindestens 18 Jahre alt sein, um diesen Dienst nutzen zu können.";
    }),
  street_address: string().required("Bitte geben Sie Ihre Adresse."),
  house_number: string().required("Bitte geben Sie Ihre Hausnummer."),
  city: string().required("Bitte geben Sie Ihre Stadt."),
  postal_code: string()
    .required("Bitte geben Sie Ihre Postleitzahl.")
    .matches(/^\d{5}$/, "Ungültige Postleitzahl."),
});

type PersonalInfoFormValues = {
  first_name?: string;
  last_name?: string;
  birth_date: Dayjs | null;
  street_address?: string;
  house_number?: string;
  city?: string;
  postal_code?: string;
};

function PersonalInfoForm({ loading }: { loading: boolean }) {
  return (
    <Form>
      <Stack
        spacing={2}
        sx={{
          pb: 4,
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <FormField name="first_name" label="Vorname" required fullWidth />
          <FormField name="last_name" label="Nachname" required fullWidth />
        </Stack>
        <FormDateField name="birth_date" label="Geburtsdatum" fullWidth />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoFlow: "dense",
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 4", md: "span 3" } }}>
            <FormField
              name="street_address"
              label="Straße"
              required
              fullWidth
            />
          </Box>
          <Box sx={{ gridColumn: { xs: "span 2", md: "span 1" } }}>
            <FormField
              name="house_number"
              label="Hausnummer"
              required
              fullWidth
            />
          </Box>
          <Box sx={{ gridColumn: { xs: "span 4", md: "span 2" } }}>
            <FormField name="city" label="Stadt" required fullWidth />
          </Box>
          <Box sx={{ gridColumn: "span 2" }}>
            <FormField
              name="postal_code"
              label="Postleitzahl"
              required
              fullWidth
            />
          </Box>
        </Box>
        <SubmitButton loading={loading}>Daten speichern</SubmitButton>
      </Stack>
    </Form>
  );
}

function PersonalInfoFormWrapper() {
  const { user } = useContext(UserContext);
  const geocoder = useContext(GeocodingContext);

  const initialValues: PersonalInfoFormValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    birth_date: user?.birth_date ? dayjs(user.birth_date) : null,
    street_address: user?.location?.street,
    house_number: user?.location?.house_number,
    city: user?.location?.city,
    postal_code: user?.location?.postal_code,
  };

  const [mutate, { loading }] = useMutation<boolean>(UPDATE_PARTICIPANT);

  const handleSubmit: SubmitFunction<typeof initialValues> = async (
    values,
    { resetForm, setFieldError }
  ) => {
    const address = `${values.street_address} ${values.house_number}, ${values.postal_code} ${values.city}`;

    let geocoderResponse;

    try {
      geocoderResponse = await geocoder?.geocode({
        address,
        bounds: new google.maps.LatLngBounds(BERLIN_COORDINATES),
      });
    } catch (err) {
      setFieldError("street_address", "Adresse konnte nicht gefunden werden.");
      setFieldError(
        "house_number",
        "Die Hausnummer konnte nicht gefunden werden."
      );
      throw new Error();
    }

    const geocoderResult = geocoderResponse!.results[0];

    if (geocoderResult.types.some((type) => type === "route")) {
      setFieldError(
        "house_number",
        "Die Hausnummer konnte nicht gefunden werden."
      );
      throw new Error();
    }

    if (
      !geocoderResult?.types.some((type) =>
        ["street_address", "premise"].includes(type)
      )
    ) {
      setFieldError("street_address", "Adresse konnte nicht gefunden werden.");
      setFieldError(
        "house_number",
        "Die Hausnummer konnte nicht gefunden werden."
      );
      throw new Error();
    }

    const foundPostcode = geocoderResult.address_components.find((component) =>
      component.types.includes("postal_code")
    )?.long_name;

    if (foundPostcode !== values.postal_code) {
      setFieldError(
        "postal_code",
        `Ungültige Postleitzahl. Gefunden: ${foundPostcode}`
      );
      throw new Error();
    }

    const variables = {
      fields: [
        {
          tech_name: "first_name",
          value: values.first_name,
        },
        {
          tech_name: "last_name",
          value: values.last_name,
        },
        {
          tech_name: "birth_date",
          value: isDayjs(values.birth_date)
            ? values.birth_date.toISOString()
            : null,
        },
        {
          tech_name: "location",
          value: getComponentsForGeocode(geocoderResult, address),
        },
      ],
      id: user?.id,
    };

    await mutate({
      variables,
      update: updateUserFields(user, values),
    });
    resetForm({ values });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={initialValues}
    >
      <PersonalInfoForm loading={loading} />
    </Formik>
  );
}

export default function PersonalInfoGeocodingWrapper() {
  return (
    <GeocodingProvider>
      <PersonalInfoFormWrapper />
    </GeocodingProvider>
  );
}

function getDateLabel(date: Date) {
  return dayjs(date).format("DD.MM.YYYY");
}
