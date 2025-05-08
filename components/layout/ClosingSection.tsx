import { Container, Grid2 } from "@mui/material";
import DarkBackgroundStrip from "./components/DarkBackgroundStrip";
import { NewsletterSignup } from "../newsletter";
import Socials from "./components/Socials";

export default function ClosingSection() {
  return (
    <Grid2 container component="section">
      <Grid2 size={{ xs: 12, lg: 8 }} sx={{ bgcolor: "beige.main", py: 7.5 }}>
        <Container maxWidth="sm">
          <NewsletterSignup />
        </Container>
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 4 }}>
        <DarkBackgroundStrip>
          <Socials />
        </DarkBackgroundStrip>
      </Grid2>
    </Grid2>
  );
}
