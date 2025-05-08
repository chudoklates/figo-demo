import {
  Box,
  Container,
  Link,
  Stack,
  StepIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import SectionTitle from "./components/SectionTitle";
import { ArrowForwardIosRounded } from "@mui/icons-material";

import createAccount from "@/public/create-account.webp";
import done from "@/public/done.webp";
import highFive2 from "@/public/high-five-2.webp";

import React from "react";
import CTAButton from "./components/CTAButton";
import { arima } from "@/theme/fonts";

const gradientBackground = `
  radial-gradient(
    ellipse at 0% 70%,
    rgba(0, 103, 190, 0.25),
    #ffff 30%
  ),
  radial-gradient(ellipse at 100% 30%, rgba(255, 148, 48, 0.25), #ffff 30%);
`;

const STEPS = [
  {
    icon: 1,
    title: "Registrieren",
    src: createAccount,
    alt: "Registrieren",
    content:
      "Erstellen Sie ein kostenloses Kundenkonto und geben Sie Ihre Interessen und Ihren Standort an. Als Dankeschön für Ihre Anmeldung können Sie unverbindlich an einem Schnupperkurse gratis teilnehmen.",
    link: {
      href: "/registrieren",
      label: "Jetzt registrieren",
    },
  },
  {
    icon: 2,
    title: "Schnupperkurs buchen",
    src: done,
    alt: "Fertig",
    content:
      "Stöbern Sie in unserem Kurskatalog und entdecken Sie Aktivitäten, die begeistern. Der Buchungsvorgang ist mit zwei Klicks erledigt. Am Tag Ihrer Aktivität erscheinen Sie einfach vor Ort, wo Anbieterin oder Anbieter Sie herzlich willkommen heißen!",
    link: {
      href: "/kurskatalog",
      label: "Kurskatalog einsehen",
    },
  },
  {
    icon: 3,
    title: "Weiter geht's",
    src: highFive2,
    alt: "High five!",
    content:
      "Wenn Sie weitere Kurse oder Klassen besuchen möchten, dann wählen Sie einfach zwischen unseren monatlich kündbaren Spar-Abos oder unseren superflexiblen 5er- / 10er-Karten.",
    link: {
      href: "/preise",
      label: "Preise einsehen",
    },
  },
];

export default function LandingList() {
  return (
    <Box
      component="section"
      sx={{
        backgroundImage: gradientBackground,
        backgroundBlendMode: "multiply",
        width: "100%",
      }}
    >
      <Container maxWidth={false}>
        <Stack
          sx={{
            py: 15,
            px: { xs: 0, md: 7 },
            alignItems: "center",
          }}
        >
          <SectionTitle
            id="wie-funktioniert-es"
            title="Wie funktioniert Figo?"
            description={
              <span>
                In 3 einfachen Schritten können Sie das gesamte Angebot von Figo
                nutzen! So geht&apos;s:
              </span>
            }
          />
          <Container maxWidth="md" disableGutters>
            {STEPS.map((step, index) => (
              <Stack
                key={index}
                direction={{
                  xs: "column",
                  md: (index + 1) % 2 === 0 ? "row-reverse" : "row",
                }}
                spacing={{ xs: 7.5, md: 15 }}
                sx={{
                  alignItems: "center",
                  py: { xs: 10, md: 17.5 },
                  px: { xs: 0, md: 0 },
                }}
              >
                <Image
                  alt={step.alt}
                  src={step.src}
                  style={{ width: 300, height: 300 }}
                />
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={2.5}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <StepIcon icon={step.icon} />
                    <Typography
                      gutterBottom
                      component="h3"
                      sx={{
                        fontSize: 32,
                        lineHeight: "34px",
                        fontWeight: 700,
                        fontFamily: arima.style.fontFamily,
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Stack>
                  <Stack
                    spacing={5}
                    sx={{
                      alignItems: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Typography
                      variant="bodyLarge"
                      component="p"
                      sx={{
                        color: "grey.900",
                        textAlign: "left",
                      }}
                    >
                      {step.content}
                    </Typography>
                    <Link
                      href={step.link.href}
                      component={NextLink}
                      underline="always"
                      sx={{
                        fontWeight: 700,
                        fontSize: 22,
                        lineHeight: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {step.link.label}
                      <ArrowForwardIosRounded />
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Container>
          <Box>
            <CTAButton
              href="/registrieren"
              label="Registrieren und Schnupperkurs erhalten"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
