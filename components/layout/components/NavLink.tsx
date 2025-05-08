"use client";

import Link, { LinkProps } from "@mui/material/Link";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const StyledLink = styled(Link)<LinkProps & { component: typeof NextLink }>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: "none",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    "&.active": {
      color: theme.palette.text.secondary,
    },
  })
);

export default function NavLink({ href, onClick, children }: LinkProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <StyledLink
      className={clsx({ active })}
      href={href}
      component={NextLink}
      onClick={onClick}
    >
      {children}
    </StyledLink>
  );
}
