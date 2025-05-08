"use client";

import useTransactions from "@/lib/hooks/useTransactions";
import { Chip, Skeleton } from "@mui/material";
import { FilterChipProps } from "../types";

export default function FilterChip({
  label,
  filter,
  onClick,
}: FilterChipProps) {
  const { totalCount, loading } = useTransactions(filter);

  if (loading)
    return (
      <Skeleton
        variant="rounded"
        width={140}
        height={32}
        sx={{ borderRadius: "16px" }}
      />
    );

  return (
    <Chip
      label={`${label} (${totalCount})`}
      variant="outlined"
      clickable
      disabled={totalCount === 0}
      onClick={onClick}
      sx={{
        color: "primary.main",
        "& .MuiChip-label": { fontSize: 14, lineHeight: "24px" },
      }}
    />
  );
}
