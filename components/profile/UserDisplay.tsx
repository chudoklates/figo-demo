"use client";

import { UserContext } from "@/lib/context/UserContext";
import { Box, Container, Skeleton, Stack, Link } from "@mui/material";
import { useContext } from "react";
import UserInfo from "../layout/components/UserInfo";
import SubscriptionInfo from "./SubscriptionInfo";
import NextLink from "next/link";

const gradient =
  "linear-gradient(270deg, rgba(0, 103, 190, 0.38) 3.17%, rgba(255, 255, 255, 0.25) 42.28%, rgba(255, 255, 255, 0.25) 42.29%, rgba(255, 148, 48, 0.35) 93.41%);";

export default function UserDisplay() {
  const { user, loading } = useContext(UserContext);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        mt: "0 !important",
        pt: { xs: 6, md: 0 },
        background: { xs: gradient, md: "transparent" },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          bgcolor: { xs: "white", md: "transparent" },
          borderTopLeftRadius: { xs: "30px", md: 0 },
          borderTopRightRadius: { xs: "30px", md: 0 },
        }}
      >
        <Container
          mt={{ xs: "-30px", md: 0 }}
          maxWidth="md"
          component={Stack}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          display="flex !important"
        >
          {loading ? (
            <Skeleton variant="rectangular" width={120} height={120} />
          ) : user ? (
            <UserInfo user={user}>
              <Link
                href="/app/personal-info"
                component={NextLink}
                color="grey.800"
              >
                Profil bearbeiten
              </Link>
            </UserInfo>
          ) : null}
          <SubscriptionInfo />
        </Container>
      </Stack>
    </Box>
  );
}
