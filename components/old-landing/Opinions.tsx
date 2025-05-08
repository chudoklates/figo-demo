import { Container, Stack } from "@mui/material";
import { SectionTitle } from "./components";
import Testimonials from "./components/Testimonials";

export default function Opinions() {
  return (
    <Container maxWidth={false} disableGutters component="section">
      <Stack
        spacing={6.25}
        sx={{
          py: 12.5,
          alignItems: "center",

          background:
            "linear-gradient(180deg, rgba(251,146,102,1) 0%, rgba(251,146,102,1) 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%);",
        }}
      >
        <Container maxWidth="md">
          <SectionTitle
            id="opinions"
            title="Stimmen aus der Figo-Community"
            description="Sehen Sie hier, was einige unserer Kundinnen und Kunden über die Kurse, die bei Figo angeboten werden, denken"
          />
        </Container>
        <Container maxWidth="lg" disableGutters>
          <Testimonials />
        </Container>
      </Stack>
    </Container>
  );
}
