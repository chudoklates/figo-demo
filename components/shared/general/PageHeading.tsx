import { Box, Typography } from "@mui/material";

export default function PageHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Box
      sx={{
        pb: 4,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
