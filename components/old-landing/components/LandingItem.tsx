import { Paper, Stack, Typography } from "@mui/material";
import { LandingItemProps } from "../types";
import { arima } from "@/theme/fonts";

export default function LandingItem({
  title,
  subtitle,
  Icon,
}: LandingItemProps) {
  return (
    <Stack
      spacing={2.5}
      component={Paper}
      elevation={1}
      sx={{
        maxWidth: { xs: "100%", md: 335 },
        alignItems: "center",
        p: 5,
        borderRadius: "20px",
        mx: 1,
      }}
    >
      <Stack
        sx={{
          color: "white",
          width: 60,
          height: 60,
          bgcolor: "secondary.main",
          borderRadius: "40px",
          p: "3px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon color="inherit" sx={{ width: 33.3, height: 33.3 }} />
      </Stack>
      <Typography
        component="h3"
        sx={{
          textAlign: "center",
          fontSize: 28,
          lineHeight: "34px",
          fontWeight: 700,
          fontFamily: arima.style.fontFamily,
        }}
      >
        {title}
      </Typography>
      <Typography align="left">{subtitle}</Typography>
    </Stack>
  );
}
