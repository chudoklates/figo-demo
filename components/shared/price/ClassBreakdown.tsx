"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { Row } from "./types";
import { DEFAULT_ROWS } from "./constants";
import useInterestsRows from "./hooks/useInterestRows";
import { ColorfulChip, COLORS } from "../general";

function ChipRow({ row, index }: { row: Row; index: number }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        width: "100%",
        alignItems: "center",
      }}
    >
      {row.map(([count, label], i) => (
        <React.Fragment key={i}>
          <ColorfulChip
            label={
              <span>
                <strong>{count}x</strong> {label}
              </span>
            }
            color={COLORS[(i + index) % 4]}
          />
          {i < row.length - 1 && <Typography>+</Typography>}
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default function ClassBreakdown({
  nActivities,
}: {
  nActivities: string;
}) {
  const length = Number(nActivities);

  const userRows = useInterestsRows(length);

  const rows = userRows.length > 0 ? userRows : DEFAULT_ROWS[length - 2];

  // Temporary fix until [FIG-386] and [FIG-397] are released
  if (!rows) return null;

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      <ChipRow row={rows[0]} index={0} />
      {rows.length > 1 && (
        <React.Fragment>
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "24px",
            }}
          >
            oder
          </Typography>
          <ChipRow row={rows[1]} index={2} />
          {rows.length > 2 && <ChipRow row={rows[2]} index={1} />}
        </React.Fragment>
      )}
    </Stack>
  );
}
