"use client";

import { Close } from "@mui/icons-material";
import { IconButton, Drawer } from "@mui/material";
import React, { useState } from "react";
import ShareArticle from "./ShareArticle";
import ShareArticleButton from "./ShareArticleButton";
import { BlogPost } from "@/api/types/blog";

export default function ShareDrawer({ post }: { post: BlogPost }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ShareArticleButton
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "flex", md: "none" } }}
      />
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={open}
        aria-labelledby="share-title"
        sx={{ "& .MuiDrawer-paper": { p: 3.75 } }}
      >
        <IconButton
          aria-label="schließen"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            zIndex: theme.zIndex.drawer + 1,
            right: 15,
            top: 15,
          })}
        >
          <Close />
        </IconButton>
        <ShareArticle post={post} />
      </Drawer>
    </React.Fragment>
  );
}
