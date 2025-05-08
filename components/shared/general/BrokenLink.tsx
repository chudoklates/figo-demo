import { PageContainer } from "@/components/layout";
import { Link } from "@mui/material";
import NextLink from "next/link";
import ErrorPage from "./ErrorPage";

export default function BrokenLink({ errorCode }: { errorCode?: string }) {
  const message =
    errorCode === "expired" ? (
      <>
        Der Link, den Sie verwenden wollten, ist nicht mehr gültig.
        <br /> Wenn Sie sich nicht mehr an Ihr Passwort erinnern können,
        benutzen Sie bitte das{" "}
        <Link component={NextLink} href="/passwort-vergessen">
          &quot;Passwort vergessen&quot; Formular
        </Link>
        .
      </>
    ) : (
      <>
        Bei dem Link, den Sie für die Bestätigung Ihres Kontos verwenden, ist
        ein Fehler aufgetreten.
        <br /> Bitte überprüfen Sie noch einmal, ob Sie den richtigen Link aus
        der E-Mail verwenden.
      </>
    );

  return (
    <PageContainer>
      <ErrorPage>{message}</ErrorPage>
    </PageContainer>
  );
}
