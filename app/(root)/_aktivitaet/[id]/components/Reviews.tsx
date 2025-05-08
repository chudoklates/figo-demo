"use client";

import React, { Suspense, useRef, useState } from "react";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Step,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import type Slider from "@ant-design/react-slick";
import { SingleSlideCarousel } from "@/components";
import GoogleReviewBox from "./GoogleReviewBox";
import ReviewBox from "./ReviewBox";
import { ReviewsProps } from "../types";
import usePlace from "../hooks/usePlace";

const PlaceProvider = dynamic(() => import("@/components/geo/PlaceProvider"), {
  ssr: false,
  loading: LoadingState,
});

const StyledStepper = styled(Stepper)(({ theme, activeStep }) => ({
  "& .MuiStep-root": {
    paddingLeft: 8,
    paddingRight: 8,
    height: 15,
    width: 15,
    backgroundColor: theme.palette.grey[500],
    cursor: "pointer",
  },
  [`& .MuiStep-root:nth-child(${(activeStep || 0) + 1})`]: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Reviews({ activity, provider }: ReviewsProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const { place, loading } = usePlace(provider.placeId);

  if (loading) return <LoadingState />;

  if (!place) return null;

  const reviews = activity.googleReviews || provider.googleReviews || [];

  if (reviews.length === 0) return null;

  return (
    <React.Fragment>
      <Typography variant="h3">Ausgewählte Bewertungen</Typography>
      <Typography variant="bodyLarge">
        Entdecken Sie die Erfahrungen unserer zufriedenen Kunden!
      </Typography>
      <Box
        id="reviews"
        component={Paper}
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: "16px",
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: { xs: "center", lg: "flex-start" },
          }}
        >
          <GoogleReviewBox place={place} />
          <Stack
            sx={{
              minWidth: 0,
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 2,
                width: "100%",
                minWidth: 0,
                display: { xs: "none", lg: "flex" },
              }}
            >
              {reviews.slice(0, 4).map((review) => (
                <ReviewBox
                  key={new Date(review.publish_time).toISOString()}
                  review={review}
                />
              ))}
            </Stack>
            <Typography
              sx={{
                color: "text.secondary",
              }}
            >
              4 und 5 Sterne Bewertungen werden angezeigt
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
            mt: 2,
          }}
        >
          <SingleSlideCarousel
            sliderRef={sliderRef}
            setSlideIndex={setSlideIndex}
          >
            {reviews.slice(0, 3).map((review, i) => (
              <ReviewBox key={`review:${i}`} review={review} />
            ))}
          </SingleSlideCarousel>
        </Box>
      </Box>
      <StyledStepper
        nonLinear
        activeStep={slideIndex}
        connector={null}
        sx={{ display: { xs: "flex", lg: "none" } }}
      >
        {reviews.slice(0, 4).map((_, i) => (
          <Step key={i} onClick={() => sliderRef.current?.slickGoTo(i)} />
        ))}
      </StyledStepper>
    </React.Fragment>
  );
}

export default function ReviewsWrapper({ ...props }: ReviewsProps) {
  return (
    <Suspense fallback={<LoadingState />}>
      <PlaceProvider>
        <Reviews {...props} />
      </PlaceProvider>
    </Suspense>
  );
}

function LoadingState() {
  return (
    <React.Fragment>
      <Skeleton>
        <Typography variant="h3">Ausgewählte Bewertungen</Typography>
      </Skeleton>
      <Skeleton>
        <Typography variant="bodyLarge">
          Entdecken Sie die Erfahrungen unserer zufriedenen Kunden!
        </Typography>
      </Skeleton>
      <Skeleton variant="rectangular" height={364} />
    </React.Fragment>
  );
}
