import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import egnokaBow from "@/public/egnoka-bow.webp";
import paintingTable from "@/public/painting-table.webp";
import paintingClass from "@/public/painting-class.webp";
import upwardSalute from "@/public/upward-salute.webp";
import treePose from "@/public/tree-pose.webp";
import danceClass from "@/public/dance-class.webp";
import CTAButton from "./components/CTAButton";
import ImageCarousel from "./components/ImageCarousel";
import React from "react";
import { arima } from "@/theme/fonts";
import { ArrowForwardIosRounded } from "@mui/icons-material";

const IMAGES = [
  {
    src: paintingTable,
    alt: "Malen",
  },
  {
    src: treePose,
    alt: "Yoga",
  },
  {
    src: danceClass,
    alt: "Tanzkurs",
  },
  {
    src: upwardSalute,
    alt: "Yoga",
  },
  {
    src: egnokaBow,
    alt: "QiGong",
  },
  {
    src: paintingClass,
    alt: "Malen",
  },
];

const defaultTitle = (
  <React.Fragment>
    Mit Figo{" "}
    <Typography
      variant="inherit"
      component="span"
      sx={{
        color: "primary.main",
        fontWeight: 700,
      }}
    >
      bewegen, gestalten und Neues lernen.
    </Typography>
  </React.Fragment>
);

export default function BackgroundSection({
  title = defaultTitle,
  description = "Mit Figo können Sie Ihre Freizeit aktiv und abwechslungsreich gestalten. Bei uns finden Sie Kurse und Aktivitäten, die Körper und Geist ansprechen.",
  cta = { label: "Kurskatalog einsehen", href: "/kurskatalog" },
  images = IMAGES,
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      component="section"
      spacing={{ xs: 0, md: "25px" }}
      sx={{
        mt: { xs: 0, md: "25px" },
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          borderRadius: { xs: "none", md: "0 20px 20px 0" },
          overflow: "hidden",
        }}
      >
        <ImageCarousel>
          {images.slice(0, 4).map((image, index) => (
            <Box
              key={index}
              sx={{
                height: { xs: 360, md: 800 },
                display: "block !important",
              }}
            >
              <Image
                alt={image.alt}
                src={image.src}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
          ))}
        </ImageCarousel>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "beige.main",
          borderRadius: { xs: "none", md: "20px 0 0 20px" },
        }}
      >
        <Stack
          spacing={{ xs: 5, md: 10 }}
          sx={{
            px: { xs: 2, md: 6 },
            py: { xs: 6, md: 7.5 },
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            height: "100%",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <Stack spacing={{ xs: 1, md: 4 }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: arima.style.fontFamily,
                wordWrap: "break-word",
                fontSize: { xs: 40, md: 52 },
                lineHeight: { xs: "50px", md: "60px" },
              }}
            >
              {title}
            </Typography>
            <Typography variant="bodyLarge" component="p">
              {description}
            </Typography>
          </Stack>
          <CTAButton
            color="primary"
            fullWidth
            href={cta.href}
            label={cta.label}
            endIcon={<ArrowForwardIosRounded />}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
