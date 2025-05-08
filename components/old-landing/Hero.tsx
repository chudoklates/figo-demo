import React from "react";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Container, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import taiChi from "@/public/tai-chi.webp";
import CTAButton from "./components/CTAButton";

const TEXT_SHADOW =
  "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)";

const defaultTitle = (
  <React.Fragment>
    Berlins spannendste Kurse,{" "}
    <Typography
      variant="inherit"
      component="span"
      sx={{
        color: "secondary.main",
      }}
    >
      einfach gebucht
    </Typography>
  </React.Fragment>
);

export default function Hero({
  title = defaultTitle,
  subtitle = "Für ein aktives, glückliches Leben in Ihrem Kiez",
  image = taiChi,
  cta = { label: "Jetzt kostenlos ausprobieren", href: "/registrieren" },
}) {
  return (
    <Grid2
      container
      wrap="wrap-reverse"
      component="section"
      sx={{
        position: "relative",
      }}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="2125px"
        style={{ objectFit: "cover", zIndex: -1, transform: "scaleX(-1)" }}
        quality={100}
        priority // Reserved for LCP image
      />
      <Grid2
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Container>
          <Stack
            sx={{
              textAlign: "left",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
              width: { xs: "100%", lg: 600 },
              pl: { xs: 0, md: 3, lg: 13 },
              pb: 9,
              pt: { xs: 0, md: 16 },
            }}
          >
            <Typography
              variant="h0"
              component="h1"
              color="white"
              sx={{
                textShadow: TEXT_SHADOW,
              }}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              component="h2"
              color="white"
              sx={{
                fontSize: { xs: 28, md: 32 },
                lineHeight: { xs: "36px", md: "42px" },
                fontWeight: 700,
                textShadow: TEXT_SHADOW,
              }}
            >
              {subtitle}
            </Typography>
            <CTAButton
              href={cta.href}
              label={cta.label}
              endIcon={<ArrowForwardIosRounded />}
              sx={{ mt: 4 }}
            />
          </Stack>
        </Container>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 6,
        }}
        sx={{
          minHeight: "calc(min(185px, 185px - (800px - 100vh)))",
        }}
      />
    </Grid2>
  );
}
