"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const DateDot = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 12,
  left: 10,
  zIndex: 1,
  backgroundColor: theme.palette.common.white,
  width: 58,
  height: 58,
  padding: theme.spacing(1.25, 0),
  borderRadius: "50%",
  textAlign: "center",
}));

export default DateDot;
