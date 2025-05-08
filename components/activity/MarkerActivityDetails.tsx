"use client";

import { Activity } from "@/graphql/types/activities";

import Image from "next/image";
import "@/theme/mapOverrides.css";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  LocationOn,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getUrlEncodedID } from "@/utils/activity";
import {
  Box,
  IconButton,
  Link,
  Stack,
  Step,
  Stepper,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import ActivityRecurringDisplay from "./components/ActivityRecurringDisplay";

const IMAGE_HEIGHT = 191;

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: (IMAGE_HEIGHT - 48.4) / 2,
  zIndex: 1,
  backgroundColor: "#FFF",
  opacity: 0.8,
  "&:hover": {
    opacity: 1,
    backgroundColor: "#FFF",
    transform: "scale(1.1)",
  },
  border: "2px solid #CCC",
});

const StyledStepper = styled(Stepper)(({ theme, activeStep }) => ({
  position: "absolute",
  top: 12,
  zIndex: 1,
  width: "100%",
  paddingLeft: "25%",
  paddingRight: "25%",
  "& .MuiStep-root": {
    paddingLeft: 8,
    paddingRight: 8,
    height: 5,
    flexGrow: 1,
    backgroundColor: theme.palette.grey[700],
    cursor: "pointer",
  },
  [`& .MuiStep-root:nth-child(${(activeStep || 0) + 1})`]: {
    backgroundColor: "#fff",
  },
}));

export default function MarkerActivityDetails({
  activities,
  highlight,
}: {
  activities: Activity[];
  highlight?: string;
}) {
  const highlightIndex = Math.max(
    activities.findIndex((activity) => activity.id === highlight),
    0
  );

  const [index, setIndex] = useState<number>(highlightIndex);

  useEffect(() => {
    setIndex(highlightIndex);
  }, [activities.length, highlightIndex]);

  const activity = activities[index];

  if (!activity) return null;

  const showControls = activities.length > 1;

  const handleNext = () => {
    const nextIndex = (index + 1) % activities.length;

    setIndex(nextIndex);

    const nextActivity = activities[nextIndex];

    scrollToActivity(nextActivity.id);
  };

  const handlePrevious = () => {
    const prevIndex = (index - 1 + activities.length) % activities.length;

    setIndex(prevIndex);

    const prevActivity = activities[prevIndex];

    scrollToActivity(prevActivity.id);
  };

  const handleStep = (step: number) => {
    setIndex(step);

    const nextActivity = activities[step];

    scrollToActivity(nextActivity.id);
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        textAlign: "left",
      }}
    >
      {activity.mainImage && (
        <Box
          sx={{
            position: "relative",
            height: IMAGE_HEIGHT,
            width: "100%",
          }}
        >
          {showControls && (
            <React.Fragment>
              <StyledIconButton
                sx={{ left: 10 }}
                disableRipple
                onClick={handlePrevious}
              >
                <ArrowBackIosNew />
              </StyledIconButton>

              <StyledIconButton
                sx={{ right: 10 }}
                disableRipple
                onClick={handleNext}
              >
                <ArrowForwardIos />
              </StyledIconButton>
              <StyledStepper nonLinear activeStep={index} connector={null}>
                {activities.map((_, i) => (
                  <Step key={i} onClick={() => handleStep(i)} />
                ))}
              </StyledStepper>
            </React.Fragment>
          )}
          <Image
            src={activity.mainImage.url}
            alt={activity.name}
            fill
            style={{ objectFit: "cover" }}
            quality={80}
          />
        </Box>
      )}
      <Stack
        sx={{
          px: 2,
          py: 1.5,
          width: "100%",
        }}
      >
        <Link
          component={NextLink}
          href={`/aktivitaet/${getUrlEncodedID(activity.id)}`}
          underline="none"
          variant="h4"
          color="text.primary"
          sx={{
            lineHeight: "24px",
            mb: 1.5,
          }}
        >
          {activity.name}
        </Link>
        {activity.recurring.length > 0 ? (
          <ActivityRecurringDisplay activity={activity} />
        ) : null}
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: "center",
          }}
        >
          <LocationOn
            style={{ width: "24px", height: "24px", fill: "#323232" }}
          />
          <Typography>
            {activity.location?.street} {activity.location?.house_number}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

function scrollToActivity(activityId: string) {
  document
    .getElementById(activityId)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}
