"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import clsx from "clsx";
import { CheckCircleTwoTone } from "@mui/icons-material";
import { InterestCardProps } from "./types";
import interestImages from "../utils";

const StyledCard = styled(Card)(({ theme }) => ({
  boxSizing: "border-box",
  width: 300,
  height: 300,
  borderRadius: 20,
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "auto",
  },

  "& img": {
    transition: "opacity 0.2s ease-in-out",
  },

  "& svg": {
    display: "none",
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    "& path:first-child": {
      opacity: 1,
      color: theme.palette.primary.main,
    },
    "& path:last-child": {
      color: theme.palette.common.white,
    },
  },

  "& .MuiCardActionArea-root": {
    height: "100%",
    borderRadius: "unset",
    transition: "background-color 0.2s ease-in-out",
  },

  "&:hover": {
    border: `4px solid ${theme.palette.primary.main}`,
  },

  "&.active": {
    border: `4px solid ${theme.palette.primary.main}`,
    "& svg": {
      display: "block",
    },
    "& img": {
      opacity: 0.4,
    },
    "& .MuiCardActionArea-root": {
      backgroundColor: theme.palette.text.primary,
    },
  },
}));

export default function InterestCard({
  interest,
  active,
  handleSelectInterest,
}: InterestCardProps) {
  return (
    <StyledCard className={clsx({ active })}>
      <CardActionArea
        onClick={() => handleSelectInterest(interest)}
        disableRipple
      >
        <CheckCircleTwoTone />
        <Image
          alt={interest}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={interestImages[interest]}
          quality={80}
        />
      </CardActionArea>
    </StyledCard>
  );
}
