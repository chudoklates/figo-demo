"use client";

import React from "react";

import { Stack, StackProps, styled, Typography } from "@mui/material";
import Link from "next/link";
import clsx from "clsx";

const StyledStack = styled(Stack)<StackProps<typeof Link>>(({ theme }) => ({
  border: "1px solid",
  borderRadius: "16px",
  borderColor: theme.palette.grey[600],
  padding: theme.spacing(1),
  width: 148,
  height: 56,
  backgroundColor: theme.palette.common.white,
  textDecoration: "none !important",
  color: theme.palette.text.primary,
  transition: "all 0.2s ease-in-out",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  "&.active": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

export default function FilterBox({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <StyledStack className={clsx({ active })} component={Link} href={href}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          textAlign: "center",
          lineHeight: "18px",
          color: "inherit",
        }}
      >
        {label}
      </Typography>
    </StyledStack>
  );
}
