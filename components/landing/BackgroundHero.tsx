import { Container, Stack, Typography } from "@mui/material";
import heroBackground from "@/public/hero-background.webp";
import Image from "next/image";
import { ComponentBackgroundHero } from "@/api/types/cms";
import { RichText } from "../cms/RichText";
import CTA from "./components/CTA";

export default function BackgroundHero({
  titleLine1,
  titleLine2,
  subtitle,
  cta,
}: ComponentBackgroundHero) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "auto", md: "max(calc(100vh - 66px), 800px)" },
        py: { xs: "222px", md: 0 },
        position: "relative",
        textAlign: "center",
      }}
    >
      <Image
        src={heroBackground}
        fill
        priority
        alt=""
        style={{ objectFit: "cover", zIndex: -1 }}
        sizes="3840px"
      />
      <Container maxWidth={false} sx={{ maxWidth: 650 }}>
        <Typography
          variant="h0"
          gutterBottom
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Typography
            variant="inherit"
            component="span"
            sx={{ color: "primary.main" }}
          >
            {titleLine1}
          </Typography>
          <br /> {titleLine2}
        </Typography>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Typography
            variant="inherit"
            component="span"
            sx={{ color: "primary.main" }}
          >
            {titleLine1}
          </Typography>
          <br /> {titleLine2}
        </Typography>
        <RichText content={subtitle} />
        <CTA {...cta} />
      </Container>
    </Stack>
  );
}
