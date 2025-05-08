import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

export default function Socials() {
  return (
    <Stack direction="row" spacing={3.75}>
      <IconButton
        href="#"
        target="_blank"
        aria-label="Facebook"
        disableRipple
        sx={{
          backgroundColor: "#fff",
          ":hover": { backgroundColor: "#fff", opacity: 0.7 },
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
          backgroundColor: "#fff",
          ":hover": { backgroundColor: "#fff", opacity: 0.7 },
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
          backgroundColor: "#fff",
          ":hover": { backgroundColor: "#fff", opacity: 0.7 },
          color: "text.primary",
        }}
      >
        <Instagram />
      </IconButton>
    </Stack>
  );
}
