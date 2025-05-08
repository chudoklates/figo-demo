"use client";

import { ProductContext } from "@/lib/context/ProductContext";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect } from "react";

export default function ProductTypeButtonGroup() {
  const { type, setType, setSelectedPlan } = useContext(ProductContext);

  useEffect(() => {
    setSelectedPlan(null);
  }, [type, setSelectedPlan]);

  return (
    <ToggleButtonGroup
      sx={{ marginX: "auto !important", pb: 3, maxWidth: 580 }}
      color="primary"
      exclusive
      value={type}
      onChange={(_e, value) => value !== null && setType(value)}
      aria-label="Angebot"
      fullWidth
    >
      <ToggleButton value="recurring" size="large">
        Spar-Abos
      </ToggleButton>
      <ToggleButton value="one_time" size="large">
        Mehrfachkarten
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
