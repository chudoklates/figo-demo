import React from "react";
import Container, { ContainerProps } from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";

type StyledContainerProps = {
  children: React.ReactNode;
  containerOverrides?: ContainerProps;
  boxOverrides?: BoxProps;
  noPadding?: boolean;
};

export default function PageContainer({
  children,
  containerOverrides,
  boxOverrides,
  noPadding,
}: StyledContainerProps) {
  return (
    <Container maxWidth="lg" component="main" {...containerOverrides}>
      <Box
        {...boxOverrides}
        sx={{
          ...(!noPadding && {
            pt: { xs: 5, lg: 10 },
            pb: { xs: 4, lg: 12 },
          }),
          ...boxOverrides?.sx,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
