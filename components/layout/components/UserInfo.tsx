import { Avatar, Box, Stack, Typography } from "@mui/material";
import SubscriptionText from "./SubscriptionText";
import { User } from "@/api/types/user";
import React, { PropsWithChildren } from "react";
import SubscriptionAction from "./SubscriptionAction";

export default function UserInfo({
  user,
  short,
  children,
  dropdown = false,
}: PropsWithChildren & {
  user: User;
  short?: boolean;
  dropdown?: boolean;
}) {
  const { first_name, last_name, profile_image } = user;

  const fullName = `${first_name} ${last_name}`;

  const avatarSize = short ? 50 : 120;

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      <Stack
        direction={
          short ? "row" : { xs: "column", md: dropdown ? "column" : "row" }
        }
        spacing={2}
        sx={{
          textAlign: short
            ? "left"
            : { xs: "center", md: dropdown ? "center" : "left" },
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: avatarSize,
            height: avatarSize,
            fontSize: short ? "1em" : "2.5em",
            borderWidth: short ? 2 : 3,
          }}
          src={profile_image?.url}
          alt={fullName}
        >
          {first_name.slice(0, 1)}
          {last_name.slice(0, 1)}
        </Avatar>
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant={short ? "h6" : "h4"}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {first_name} {last_name}
          </Typography>
          <SubscriptionText short={short} dropdown={dropdown} />
          {children}
        </Box>
      </Stack>
      {dropdown && <SubscriptionAction />}
    </Stack>
  );
}
