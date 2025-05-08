import { arima } from "@/theme/fonts";
import { Container, Stack, Typography } from "@mui/material";
import React, { ReactNode, PropsWithChildren } from "react";

const DEFAULT_HEADING = (
  <React.Fragment>
    <Typography
      variant="inherit"
      component="span"
      sx={{
        color: "secondary.main",
        fontWeight: 700,
      }}
    >
      Folgen Sie uns
    </Typography>{" "}
    und verpassen Sie{" "}
    <Typography
      variant="inherit"
      component="span"
      sx={{
        color: "secondary.main",
        fontWeight: 700,
      }}
    >
      nichts mehr
    </Typography>
    .
  </React.Fragment>
);

export default function DarkBackgroundStrip({
  heading = DEFAULT_HEADING,
  children,
}: PropsWithChildren<{ heading?: ReactNode }>) {
  return (
    <Stack
      sx={{
        bgcolor: "text.primary",
        height: "100%",
        width: "100%",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <Container
        component={Stack}
        maxWidth="md"
        spacing={7.5}
        disableGutters
        sx={{
          alignItems: "center",
          py: { xs: 7, md: 14 },
          px: { xs: 2, md: 7 },
          color: "white",
        }}
      >
        <Typography
          color="inherit"
          variant="h4new"
          component="p"
          sx={{
            textAlign: "center",
            fontFamily: arima.style.fontFamily,
          }}
        >
          {heading}
        </Typography>
        {children}
      </Container>
    </Stack>
  );
}
