"use client";

import React, { useContext } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { DropdownContext } from "./UserDropdown";
import { UserContext } from "@/lib/context/UserContext";
import { SubscriptionWithSchedule } from "@/types/subscription";
import Stripe from "stripe";
import { User } from "@/api/types/user";

export default function SubscriptionAction() {
  const { user } = useContext(UserContext);

  const { subscription, product } = useContext(SubscriptionContext);

  const { handleClose } = useContext(DropdownContext);

  const action = getAction(subscription, product, user);

  if (!action) return null;

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "30px",
        py: 0.5,
        px: 4,
        textTransform: "none",
      }}
      href={action.href}
      onClick={handleClose}
      LinkComponent={Link}
    >
      {action.label}
    </Button>
  );
}

function getAction(
  subscription: SubscriptionWithSchedule | null,
  product: Stripe.Product | null,
  user: User | null
) {
  if (!product) {
    return {
      href: "/app/mitgliedschaft",
      label: "Abos & Karten entdecken",
    };
  }

  if (!subscription) {
    return null;
  }

  if (user?.credits === 0) {
    return {
      href: "/app/mitgliedschaft",
      label: "Jetzt erneuern",
    };
  }

  if (product?.name !== "Figo L") {
    return {
      href: "/app/mitgliedschaft",
      label: "Figo L entdecken",
    };
  }

  return null;
}
