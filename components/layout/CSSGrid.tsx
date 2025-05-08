"use client";

import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function CSSGrid({
  children,
  gap = "20px",
  itemHeight = "434px",
}: PropsWithChildren & {
  gap?: string | number;
  itemHeight?: string | number;
}) {
  return (
    <Box
      sx={(theme) => ({
        display: "grid",
        gap,
        [theme.breakpoints.down("xs")]: {
          gridAutoFlow: "column",
          gridTemplateColumns: "1fr",
        },
        [theme.breakpoints.up("lg")]: {
          gridAutoFlow: "row",
          gridAutoRows: itemHeight,
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        [theme.breakpoints.up("sm")]: {
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
        },
      })}
    >
      {children}
    </Box>
  );
}
