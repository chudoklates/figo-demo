import { PageContainer } from "@/components";
import { PageHeading } from "@/components/shared/general";
import { Stack } from "@mui/material";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ProfileImageUpload from "./components/ProfileImageUpload";

export default function PersonalInfo() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "sm" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
    >
      <Stack spacing={2}>
        <PageHeading title="Persönliche Informationen" />
        <ProfileImageUpload />
        <PersonalInfoForm />
      </Stack>
    </PageContainer>
  );
}
