"use client";

import { AlertGrey } from "@/components";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { CardMembership } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";

export default function CurrentProductAlert() {
  const { product, subscription } = useContext(SubscriptionContext);

  const { user } = useContext(UserContext);

  const hasPackage = !!product && !subscription;
  const hasSubscription = !!subscription;
  const isFigoL = product?.name === "Figo L";
  const hasCredits = user?.credits && user.credits > 0;

  if (hasPackage) {
    return null;
  }

  if (hasSubscription && (!isFigoL || !hasCredits)) {
    const renewalDate = new Date(
      subscription.current_period_end * 1000
    ).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      <AlertGrey icon={<CardMembership />}>
        <Typography align="left">
          Die Gebühr für ihr derzeitiges Abo <strong>{product!.name}</strong>{" "}
          wird monatlich berechnet und verlängert sich automatisch am{" "}
          <strong>{renewalDate}</strong>.{" "}
          {hasCredits ? (
            <span>
              Sie können <strong>jederzeit</strong> zu einem höheren Abo
              wechseln oder Ihr Abo kündigen. Sie müssen Ihr Guthaben
              aufbrauchen, bevor Sie eine Karte oder anderes Abo kaufen. Bei
              Fragen können Sie uns gerne{" "}
              <Link
                component={NextLink}
                href="/kontakt"
                underline="always"
                sx={{
                  fontWeight: 700,
                }}
              >
                kontaktieren
              </Link>
              .
            </span>
          ) : (
            <span>
              Sie können Ihr Abo <strong>jederzeit</strong> erneuern, kündigen
              oder ändern - oder zu einer Mehrfachkarte wechseln.
            </span>
          )}
        </Typography>
      </AlertGrey>
    );
  }

  return null;
}
