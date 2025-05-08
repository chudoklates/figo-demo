import { PageContainer } from "@/components";
import { Stack, Typography } from "@mui/material";
import InterestsForm from "./components/InterestsForm";
import { PageHeading } from "@/components/shared/general";

export default function Interests() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "md" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
    >
      <PageHeading title="Interessen" />
      <Stack spacing={{ xs: 4, md: 2 }}>
        <Typography
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Helfen Sie uns, Ihre Top Empfehlungen zu finden!
        </Typography>
        <InterestsForm />
      </Stack>
    </PageContainer>
  );
}
