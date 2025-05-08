import { PageContainer } from "@/components";
import { PageHeading } from "@/components/shared/general";
import AccountSettingsForm from "./components/AccountSettingsForm";

export default function AccountSettings() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "lg" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}
    >
      <PageHeading title="Einstellungen" />
      <AccountSettingsForm />
    </PageContainer>
  );
}
