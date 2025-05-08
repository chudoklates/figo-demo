import { Facebook, Instagram, LinkedIn, WhatsApp } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

export default function SocialsSmall() {
  return (
    <Stack direction="row" spacing={2.5}>
      <IconButton
        href="#"
        target="_blank"
        aria-label="Facebook"
        disableRipple
        sx={{
          border: "1px solid",
          borderColor: "text.primary",
          ":hover": {
            opacity: 0.7,
          },
          color: "text.primary",
        }}
      >
        <Facebook />
      </IconButton>
      <IconButton
        href="#"
        target="_blank"
        aria-label="WhatsApp"
        disableRipple
        sx={{
          border: "1px solid",
          borderColor: "text.primary",
          ":hover": {
            opacity: 0.7,
          },
          color: "text.primary",
        }}
      >
        <WhatsApp />
      </IconButton>
      <IconButton
        href="#"
        target="_blank"
        aria-label="Instagram"
        disableRipple
        sx={{
          border: "1px solid",
          borderColor: "text.primary",
          ":hover": {
            opacity: 0.7,
          },
          color: "text.primary",
        }}
      >
        <Instagram />
      </IconButton>
      <IconButton
        href="#"
        target="_blank"
        aria-label="LinkedIn"
        disableRipple
        sx={{
          border: "1px solid",
          borderColor: "text.primary",
          ":hover": {
            opacity: 0.7,
          },
          color: "text.primary",
        }}
      >
        <LinkedIn />
      </IconButton>
    </Stack>
  );
}
