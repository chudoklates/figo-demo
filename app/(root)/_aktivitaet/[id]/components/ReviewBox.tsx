"use client";

import { Rating, Stack, Typography } from "@mui/material";
import { GoogleReview } from "@/api/types/misc";

export default function ReviewBox({ review }: { review: GoogleReview }) {
  return (
    <Stack
      spacing={2}
      sx={{
        p: { xs: 0, lg: 2 },
        flexBasis: "265px",
        flexGrow: 1,
        flexShrink: 0,
        minWidth: 0,
        width: { xs: "100%", lg: "unset" },
      }}
    >
      <Rating readOnly value={review.rating} precision={0.5} />
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.36,
          wordWrap: "break-word",
        }}
      >
        &quot;{review.text}&quot;
      </Typography>
      <Typography
        noWrap
        sx={{
          fontWeight: 600,
          width: "100%",
        }}
      >
        {review.author_name}
      </Typography>
    </Stack>
  );
}
