import { CTAType } from "@/api/types/cms";
import {
  WhatsApp,
  ArrowForwardRounded,
  ArrowOutwardRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import NextLink from "next/link";

const COLOR_MAP = {
  "Figo Primary": "primary" as const,
  "Figo Secondary": "secondary" as const,
  Whatsapp: "success" as const,
  Black: "inherit" as const,
};

const ICON_MAP = {
  Whatsapp: <WhatsApp />,
  ArrowForward: <ArrowForwardRounded />,
  ArrowOutward: <ArrowOutwardRounded />,
};

export default function CTA({
  color,
  startIcon,
  endIcon,
  sx,
  href,
  label,
  variant,
}: CTAType) {
  return (
    <Button
      size="large"
      variant={variant}
      color={COLOR_MAP[color]}
      href={href}
      LinkComponent={NextLink}
      sx={sx}
      startIcon={startIcon && ICON_MAP[startIcon]}
      endIcon={endIcon && ICON_MAP[endIcon]}
    >
      {label}
    </Button>
  );
}
