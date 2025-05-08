import { CircularProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";

import peopleReading from "@/public/people-reading.webp";
import { PageContainer } from "@/components";
import { redirect, RedirectType } from "next/navigation";
import TimedRedirect from "./components/TimedRedirect";

export default async function OnboardingLoading(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const checkoutSessionId = searchParams.session_id;

  if (!checkoutSessionId) {
    redirect("/app/dashboard", RedirectType.replace);
  }

  return (
    <PageContainer containerOverrides={{ maxWidth: "xl" }}>
      <TimedRedirect />
      <Stack
        spacing={4}
        sx={{
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Image
          alt="Leute lesen"
          src={peopleReading}
          style={{ width: 400, height: 266 }}
        />
        <Typography variant="h4">Wir richten Ihr Konto ein</Typography>
        <Typography>dies kann einige Sekunden dauern</Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" size={34} />
          <Typography>einen Augenblick Geduld bitte...</Typography>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
