"use client";

import { AlertGrey } from "@/components";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { CardMembership } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useContext } from "react";

export default function SubscriptionInfoAlert() {
  const { product } = useContext(SubscriptionContext);

  const { user } = useContext(UserContext);

  if (!!product) {
    return null;
  }

  return (
    <AlertGrey icon={<CardMembership />}>
      <Typography>
        Sie können Abonnements oder Mehrfachkarten kaufen.
        <br />
        Alle unsere Abos sind <strong>monatlich kündbar</strong>. <br />
        {user?.credits && user.credits > 0 ? (
          <strong>Ihr Schnupperkurs bleibt nach dem Kauf gültig!</strong>
        ) : null}
      </Typography>
    </AlertGrey>
  );
}
