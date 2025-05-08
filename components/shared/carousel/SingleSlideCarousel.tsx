"use client";

import { RefObject, PropsWithChildren } from "react";
import Carousel, { Settings } from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SingleSlideCarousel({
  sliderRef,
  setSlideIndex,
  children,
  ...overrides
}: {
  sliderRef?: RefObject<Carousel | null>;
  setSlideIndex?: (next: number) => void;
} & PropsWithChildren &
  Settings) {
  return (
    <Carousel
      slidesToShow={1}
      slidesToScroll={1}
      speed={300}
      beforeChange={(_current, next) => setSlideIndex?.(next)}
      ref={(slider) => {
        if (sliderRef) sliderRef.current = slider;
      }}
      arrows={false}
      {...overrides}
    >
      {children}
    </Carousel>
  );
}
