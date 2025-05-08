"use client";

import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const AlertGrey = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.text.primary,
  borderRadius: 16,
  padding: 16,
  alignItems: "center",
  "& .MuiAlert-icon": {
    color: theme.palette.text.primary,
    padding: 18,
    borderRadius: 30,
    backgroundColor: theme.palette.grey[500],
  },
  "& .MuiAlert-message": {
    flexGrow: 1,
    textAlign: "left",
    fontSize: 18,
    lineHeight: "26px",
    fontWeight: 500,
    padding: 0,
  },
}));

export default AlertGrey;
