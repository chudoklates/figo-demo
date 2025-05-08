"use client";

import React from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import { usePathname } from "next/navigation";
import { GeocodingProvider } from "@/components";

const steps = ["interessen", "standort", "abgeschlossen"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentPath = pathname.split("/").pop();

  const activeStep = steps.indexOf(currentPath || "") + 1;

  return (
    <Box
      sx={{
        minHeight: "80vh",
        pt: { xs: "calc(10vh + 25px)", lg: "20vh" },
      }}
    >
      <Container maxWidth="xl" component={Box} pb={8}>
        <Grid2
          container
          sx={{
            alignItems: "center",
          }}
        >
          {activeStep !== 0 ? (
            <React.Fragment>
              <Grid2 size={3} />
              <Grid2 size={6}>
                <Stepper activeStep={activeStep} connector={null}>
                  {steps.map((_, index) => (
                    <Step key={index} />
                  ))}
                </Stepper>
              </Grid2>
              <Grid2 size={3} />
            </React.Fragment>
          ) : null}
        </Grid2>
      </Container>
      <GeocodingProvider>{children}</GeocodingProvider>
    </Box>
  );
}
