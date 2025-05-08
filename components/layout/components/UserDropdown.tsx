"use client";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";

import {
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
} from "@mui/icons-material";
import React, { createContext, useState } from "react";
import { User } from "@/graphql/types/user";
import Link from "next/link";
import { Box, Theme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserInfo from "./UserInfo";
import { PROFILE_ROUTES } from "@/constants/profileRoutes";
import CreditDisplay from "./CreditDisplay";

const StyledMenuItem = styled(MenuItem)<MenuItemProps<typeof Link>>({
  padding: 0,
  minHeight: "auto",
});

export const DropdownContext = createContext<{
  handleClose: () => void;
}>({
  handleClose: () => {},
});

export default function UserDropdown({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { first_name, last_name, profile_image } = user;

  const fullName = `${first_name} ${last_name}`;

  return (
    <DropdownContext.Provider value={{ handleClose }}>
      <Stack
        id="open-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        direction="row"
        spacing={1}
        sx={[
          {
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100%",
          },
          (theme) => ({
            cursor: "pointer",
            [theme.breakpoints.down("lg")]: {
              "& > svg": {
                display: "none",
              },
            },
          }),
        ]}
      >
        <Avatar
          sx={{
            width: { xs: 30, lg: 50 },
            height: { xs: 30, lg: 50 },
            fontSize: { xs: "0.6em", lg: "1em" },
            borderWidth: { xs: 1, lg: 2 },
          }}
          src={profile_image?.url}
          alt={fullName}
        >
          {first_name.slice(0, 1)}
          {last_name.slice(0, 1)}
        </Avatar>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Stack>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "open-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        elevation={1}
        sx={{ "& .MuiMenu-paper": { borderRadius: "20px" } }}
        keepMounted
      >
        <Stack
          spacing={3}
          sx={{
            pt: { xs: 1, md: 5 },
            pb: { xs: 1, md: 2 },
          }}
        >
          <Box
            sx={{
              px: { xs: 2, md: 5 },
            }}
          >
            <UserInfo user={user} short={isMobile} dropdown />
          </Box>
          <Divider flexItem />
          <Box
            sx={{
              px: { xs: 2, md: 5 },
            }}
          >
            <CreditDisplay />
          </Box>
          <Divider flexItem sx={{ display: { xs: "none", md: "block" } }} />
          <Stack
            spacing={2}
            sx={{
              px: { xs: 2, md: 5 },
            }}
          >
            {isMobile
              ? [
                  ...PROFILE_ROUTES.map((route) => (
                    <StyledMenuItem
                      key={route.path}
                      href={route.path}
                      component={Link}
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <route.icon />
                      </ListItemIcon>
                      {route.label}
                    </StyledMenuItem>
                  )),
                  <StyledMenuItem
                    key="/ausloggen"
                    href="/ausloggen"
                    component={Link}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    Ausloggen
                  </StyledMenuItem>,
                ]
              : [
                  <StyledMenuItem
                    key="/app/dashboard"
                    href="/app/dashboard"
                    component={Link}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    Profil
                  </StyledMenuItem>,
                  <StyledMenuItem
                    key="/app/buchungen"
                    href="/app/buchungen"
                    component={Link}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <BookmarkBorderOutlined />
                    </ListItemIcon>
                    Buchungen
                  </StyledMenuItem>,
                ]}
          </Stack>
          {!isMobile
            ? [
                <Divider key="divider" />,
                <Stack
                  key="stack"
                  spacing={2}
                  sx={{
                    px: { xs: 2, md: 5 },
                  }}
                >
                  <StyledMenuItem
                    href="/ausloggen"
                    component={Link}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    Ausloggen
                  </StyledMenuItem>
                  <StyledMenuItem
                    href="/faq"
                    component={Link}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <ChatBubbleOutline />
                    </ListItemIcon>
                    Hilfe
                  </StyledMenuItem>
                </Stack>,
              ]
            : null}
        </Stack>
      </Menu>
    </DropdownContext.Provider>
  );
}
