"use client";

import { ComponentTestimonialsSection } from "@/api/types/cms";
import { Box, Container, Grid2, Paper, Stack, Typography } from "@mui/material";
import type { Testimonial } from "@/api/types/cms";
import { RichText } from "../cms/RichText";
import { CarouselDots, NextImageAvatar, SingleSlideCarousel } from "../shared";
import CTA from "./components/CTA";
import { useRef, useState } from "react";
import Slider from "@ant-design/react-slick";

const WHATSAPP_BACKGROUND = `url(/whatsapp-bg.webp) black 0% 0% / 612px repeat`;

export default function Testimonials({
  title,
  simpleSubtitle: subtitle,
  testimonialsCollection,
  cta,
}: ComponentTestimonialsSection) {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  return (
    <Stack
      spacing={5}
      sx={{
        background: WHATSAPP_BACKGROUND,
        py: 10,
        position: "relative",
        alignItems: "center",
      }}
    >
      <Container>
        <Stack spacing={2.5} sx={{ color: "white", textAlign: "center" }}>
          <Typography variant="h2" sx={{ color: "inherit" }}>
            {title}
          </Typography>
          <Typography variant="bodyLarge">{subtitle}</Typography>
        </Stack>
      </Container>
      <Stack
        spacing={5}
        sx={{
          display: { xs: "flex", md: "none" },
          maxWidth: "100%",
        }}
      >
        <Box>
          <SingleSlideCarousel
            sliderRef={sliderRef}
            setSlideIndex={setSlideIndex}
            centerPadding="20px"
            centerMode
          >
            {testimonialsCollection.items.map((testimonial) => (
              <Box key={testimonial.sys.id} sx={{ pr: 2 }}>
                <TestimonialItem {...testimonial} />
              </Box>
            ))}
          </SingleSlideCarousel>
        </Box>
        <CarouselDots
          slideIndex={slideIndex}
          steps={testimonialsCollection.items}
          sliderRef={sliderRef}
          hideArrows
        />
      </Stack>
      <Container component={Stack} sx={{ alignItems: "center" }}>
        <Box sx={{ display: { xs: "none", md: "block" }, mb: 5 }}>
          <Grid2 container columnSpacing={2.5} rowSpacing={2.5}>
            {testimonialsCollection.items.map((testimonial) => (
              <Grid2
                key={testimonial.sys.id}
                size={{ xs: 12, md: testimonial.nOfColumns || 6 }}
              >
                <TestimonialItem {...testimonial} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
        <CTA {...cta} />
      </Container>
    </Stack>
  );
}

function TestimonialItem({ content, author }: Testimonial) {
  return (
    <Paper
      variant="outlined"
      component={Stack}
      spacing={2.5}
      sx={{
        p: 3.125,
        height: { xs: 540, ss: 450, sm: 330, md: "100%" },
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <Stack
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          flexGrow: 1,
        }}
      >
        <RichText content={content} />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <NextImageAvatar
          src={author.avatar.url}
          alt={author.name}
          sx={{ width: 44, height: 44 }}
          contentful
        />
        <Box>
          <Typography sx={{ lineHeight: "18px", fontWeight: 500 }}>
            {author.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: "26px" }}>
            {author.position}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
