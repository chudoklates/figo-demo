"use client";

import { PropsWithChildren } from "react";
import Carousel from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageCarousel({ children }: PropsWithChildren) {
  return (
    <Carousel
      autoplay
      autoplaySpeed={3000}
      slidesToShow={1}
      slidesToScroll={1}
      infinite
      dots={false}
      arrows={false}
      swipe={false}
    >
      {children}
    </Carousel>
  );
}
