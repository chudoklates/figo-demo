import { PageContainer } from "@/components";
import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Einloggen",
  description: "Einloggen in Ihr Figo-Konto",
};

export default async function Login(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirect = searchParams?.to || "";
  const query = searchParams?.query || "";

  return (
    <PageContainer containerOverrides={{ maxWidth: "sm" }}>
      <Stack spacing={4}>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Image src="/figo-circle.svg" alt="Logo" width={45} height={45} />
          <Typography variant="h3">Einloggen</Typography>
        </Stack>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          Noch kein Konto?{" "}
          <Link href="/registrieren" component={NextLink}>
            Registrieren
          </Link>
        </Typography>
        <LoginForm redirect={redirect} query={query} />
        <Typography>
          Passwort vergessen?{" "}
          <Link href="/passwort-vergessen" component={NextLink}>
            Klicken Sie hier!
          </Link>
        </Typography>
      </Stack>
    </PageContainer>
  );
}
