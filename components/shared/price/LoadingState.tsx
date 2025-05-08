import { Box, Grid2, Skeleton } from "@mui/material";
import React from "react";

export default function LoadingState() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: "100%",
        }}
      >
        <Grid2
          container
          wrap="wrap"
          columnSpacing={2}
          sx={{
            pt: 4,
            pb: 6,
            justifyContent: "center",
          }}
        >
          {new Array(3).fill(null).map((_, index) => {
            return (
              <Grid2
                key={index}
                sx={{
                  alignItems: "center",
                }}
                size={{
                  xs: 12,
                  lg: 4,
                }}
              >
                <Skeleton variant="rectangular" height={380} />
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          width: "100%",
        }}
      >
        <Skeleton variant="rectangular" height={380} />
      </Box>
    </React.Fragment>
  );
}
