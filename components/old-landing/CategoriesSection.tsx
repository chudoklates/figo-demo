import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SectionTitle } from "./components";
import CategoryCard from "./components/CategoryCard";

import pilates from "@/public/category-pilates.webp";
import yoga from "@/public/category-yoga.webp";
import qigong from "@/public/landing-pages/tanzen/egnoka-qigong.webp";
import yogaLadies from "@/public/landing-pages/yoga/yoga-ladies.webp";
import drawing from "@/public/category-drawing.webp";
import watercolor from "@/public/landing-pages/kunst/watercolor.webp";
import taiChi from "@/public/category-tai-chi.webp";
import allCategories from "@/public/all-categories.webp";

const CATEGORIES = [
  {
    category: "Pilates",
    background: pilates,
    href: '/kurskatalog?categories=["pilates"]',
  },
  {
    category: "Yoga",
    background: yoga,
    href: '/kurskatalog?categories=["yoga"]',
  },
  {
    category: "Qi Gong",
    background: qigong,
    href: '/kurskatalog?categories=["qigong"]',
  },
  {
    category: "Bewegungskurse",
    background: yogaLadies,
    href: '/kurskatalog?categories=["cantienica"]',
  },
  {
    category: "Zeichnen",
    background: drawing,
    href: '/kurskatalog?categories=["drawing"]',
  },
  {
    category: "Malen",
    background: watercolor,
    href: '/kurskatalog?categories=["painting"]',
  },
  {
    category: "Tai Chi",
    background: taiChi,
    href: '/kurskatalog?categories=["tai_chi"]',
  },
  {
    category: "Alle Kategorien einsehen",
    background: allCategories,
    href: "/kurskatalog",
  },
];

export default function CategoriesSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        bgcolor: "beige.main",
      }}
    >
      <Container component={Stack} maxWidth="xl" spacing={6.25}>
        <SectionTitle
          id="categories"
          title={
            <React.Fragment>
              Stöbern Sie durch unser Freizeitangebot
              <br /> und lassen{" "}
              <Typography
                variant="inherit"
                component="span"
                sx={{
                  color: "primary.main",
                }}
              >
                Sie sich inspirieren.
              </Typography>
            </React.Fragment>
          }
          description="Entdecken Sie zahlreiche Aktivitäten in Ihrer Nähe."
        />
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: 2.5,
            justifyContent: "center",
          }}
        >
          {CATEGORIES.map((item, index) => (
            <CategoryCard key={index} {...item} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
