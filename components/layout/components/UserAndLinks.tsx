import { User } from "@/api/types/user";
import { Avatar, Box, Link, Stack } from "@mui/material";
import UserDropdown from "./UserDropdown";
import NextLink from "next/link";
import React from "react";
import { SkeletonWrapper } from "@/components/Loading";

type UserAndLinksProps = {
  loading: boolean;
  user: User | null;
};

export default function UserAndLinks({ loading, user }: UserAndLinksProps) {
  return (
    <SkeletonWrapper loading={loading}>
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <React.Fragment>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              display: { xs: "none", lg: "flex" },
            }}
          >
            <Link
              href="/einloggen"
              component={NextLink}
              color="secondary.main"
              sx={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              Login
            </Link>
            <Link
              href="/registrieren"
              component={NextLink}
              color="secondary.main"
              sx={{
                bgcolor: "secondary.lighter",
                py: 1.25,
                px: 2.5,
                fontSize: 20,
                fontWeight: 600,
                borderRadius: "10px",
                lineHeight: "24px",
                textTransform: "uppercase",
              }}
            >
              Hier zum Schnupperkurs
            </Link>
          </Stack>
          <Box
            sx={{
              display: { xs: "block", lg: "none" },
            }}
          >
            <NextLink href="/registrieren" aria-label="Registrieren">
              <Avatar />
            </NextLink>
          </Box>
        </React.Fragment>
      )}
    </SkeletonWrapper>
  );
}
