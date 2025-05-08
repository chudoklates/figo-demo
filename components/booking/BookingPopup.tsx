"use client";

import { Close } from "@mui/icons-material";
import { DialogContent, IconButton } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { PropsWithChildren } from "react";

export default function BookingPopup({
  open,
  onClose,
  children,
  ...props
}: PropsWithChildren & Omit<DialogProps, "onClose"> & { onClose: () => void }) {
  return (
    <Dialog open={open} aria-labelledby="" maxWidth="sm" {...props}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          zIndex: theme.zIndex.modal + 1,
          right: 12,
          top: 8,
        })}
      >
        <Close />
      </IconButton>
      <DialogContent sx={{ pb: 5 }}>{children}</DialogContent>
    </Dialog>
  );
}
