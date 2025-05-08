import { NavBar, PageContainer } from "@/components";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nicht gefunden",
  description:
    "Bleiben Sie auf dem Laufenden! Bald startet Figo Social mit aufregenden Aktivitäten und Kursen. Seien Sie einer der Ersten, die davon erfahren.",
};

export default function NotFoundPage() {
  return (
    <React.Fragment>
      <NavBar transparent />
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
            pt: 0,
            pb: 0,
            minHeight: "unset",
          },
        }}
      >
        <Container
          maxWidth="md"
          component={Stack}
          display="flex !important"
          alignItems="center"
          textAlign="center"
          justifyContent="space-between"
          minHeight="100vh"
          pt="15vh"
          pb="15vh"
        >
          <Stack
            sx={{
              pt: { xs: "30px", sm: "20vh" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 56,
                lineHeight: "66px",
                fontWeight: 600,
              }}
            >
              Nicht gefunden
            </Typography>
            <Typography
              variant="h3"
              component="p"
              sx={{
                fontSize: 24,
                lineHeight: "34px",
                fontWeight: 400,
              }}
            >
              Wir arbeiten derzeit hart daran, ein außergewöhnliches Erlebnis zu
              schaffen
            </Typography>
          </Stack>
        </Container>
      </PageContainer>
    </React.Fragment>
  );
}
