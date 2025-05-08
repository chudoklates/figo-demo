"use client";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import React, { useState } from "react";
import ShareArticle from "./ShareArticle";
import ShareArticleButton from "./ShareArticleButton";
import { BlogPost } from "@/graphql/types/blog";

export default function SharePopup({ post }: { post: BlogPost }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ShareArticleButton
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "none", md: "flex" } }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="share-title"
      >
        <IconButton
          aria-label="schließen"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            zIndex: theme.zIndex.modal + 1,
            right: 15,
            top: 15,
          })}
        >
          <Close />
        </IconButton>
        <DialogContent sx={{ p: 3.75 }}>
          <ShareArticle post={post} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
