"use client";

import React, { useContext, useState } from "react";

import { Button } from "@mui/material";
import RenewSubscriptionPopup from "./RenewSubscriptionPopup";
import { UserContext } from "@/lib/context/UserContext";

export default function RenewSubscriptionButton() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const hasCredits = !!(user?.credits && user.credits > 0);

  const handleClick = async () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <RenewSubscriptionPopup open={open} setOpen={setOpen} />
      <Button
        id="payment-button"
        size="large"
        variant="contained"
        disabled={hasCredits}
        sx={{ width: { xs: "100%", sm: 580, lg: 500 } }}
        onClick={handleClick}
      >
        Abo erneuern
      </Button>
    </React.Fragment>
  );
}
