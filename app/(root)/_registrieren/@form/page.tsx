import React from "react";

import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";

import NextLink from "next/link";
import Image from "next/image";

import { RegistrationForm } from "@/components";
import { PageContainer } from "@/components";

import register from "@/public/register.webp";
import { Box, Divider } from "@mui/material";

export default function Form() {
  return (
    <PageContainer
      containerOverrides={{
        disableGutters: true,
        maxWidth: false,
        sx: { position: "relative" }, // to align Image
      }}
      boxOverrides={{
        sx: {
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.50) 23.89%, rgba(0, 0, 0, 0.00) 67.03%);",
          pt: 0,
          pb: 0,
        },
      }}
    >
      <Image
        alt="Frauen mittleren Alters im Yoga-Kurs"
        src={register}
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      <Grid2
        container
        direction="row"
        sx={{
          minHeight: "inherit",
        }}
      >
        <Grid2
          sx={{
            pl: { xs: 0, lg: 5 },
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{
            lg: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              component="p"
              color="white"
              sx={{
                mb: 2,
              }}
            >
              ERSTE AKTIVITÄT KOSTENLOS
            </Typography>
            <Divider
              sx={{
                borderColor: "white",
                borderBottomWidth: "6px",
                width: "105px",
              }}
            />
            <Typography
              variant="h3"
              color="white"
              sx={{
                fontWeight: 400,
                mt: 2,
              }}
            >
              Wählen Sie eine beliebige Aktivität für Ihren Schnupperkurs.
            </Typography>
          </Container>
        </Grid2>
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Container
            maxWidth={false}
            disableGutters
            component={Box}
            bgcolor="white"
            width={{ xs: "100%", sm: 550 }}
            borderRadius={{ xs: 0, sm: 5 }}
            pt={{ xs: "58px", sm: 0 }}
            pb={{ xs: 4, sm: 0 }}
            mt={{ xs: 0, sm: 12 }}
            mb={{ xs: 0, sm: 5 }}
          >
            <Box
              sx={{
                display: { xs: "block", lg: "none" },
                py: 1.25,
                px: 2.5,
                bgcolor: "secondary.lighter",
                borderTopLeftRadius: { xs: 0, sm: 20 },
                borderTopRightRadius: { xs: 0, sm: 20 },
              }}
            >
              <Typography
                variant="h6"
                component="p"
                color="secondary"
                sx={{
                  mb: 1,
                }}
              >
                ERSTE AKTIVITÄT KOSTENLOS
              </Typography>
              <Typography
                sx={{
                  lineHeight: "22px",
                  color: "grey.800",
                }}
              >
                Wählen Sie eine beliebige Aktivität für Ihren Schnupperkurs.
              </Typography>
            </Box>
            <Stack
              spacing={4}
              sx={{
                py: { xs: 4, lg: 7.5 },
                px: { xs: 2.5, sm: 4.5 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "start" },
                  gap: 2,

                  "& img": {
                    display: { xs: "block", lg: "none" },
                  },
                }}
              >
                <Image
                  src="/figo-circle.svg"
                  alt="logo"
                  width={37}
                  height={37}
                />
                Konto erstellen
              </Typography>
              <Typography
                align="center"
                sx={{
                  display: { xs: "block", lg: "none" },
                }}
              >
                Sie haben bereits ein Konto?{" "}
                <Link component={NextLink} href="/einloggen">
                  Einloggen
                </Link>
              </Typography>
              {/* <Stack direction="row" spacing={3}>
                <Button variant="white" size="large" fullWidth>
                  <GoogleIcon />
                  Sign in with Google
                </Button>
                <Button variant="white" size="large" fullWidth>
                  <FacebookIcon />
                  Sign in with Facebook
                </Button>
              </Stack>
              <Divider
                sx={{
                  ":before": {
                    border: "none",
                    height: 2,
                    background: `linear-gradient(270deg, ${GRADIENT})`,
                  },
                  ":after": {
                    border: "none",
                    height: 2,
                    background: `linear-gradient(90deg, ${GRADIENT})`,
                  },
                }}
              >
                <Typography component="span" variant="subtitle1">
                  or Sign up with your email
                </Typography>
              </Divider> */}
              <RegistrationForm />
              <Typography
                align="center"
                sx={{
                  display: { xs: "none", lg: "block" },
                  textAlign: "left",
                }}
              >
                Sie haben bereits ein Konto?{" "}
                <Link component={NextLink} href="/einloggen">
                  Einloggen
                </Link>
              </Typography>
            </Stack>
          </Container>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
