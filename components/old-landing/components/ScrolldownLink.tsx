import { ExpandMore } from "@mui/icons-material";
import { Link, LinkProps, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

export default function ScrolldownLink({
  label,
  ...rest
}: { label: string } & LinkProps) {
  return (
    <Link
      variant="h5"
      color="inherit"
      component={NextLink}
      {...rest}
      sx={[
        {
          fontWeight: 700,
          letterSpacing: "2.2px",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {label}
      <ExpandMore />
    </Link>
  );
}
