import React from "react";
import { PageContainer } from "@/components";
import {
  Facebook,
  LinkedIn,
  MailOutline,
  PhoneOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import {
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  Grid2,
  Box,
} from "@mui/material";
import { Metadata } from "next";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Haben Sie Fragen? Kontaktieren Sie uns einfach und schnell. Wir helfen Ihnen gerne weiter!",
};

export default function ContactUs() {
  return (
    <PageContainer
      containerOverrides={{
        maxWidth: false,
        disableGutters: true,
      }}
      boxOverrides={{
        sx: {
          backgroundImage: `radial-gradient(
              ellipse at bottom left,
              rgba(0, 103, 190, 0.33),
              #ffff 50%
            ),
            radial-gradient(ellipse at top right, rgba(255, 148, 48, 0.33), #ffff 50%);`,
          backgroundBlendMode: "multiply",
          pb: 6,
        },
      }}
    >
      <Grid2 container columnSpacing={1} rowSpacing={10}>
        <Grid2
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Container
            maxWidth="md"
            component={Stack}
            display="flex !important"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              sx={{
                alignItems: { xs: "center", lg: "flex-start" },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              <Typography variant="h1">Kontaktieren Sie uns</Typography>
              <Typography
                sx={{
                  fontSize: { xs: 20, lg: 24 },
                  lineHeight: { xs: "20px", lg: "34px" },
                  fontWeight: 500,
                }}
              >
                Eine Frage? Wir sind für Sie da!
              </Typography>
              <Stack
                direction="column"
                spacing={6}
                sx={{
                  mt: 8,
                  mb: 3,
                }}
              >
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={{ xs: 2, lg: 3 }}
                  sx={{
                    alignItems: { xs: "center", lg: "flex-start" },
                  }}
                >
                  <MailOutline fontSize="large" />
                  <Typography
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    Schreiben Sie uns eine E-Mail an
                    <br />
                    <Link
                      href="#"
                      color="inherit"
                      underline="always"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ***REMOVED***
                    </Link>
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={{ xs: 2, lg: 3 }}
                  sx={{
                    alignItems: { xs: "center", lg: "flex-start" },
                  }}
                >
                  <PhoneOutlined fontSize="large" />
                  <Typography
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    Kontaktieren Sie uns unter
                    <br />
                    <Link
                      href="#"
                      color="inherit"
                      underline="always"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ***REMOVED***
                    </Link>{" "}
                    <Typography
                      component="span"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      (WhatsApp)
                    </Typography>
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={{ xs: 2, lg: 3 }}
                  sx={{
                    alignItems: { xs: "center", lg: "flex-start" },
                  }}
                >
                  <ScheduleOutlined fontSize="large" />
                  <Typography
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    Öffnungszeiten
                    <br />
                    <strong>10:00-18:00</strong>
                    <br />
                    Uhr Montag bis Freitag
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={2.5}
                sx={{
                  mt: 2,
                  ml: { xs: 0, lg: "59px" },
                }}
              >
                <IconButton
                  href="#"
                  target="_blank"
                  aria-label="Facebook"
                  disableRipple
                  sx={{
                    backgroundColor: "#000",
                    ":hover": { backgroundColor: "#000", opacity: 0.7 },
                    "& svg": {
                      fill: "#fff",
                    },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="#"
                  target="_blank"
                  aria-label="LinkedIn"
                  disableRipple
                  sx={{
                    backgroundColor: "#000",
                    ":hover": { backgroundColor: "#000", opacity: 0.7 },
                    "& svg": {
                      fill: "#fff",
                    },
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Box
            sx={{
              pt: { xs: 0, lg: "66px" },
            }}
          >
            <ContactForm />
          </Box>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
