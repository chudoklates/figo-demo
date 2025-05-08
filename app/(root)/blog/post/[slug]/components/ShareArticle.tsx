"use client";

import { Box, Button, Link, Stack, Typography } from "@mui/material";
import {
  Facebook,
  WhatsApp,
  EmailOutlined,
  SvgIconComponent,
  LinkOutlined,
} from "@mui/icons-material";
import React from "react";
import { ResultSnackbar } from "@/components";
import { BlogPost } from "@/graphql/types/blog";

function getHref({
  baseHref,
  label,
  url,
  post,
}: {
  baseHref: string;
  label: "WhatsApp" | "Facebook" | "Email";
  url: string;
  post: BlogPost;
}) {
  if (label === "Email") {
    return `${baseHref}${encodeURIComponent(url)}&subject=${encodeURIComponent(
      post.title
    )}`;
  }

  return `${baseHref}${encodeURIComponent(url)}`;
}

const socials = [
  {
    Icon: Facebook,
    label: "Facebook" as const,
    href: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    Icon: EmailOutlined,
    label: "Email" as const,
    href: "mailto:?body=Ich habe gerade diesen Blog-Artikel gelesen: ",
  },
  {
    Icon: WhatsApp,
    label: "WhatsApp" as const,
    href: "https://api.whatsapp.com/send/?text=",
  },
];

function ShareIcon({
  Icon,
  label,
  href,
  url,
  post,
}: {
  Icon: SvgIconComponent;
  label: "WhatsApp" | "Facebook" | "Email";
  href: string;
  url: string;
  post: BlogPost;
}) {
  return (
    <Link
      href={getHref({ baseHref: href, label, url, post })}
      target="_blank"
      color="inherit"
      rel="noopener noreferrer"
      {...(label === "WhatsApp" && { "data-action": "share/whatsapp/share" })}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Icon
        sx={{
          borderRadius: "50%",
          bgcolor: "grey.400",
          p: { xs: 1.5, md: 2 },
          width: { xs: 48, sm: 64 },
          height: { xs: 48, sm: 64 },
        }}
      />
      <Typography variant="body2" sx={{ fontSize: 14 }}>
        {label}
      </Typography>
    </Link>
  );
}

function CopyToClipboardIcon() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  return (
    <React.Fragment>
      <ResultSnackbar
        message="Link in die Zwischenablage kopiert"
        severity="success"
        snackbarOpen={snackbarOpen}
        closeSnackbar={() => setSnackbarOpen(false)}
      />
      <Stack
        component={Button}
        color="inherit"
        disableRipple
        spacing={1}
        sx={{ alignItems: "center", p: 0, gap: 0 }}
        onClick={() => {
          try {
            navigator?.clipboard?.writeText(window?.location?.href);

            setSnackbarOpen(true);
          } catch (err) {}
        }}
      >
        <LinkOutlined
          sx={{
            borderRadius: "50%",
            bgcolor: "grey.400",
            p: { xs: 1.5, md: 2 },
            width: { xs: 48, sm: 64 },
            height: { xs: 48, sm: 64 },
          }}
        />
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          Link kopieren
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

export default function ShareArticle({ post }: { post: BlogPost }) {
  const url = window?.location?.href;

  if (!url) return null;

  return (
    <Stack spacing={3.5}>
      <Box>
        <Typography id="share-title" variant="h4">
          Dieser Artikel teilen
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Wenn Sie diesen Artikel mögen, teilen Sie ihn mit Ihren Freunden.
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-evenly" }}
      >
        {socials.map((social) => {
          return (
            <ShareIcon
              key={social.label}
              Icon={social.Icon}
              label={social.label}
              href={social.href}
              url={url}
              post={post}
            />
          );
        })}
        <CopyToClipboardIcon />
      </Stack>
    </Stack>
  );
}
