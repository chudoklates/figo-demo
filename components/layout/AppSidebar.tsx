"use client";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Link from "next/link";
import { PROFILE_ROUTES } from "../../constants/profileRoutes";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Stack
      sx={{
        pt: 6,
        px: { md: 0, lg: 2 },
        alignItems: "center",
        textAlign: "center",
        position: "sticky",
        left: 0,
        top: { sm: 66, lg: 90 },
      }}
    >
      <Stack
        spacing={1.5}
        sx={{
          width: "100%",
        }}
      >
        {PROFILE_ROUTES.map((route) => {
          const active = pathname === route.path;

          return (
            <MenuItem
              key={route.path}
              href={route.path}
              component={Link}
              {...(active && {
                sx: {
                  color: "primary.main",

                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              })}
            >
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              {route.label}
            </MenuItem>
          );
        })}
      </Stack>
    </Stack>
  );
}
