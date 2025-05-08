import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export default function CTAButton({
  href,
  label,
  sx,
  ...overrides
}: {
  href: string;
  label: string;
} & ButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      sx={{
        fontWeight: 700,
        gap: 0,
        py: { xs: 2.25, md: 3 },
        px: { xs: 4, md: 6.25 },
        borderRadius: "40px",
        textAlign: "center",
        ...sx,
      }}
      LinkComponent={Link}
      href={href}
      {...overrides}
    >
      {label}
    </Button>
  );
}
