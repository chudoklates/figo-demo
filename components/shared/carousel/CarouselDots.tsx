"use client";

import React from "react";
import {
  Container,
  IconButton,
  Stack,
  Step,
  Stepper,
  styled,
} from "@mui/material";
import type Slider from "@ant-design/react-slick";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

const StyledStepper = styled(Stepper)(({ theme, activeStep }) => ({
  "& .MuiStep-root": {
    paddingLeft: 8,
    paddingRight: 8,
    height: 15,
    width: 15,
    opacity: 0.4,
    cursor: "pointer",
  },
  [`& .MuiStep-root:nth-child(${(activeStep || 0) + 1})`]: {
    opacity: 1,
  },
}));

export default function CarouselDots({
  slideIndex,
  steps = [],
  sliderRef,
  hideArrows,
}: {
  slideIndex: number;
  steps: any[];
  sliderRef: React.RefObject<Slider | null>;
  hideArrows?: boolean;
}) {
  return (
    <Container>
      <Stack
        direction="row"
        spacing={5}
        sx={{
          justifyContent: hideArrows
            ? "center"
            : { xs: "space-between", sm: "center" },
          alignItems: "center",
          color: "white",
        }}
      >
        {!hideArrows && (
          <IconButton
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Zurück"
            color="secondary"
            sx={{
              bgcolor: "white",
              "&:hover": { bgcolor: "white", opacity: 0.7 },
            }}
          >
            <ArrowBackIosNewRounded />
          </IconButton>
        )}
        <StyledStepper
          nonLinear
          activeStep={slideIndex}
          connector={null}
          sx={{ display: { xs: "flex", lg: "none" } }}
        >
          {steps.map((_, i) => (
            <Step key={i} onClick={() => sliderRef.current?.slickGoTo(i)} />
          ))}
        </StyledStepper>
        {!hideArrows && (
          <IconButton
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Weiter"
            color="secondary"
            sx={{
              bgcolor: "white",
              "&:hover": { bgcolor: "white", opacity: 0.7 },
            }}
          >
            <ArrowForwardIosRounded />
          </IconButton>
        )}
      </Stack>
    </Container>
  );
}
