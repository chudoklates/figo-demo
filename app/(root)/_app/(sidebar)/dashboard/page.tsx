import React from "react";

import Stack from "@mui/material/Stack";
import { Container, Divider } from "@mui/material";

import {
  PageContainer,
  UpgradeSubscription,
  TopActivities,
  SubscriptionEmptyState,
  UserDisplay,
  UpcomingActivity,
} from "@/components";

export default function App() {
  return (
    <PageContainer
      containerOverrides={{
        maxWidth: false,
        disableGutters: true,
      }}
      boxOverrides={{
        sx: { pt: { xs: 0, md: 6 } },
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <UserDisplay />
        <Container maxWidth="md">
          <Divider sx={{ display: { xs: "none", md: "block" }, mb: 6 }} />
          <Stack spacing={6}>
            <SubscriptionEmptyState />
            <UpgradeSubscription />
            <UpcomingActivity />
            <TopActivities />
          </Stack>
        </Container>
      </Stack>
    </PageContainer>
  );
}
