import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SectionTitle from "./components/SectionTitle";

import aboutUs from "@/public/about-us.webp";
import CTAButton from "./components/CTAButton";

export default function AboutUs() {
  return (
    <Container maxWidth={false} disableGutters component="section">
      <Stack
        spacing={4}
        sx={{
          overflow: "hidden",
          position: "relative",
          bgcolor: "grey.400",
          py: 8,
        }}
      >
        <SectionTitle id="ueber-uns" title="Wer sind wir?" />
        <Stack
          spacing={{ xs: 4, md: 12 }}
          direction={{ xs: "column", md: "row" }}
          sx={{
            pt: { xs: 0, md: 12 },
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            minHeight: "inherit",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: 400 },
              height: { xs: 232, md: 396.715 },
              position: "relative",
            }}
          >
            <Image
              alt="Clara & Yannick"
              src={aboutUs}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 499px) 100vw, 400px"
            />
          </Box>
          <Stack
            sx={{
              justifyContent: "center",
              textAlign: { xs: "center", md: "left" },
              pb: { xs: 8, md: 0 },
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                }}
              >
                Hallo!
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  pb: 2,
                  fontWeight: 400,
                }}
              >
                Wir sind Clara und Yannick und haben Figo mit Blick auf unsere
                Eltern und deren Freunde ins Leben gerufen - eine bunte Gruppe
                Teil der 50plus-Generation.
                <br />
                Menschen mit einer kreativen Ader, Sportbegeisterte, Neugierige,
                die gerne ihre Freizeit aktiv genießen und Wert auf einen
                gesunden Geist und Körper legen. Mit Figo möchten wir
                sicherstellen, dass dies für jeden einfach zu erleben und
                zugleich erschwinglich ist.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                }}
              >
                Klingt interessant? Haben Sie Fragen?
              </Typography>
              <CTAButton
                href="/kontakt"
                label="Kontaktieren Sie uns"
                sx={{ mt: { xs: 5, lg: 10 } }}
              />
            </Container>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
