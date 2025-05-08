import { PageContainer, ProfileEditSection } from "@/components";
import { PageHeading } from "@/components/shared/general";
import {
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";

export default function AccountPrivacy() {
  return (
    <PageContainer
      containerOverrides={{ maxWidth: "md" }}
      boxOverrides={{ sx: { pt: 12 } }}
    >
      <Stack spacing={2}>
        <PageHeading title="Privatsphäre" />
        <ProfileEditSection
          controlElement={
            <Switch
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          description="Privatkonto"
          heading="Wer kann Ihre Inhalte sehen?"
        >
          <Typography color="textSecondary">
            Wenn Ihr Konto öffentlich ist, können Ihr vollständiges Profil und
            Ihre Aktivitäten von jedem gesehen werden.
          </Typography>
          <Typography color="textSecondary">
            Wenn Ihr Konto privat ist, können nur die Freunde, denen Sie
            zustimmen, sehen, welche Aktivitäten Sie besuchen.
          </Typography>
        </ProfileEditSection>
        <ProfileEditSection
          controlElement={
            <Select sx={{ maxWidth: 300 }} fullWidth>
              <MenuItem value="Nur Veranstalter">Nur Veranstalter</MenuItem>
            </Select>
          }
          description="Wer kann Sie auf Figo kontaktieren?"
          heading="Kontakte"
        />
        <ProfileEditSection
          controlElement={
            <Select sx={{ maxWidth: 300 }} fullWidth>
              <MenuItem value="Veranstalter und Freunde">
                Veranstalter und Freunde
              </MenuItem>
            </Select>
          }
          description="Wer kann Ihre zukünftige Aktivitäten sehen?"
          heading="Ihre Aktivitäten"
        />
        <ProfileEditSection
          description="Hier können Sie kontrollieren, was andere Leute auf Ihrem veröffentlichen Profile sehen können."
          heading="Profil bearbeiten"
        >
          <Link
            href="/app/profile"
            color="primary"
            component={NextLink}
            sx={{ textDecoration: "underline" }}
          >
            Profil bearbeiten
          </Link>
        </ProfileEditSection>
      </Stack>
    </PageContainer>
  );
}
