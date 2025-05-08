import { Stack, Typography } from "@mui/material";
import React from "react";

export default function SectionTitle({
  id,
  title,
  description,
}: {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <Stack
      spacing={2.5}
      id={id}
      sx={{
        textAlign: { xs: "left", ss: "center" },
        scrollMarginTop: { xs: 100, md: 150 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography variant="bodyLarge" component="p">
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}
