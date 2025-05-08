"use client";

import { Box, Stack, useMediaQuery } from "@mui/material";
import { CarouselDots, SingleSlideCarousel } from "@/components/shared";
import React, { useEffect, useRef, useState } from "react";
import Testimonial from "./Testimonial";
import Slider from "@ant-design/react-slick";

const ITEMS = [
  {
    sources: [
      {
        src: "yoga-testimonial-1.webm",
        type: "video/webm",
      },
      {
        src: "yoga-testimonial-1.mp4",
        type: "video/mp4",
      },
    ],
    quote:
      "„Ich mag die sanften Übungen und wie entspannt ich mich danach fühle.“",
    name: "Susanne, 49",
    subtitle: "Interessiert an Yoga, Tai Chi und Pilates",
  },
  {
    sources: [
      {
        src: "yoga-testimonial-2.webm",
        type: "video/webm",
      },
      {
        src: "yoga-testimonial-2.mp4",
        type: "video/mp4",
      },
    ],
    quote: "„Die Lehrer gehen individuell auf die Kursteilnehmer ein.”",
    name: "Claudia, 59",
    subtitle: "Interessiert an Malerei, Yoga und Qigong",
  },
  {
    sources: [
      {
        src: "yoga-testimonial-3.webm",
        type: "video/webm",
      },
      {
        src: "yoga-testimonial-3.mp4",
        type: "video/mp4",
      },
    ],
    quote: "„Yoga hat mir körperliche und mentale Gesundheit gegeben.“",
    name: "Andreas, 61",
    subtitle: "Interessiert an Wirbelsäulengymnastik, Yoga und Atemübungen",
  },
];

export default function Testimonials() {
  const isCarousel = useMediaQuery("@media (max-width: 1163px)");
  const sliderRef = useRef<Slider | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSlideIndex(0);
      sliderRef.current.slickGoTo(0);
    }
  }, [isCarousel, sliderRef]);

  return (
    <Stack>
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          mb: 3.75,
        }}
      >
        <CarouselDots
          slideIndex={slideIndex}
          steps={ITEMS}
          sliderRef={sliderRef}
        />
      </Box>
      <SingleSlideCarousel
        sliderRef={sliderRef}
        setSlideIndex={setSlideIndex}
        centerMode={false}
        slidesToShow={3}
        draggable={false}
        swipe={false}
        responsive={[
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "20px",
              draggable: true,
              swipe: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              variableWidth: true,
              centerMode: true,
              centerPadding: "40px",
              draggable: true,
              swipe: true,
            },
          },
          {
            breakpoint: 1163,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              variableWidth: true,
              draggable: true,
              swipe: true,
            },
          },
        ]}
      >
        {ITEMS.map((item, index) => (
          <Testimonial key={index} item={item} />
        ))}
      </SingleSlideCarousel>
    </Stack>
  );
}
