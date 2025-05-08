import { PageContainer } from "@/components";
import SetupForm from "./components/SetupForm";
import { PageHeading } from "@/components/shared/general";

export default function UpdatePayment() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "md" }}
      boxOverrides={{ sx: { pt: { xs: 4, md: 9, lg: 12 } } }}
    >
      <PageHeading title="Zahlungsmethode aktualisieren" />
      <SetupForm />
    </PageContainer>
  );
}
