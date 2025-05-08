import { Box, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface ProfileEditSectionProps extends PropsWithChildren {
  heading: string;
  description: string;
  controlElement?: React.ReactNode;
}

export default function ProfileEditSection({
  heading,
  description,
  children,
  controlElement,
}: ProfileEditSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {heading}
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        <Typography>{description}</Typography>
        {controlElement}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  );
}
