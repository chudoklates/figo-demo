"use client";

import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "next/link";
import { useRouter } from "next/navigation";

import InterestCard from "./components/InterestCard";
import { UPDATE_PARTICIPANT } from "@/api/mutations/user";
import { useMutation } from "@apollo/client";
import { GET_MY_PARTICIPANTS } from "@/api/queries/users";
import { SimpleField } from "@/api/types/fields";
import { UserContext } from "@/lib/context/UserContext";
import type { Interest, Option } from "./components/types";
import { MyParticipantsType } from "@/api/types/user";

export default function Interests() {
  const [updateParticipant, { loading }] = useMutation<{
    updateParticipant: boolean;
  }>(UPDATE_PARTICIPANT);

  const router = useRouter();

  const { user } = useContext(UserContext);

  const { id, fields } = user || {};

  const preferredCategoriesField = fields?.find(
    (field) => field.field_type.tech_name === "preferred_categories"
  ) as SimpleField<string[]> | undefined;

  const interests: Option<Interest>[] =
    preferredCategoriesField?.field_type.ui_config.options || [];

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    preferredCategoriesField?.simpleValue || []
  );

  const handleSelectInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests([
        ...selectedInterests.filter((i) => i !== interest),
      ]);
      return;
    }

    setSelectedInterests([...selectedInterests, interest]);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const result = await updateParticipant({
        variables: {
          fields: [
            {
              tech_name: "preferred_categories",
              value: selectedInterests,
            },
          ],
          id,
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
                      onboarding_progress: {
                        ...participant.onboarding_progress,
                        status_tech_name: "standort",
                        status: "Enter location",
                      },
                      fields: participant.fields.map((field) => {
                        if (
                          field?.field_type?.tech_name ===
                          "preferred_categories"
                        ) {
                          return {
                            ...field,
                            simpleValue: selectedInterests,
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
        router.replace("/app/einfuehrung/standort");
        return;
      }
      throw new Error(`Failed to update participant`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Stack
        spacing={4}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Was sind Ihre Interessen?</Typography>
        <Typography>
          Sagen Sie uns, was Sie mögen! Sie können so viele
          <br />
          Interessen auswählen, wie Sie möchten.
        </Typography>
      </Stack>
      <Grid2
        container
        wrap="wrap"
        rowSpacing={7}
        columnSpacing={1.5}
        sx={{
          pt: 8,
          justifyContent: "center",
        }}
      >
        {interests.map(({ value: interest, label }) => (
          <Grid2
            key={interest}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            size={{
              xs: 6,
              sm: 4,
              md: "auto",
            }}
          >
            <InterestCard
              interest={interest}
              active={selectedInterests.includes(interest)}
              handleSelectInterest={handleSelectInterest}
            />
            <Typography align="center" variant="h6" component="span">
              {label.toUpperCase()}
            </Typography>
          </Grid2>
        ))}
      </Grid2>
      <Stack
        sx={{
          pb: 20,
          pt: 8,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 216,
          }}
        >
          <Button
            size="large"
            variant="contained"
            LinkComponent={Link}
            href="./standort"
            {...(loading && {
              startIcon: <CircularProgress size={18} color="inherit" />,
            })}
            disabled={selectedInterests.length === 0}
            fullWidth
            onClick={handleSubmit}
          >
            Weiter
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
