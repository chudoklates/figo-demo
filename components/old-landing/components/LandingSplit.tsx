"use client";

import { Box, Stack } from "@mui/material";
import LandingItem from "./LandingItem";
import React, { useRef, useState } from "react";
import { LandingItemProps } from "../types";
import { CarouselDots, SingleSlideCarousel } from "@/components/shared";
import Slider from "@ant-design/react-slick";

type LandingSplitProps = {
  items: LandingItemProps[];
};

export default function LandingSplit({ items }: LandingSplitProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  return (
    <React.Fragment>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          justifyContent: "center",
          textAlign: "center",
          display: { xs: "none", md: "flex" },
        }}
      >
        {items.map((item) => (
          <LandingItem key={item.title} {...item} />
        ))}
      </Stack>
      <Stack
        spacing={5}
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <Box>
          <SingleSlideCarousel
            sliderRef={sliderRef}
            setSlideIndex={setSlideIndex}
          >
            {items.map((item) => (
              <LandingItem key={item.title} {...item} />
            ))}
          </SingleSlideCarousel>
        </Box>
        <CarouselDots
          slideIndex={slideIndex}
          steps={items}
          sliderRef={sliderRef}
        />
      </Stack>
    </React.Fragment>
  );
}
