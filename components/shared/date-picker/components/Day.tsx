"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { DayProps } from "../types";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)<
  CardProps & { selected?: boolean; disabled?: boolean }
>(({ theme, selected, disabled }) => ({
  borderColor: selected
    ? theme.palette.secondary.main
    : theme.palette.grey[800],
  borderWidth: 2,
  borderRadius: "10px",
  boxSizing: "border-box",

  ...(selected && {
    backgroundColor: theme.palette.secondary.main,
  }),

  "& .MuiCardActionArea-root": {
    borderRadius: 0,
  },

  "& .MuiCardContent-root": {
    padding: 8,
  },

  ...(disabled && {
    borderWidth: 1,
    opacity: 0.2,

    "& .MuiCardContent-root": {
      padding: 9,
    },
  }),
}));

export default function Day({ day, onClick, selected, disabled }: DayProps) {
  return (
    <StyledCard variant="outlined" selected={selected} disabled={disabled}>
      <CardActionArea disabled={disabled} onClick={onClick}>
        <CardContent>
          <Box
            sx={{
              color: selected ? "white" : "grey.800",
              textAlign: "center",
            }}
          >
            <Typography
              color="inherit"
              sx={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: "23px",
              }}
            >
              {day.format("dd")}.
            </Typography>
            <Typography
              color="inherit"
              sx={{
                fontSize: 22,
                fontWeight: 700,
                lineHeight: "30px",
              }}
            >
              {day.format("D")}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}
