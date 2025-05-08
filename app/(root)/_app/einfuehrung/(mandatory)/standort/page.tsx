"use client";

import { useContext } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { Form, Formik } from "formik";
import { object, string } from "yup";

import { useMutation } from "@apollo/client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { UPDATE_PARTICIPANT } from "@/api/mutations/user";
import { GET_MY_PARTICIPANTS } from "@/api/queries/users";
import { getComponentsForGeocode } from "@/lib/geo/utils";
import { SubmitFunction } from "@/types/formik";

import { UserContext } from "@/lib/context/UserContext";
import { GeocodingContext } from "@/components/geo/GeocodingProvider";
import { BERLIN_COORDINATES } from "@/lib/geo/constants";
import { FormField } from "@/components";
import { MyParticipantsType } from "@/api/types/user";

const INITIAL_VALUES = {
  street_address: "",
  house_number: "",
  city: "",
  postal_code: "",
};

const validationSchema = object({
  street_address: string().required("Bitte geben Sie Ihre Adresse."),
  house_number: string().required("Bitte geben Sie Ihre Hausnummer."),
  city: string().required("Bitte geben Sie Ihre Stadt."),
  postal_code: string()
    .required("Bitte geben Sie Ihre Postleitzahl.")
    .matches(/^\d{5}$/, "Ungültige Postleitzahl."),
});

export default function Location() {
  const { user } = useContext(UserContext);

  const { id } = user || {};

  const [updateParticipant, { loading }] = useMutation<{
    updateParticipant: boolean;
  }>(UPDATE_PARTICIPANT);
  const geocoder = useContext(GeocodingContext);

  const router = useRouter();

  const handleSubmit: SubmitFunction<typeof INITIAL_VALUES> = async (
    values,
    { setFieldError }
  ) => {
    try {
      const address = `${values.street_address} ${values.house_number}, ${values.postal_code} ${values.city}`;

      let geocoderResponse;

      try {
        geocoderResponse = await geocoder?.geocode({
          address,
          bounds: new google.maps.LatLngBounds(BERLIN_COORDINATES),
        });
      } catch (err) {
        setFieldError(
          "street_address",
          "Adresse konnte nicht gefunden werden."
        );
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
        setFieldError(
          "street_address",
          "Adresse konnte nicht gefunden werden."
        );
        setFieldError(
          "house_number",
          "Die Hausnummer konnte nicht gefunden werden."
        );
        throw new Error();
      }

      const foundPostcode = geocoderResult.address_components.find(
        (component) => component.types.includes("postal_code")
      )?.long_name;

      if (foundPostcode !== values.postal_code) {
        setFieldError(
          "postal_code",
          `Ungültige Postleitzahl. Gefunden: ${foundPostcode}`
        );
        throw new Error();
      }

      const locationValue = getComponentsForGeocode(geocoderResult, address);

      const result = await updateParticipant({
        variables: {
          id,
          fields: [
            {
              tech_name: "location",
              value: locationValue,
            },
          ],
        },
        update: (cache, { data }) => {
          if (!data?.updateParticipant) return;

          cache.updateQuery<{ myParticipants: MyParticipantsType[] }>(
            {
              query: GET_MY_PARTICIPANTS,
            },
            (prevData) => {
              if (!prevData) return;

              return {
                myParticipants: prevData.myParticipants.map((participant) => {
                  if (participant.id === id) {
                    return {
                      ...participant,
                      status: "ONBOARDED",
                      onboarding_progress: {
                        ...participant.onboarding_progress,
                        status_tech_name: "onboarded",
                        status: "Onboarded",
                      },
                      fields: participant.fields.map((field) => {
                        if (field?.field_type?.tech_name === "location") {
                          return {
                            ...field,
                            simpleValue: locationValue,
                          };
                        }

                        if (field?.field_type?.tech_name === "credits") {
                          return {
                            ...field,
                            simpleValue: 1,
                          };
                        }

                        return field;
                      }),
                    };
                  }

                  return participant;
                }),
              };
            }
          );
        },
      });

      if (result) {
        router.replace("/app/einfuehrung/abgeschlossen");
        return;
      }

      throw new Error("Failed to update participant location");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Stack
        spacing={4}
        sx={{
          pb: 20,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Wo wollen Sie Aktivitäten suchen?</Typography>
        <Typography>
          Geben Sie Ihre Adresse ein, um Ihre Lieblingsaktivitäten in Ihrer Nähe
          zu finden!
        </Typography>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm }) => (
            <Form style={{ width: "100%" }}>
              <Stack
                spacing={4}
                sx={{
                  textAlign: "left",
                  alignItems: "center",
                }}
              >
                <Container component={Stack} maxWidth="xs" spacing={2}>
                  <FormField
                    name="street_address"
                    label="Meine Adresse"
                    placeholder="Straße"
                    required
                    fullWidth
                  />
                  <FormField
                    name="house_number"
                    placeholder="Straßennummer"
                    required
                    fullWidth
                  />
                  <FormField
                    name="postal_code"
                    placeholder="Postleitzahl"
                    required
                    fullWidth
                  />
                  <FormField
                    name="city"
                    placeholder="Stadt"
                    required
                    fullWidth
                  />
                </Container>
                <Box
                  sx={{
                    width: 216,
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    LinkComponent={Link}
                    href="./mitgliedschaft" // Note: this link is just for semantic purposes
                    fullWidth
                    {...(loading && {
                      startIcon: <CircularProgress size={18} color="inherit" />,
                    })}
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Weiter
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}
