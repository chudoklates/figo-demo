import { Video } from "@/components/shared";
import { arima } from "@/theme/fonts";
import { Box, Skeleton, Typography } from "@mui/material";
import { TestimonialItem } from "../types";

export default function Testimonial({ item }: { item: TestimonialItem }) {
  return (
    <Box
      sx={{
        ml: { xs: 0, sm: 2 },
        mr: 2,
        my: 2.5,
        width: { xs: "unset", sm: 355 },
      }}
    >
      <Video width="100%">
        {item.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        <Skeleton variant="rectangular" width="100%" height={631} />
      </Video>
      <Typography
        sx={{
          mt: 3,
          fontSize: 28,
          fontWeight: 700,
          lineHeight: "40px",
          fontFamily: arima.style.fontFamily,
        }}
      >
        {item.quote}
      </Typography>
      <Typography
        variant="bodyLarge"
        component="p"
        sx={{
          fontStyle: "italic",
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        {item.name}
      </Typography>
      <Typography>{item.subtitle}</Typography>
    </Box>
  );
}
