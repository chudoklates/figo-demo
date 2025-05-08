"use client";

import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const COLORS = [
  "default" as const,
  "primary" as const,
  "success" as const,
  "secondary" as const,
];

const BACKGROUND_COLORS: Record<(typeof COLORS)[number], string> = {
  default: "#DCDCDC",
  primary: "rgba(153, 198, 237, 0.40)",
  success: "rgba(41, 204, 106, 0.10)",
  secondary: "rgba(251, 146, 102, 0.20)",
};

const TEXT_COLORS: Record<(typeof COLORS)[number], string> = {
  default: "#3F415C",
  primary: "#0067BE",
  success: "#16B35E",
  secondary: "#FB9266",
};

export default styled(Chip)(({ color }) => {
  const bgcolor = color
    ? BACKGROUND_COLORS[color as (typeof COLORS)[number]]
    : BACKGROUND_COLORS.default;

  const textColor = color
    ? TEXT_COLORS[color as (typeof COLORS)[number]]
    : TEXT_COLORS.default;

  return {
    "& .MuiChip-label": {
      padding: 0,
      whiteSpace: "wrap",
      textAlign: "center",
    },
    transition: "unset",
    ":hover": {
      backgroundColor: bgcolor,
    },
    // Override default background theme colors
    backgroundColor: bgcolor,
    borderRadius: "16px",
    color: textColor,
    padding: "0 10px",
    flexBasis: "45%",
    flexGrow: 1,
    flexShrink: 0,
    height: 56,
  };
});
