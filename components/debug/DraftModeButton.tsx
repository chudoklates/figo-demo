import { Preview } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import NextLink from "next/link";

const isDevelopment = process.env.NODE_ENV === "development";

export default function DraftModeButton({
  isEnabled: _,
  pathname: __,
}: {
  isEnabled: boolean;
  pathname: string;
}) {
  if (!isDevelopment) return null;

  return (
    <IconButton
      aria-label="Toggle Draft Mode"
      color="primary"
      component={NextLink}
      href="#"
      replace={true}
      prefetch={false}
      sx={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
      }}
    >
      <Preview color="inherit" fontSize="large" />
    </IconButton>
  );
}
