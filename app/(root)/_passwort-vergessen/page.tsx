import { PageContainer } from "@/components";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import SuccessPage from "./components/SuccessPage";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passwort vergessen",
};

export default async function ForgotPassword(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  if (searchParams?.sent) {
    return <SuccessPage email={searchParams.email} />;
  }

  return (
    <PageContainer containerOverrides={{ maxWidth: "sm" }}>
      <Stack spacing={4}>
        <Button
          href="/einloggen"
          LinkComponent={NextLink}
          variant="text"
          sx={{ color: "grey.800", alignSelf: "flex-start" }}
          startIcon={<ArrowBackIosNewRounded />}
        >
          Zurück zum Login
        </Button>
        <Box>
          <Typography variant="h3" gutterBottom>
            Passwort vergessen
          </Typography>
          <Typography
            sx={{
              color: "grey.700",
            }}
          >
            Geben Sie Ihre registrierte E-Mail-Adresse ein und wir senden Ihnen
            Anweisungen zum Zurücksetzen.
          </Typography>
        </Box>

        <ForgotPasswordForm />
      </Stack>
    </PageContainer>
  );
}
