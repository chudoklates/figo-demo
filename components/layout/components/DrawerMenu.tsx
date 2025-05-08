"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { Close, Menu } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { routes } from "@/constants/routes";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";
import { LinkProps } from "next/link";
import NextLink from "next/link";

const StyledLink = styled(Link)<LinkProps & { component: typeof NextLink }>(
  ({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: 36,
    fontWeight: 700,
    lineHeight: "46px",
    textDecoration: "none",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    "&.active": {
      color: theme.palette.primary.main,
    },
  })
);

export default function DrawerMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton
        aria-label="menu"
        sx={{ display: { lg: "none" } }}
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            pt: 10,
            pr: 3,
            width: "min(396px, 80vw)",
            bgcolor: "secondary.main",
          },
          "data-testid": "left-drawer",
        }}
      >
        <IconButton
          aria-label="menu"
          sx={{ position: "absolute", left: 8, top: 8, color: "#fff" }}
          onClick={() => setIsOpen(false)}
        >
          <Close />
        </IconButton>
        <List>
          {routes.map((route) => (
            <StyledLink
              href={route.path}
              key={route.path}
              component={NextLink}
              onClick={() => setIsOpen(false)}
            >
              <ListItem
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  py: "12.5px",
                }}
              >
                {route.label}
              </ListItem>
            </StyledLink>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
