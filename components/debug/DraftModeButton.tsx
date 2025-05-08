import { Preview } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import NextLink from "next/link";

export default function DraftModeButton({
  isEnabled,
  pathname,
}: {
  isEnabled: boolean;
  pathname: string;
}) {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!isDevelopment && !isEnabled) return null;

  return (
    <IconButton
      aria-label="Toggle Draft Mode"
      color={isEnabled ? "primary" : "default"}
      component={NextLink}
      href={`/api/${isEnabled ? "disable-draft" : "draft"}?path=${pathname}`}
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
