"use client";

import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { SlotSelectorProps } from "../types";
import React from "react";

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  padding: "10px 0",
  margin: 0,
  borderTop: `1px solid ${theme.palette.borderColor.main}`,

  "& svg": {
    color: theme.palette.text.primary,
  },

  "&:last-child": {
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
  },
}));

export default function SlotSelector({
  selectedVariant,
  handleChange,
  options,
}: SlotSelectorProps) {
  if (options.length === 0) return null;

  return (
    <React.Fragment>
      <Typography variant="h5" component="label" htmlFor="variant">
        Zeit auswählen
      </Typography>
      <RadioGroup value={selectedVariant?.id || null} onChange={handleChange}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
    </React.Fragment>
  );
}
