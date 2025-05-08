import { EmptyState, PageContainer } from "@/components";
import { PageHeading } from "@/components/shared/general";
import flyingTogether from "@/public/flying-together.webp";

export default function Friends() {
  return (
    <PageContainer
      boxOverrides={{
        sx: {
          pt: 12,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        },
      }}
      containerOverrides={{ maxWidth: "xl" }}
    >
      <PageHeading title="Freunde" />
      <EmptyState
        imgSrc={flyingTogether}
        imgAlt="Flying together"
        title="Jetzt anfangen und Freunde einladen"
        description="Nachdem die Verbindungen hergestellt sind, werden sie hier angezeigt."
        buttonText="Freunde Einladen"
        href="/app/invite-friends"
      />
    </PageContainer>
  );
}
