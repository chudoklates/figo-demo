"use client";

import { AlertGrey } from "@/components";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { ErrorOutline } from "@mui/icons-material";
import { Link, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import NextLink from "next/link";

export default function PurchaseNotPossibleAlert() {
  const { product, subscription } = useContext(SubscriptionContext);

  const { user } = useContext(UserContext);

  const hasPackage = !!product && !subscription;
  const hasSubscription = !!subscription;
  const hasCredits = user?.credits && user.credits > 0;
  const isFigoL = hasSubscription && product?.name === "Figo L";

  const packageExpirationDate =
    user?.credit_expiration_date &&
    new Date(user.credit_expiration_date).toLocaleDateString("de", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const renewalDate =
    subscription?.current_period_end &&
    new Date(subscription.current_period_end * 1000).toLocaleDateString(
      "de-DE",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  if (hasPackage || (isFigoL && hasCredits)) {
    return (
      <AlertGrey icon={false}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "center",
            }}
          >
            <ErrorOutline />
            <Typography variant="h5">
              Ihre {hasPackage ? "Mehrfachkarte" : "Abo"} kann momentan nicht{" "}
              {hasPackage ? "verlängert" : "erneuert"} werden
            </Typography>
          </Stack>
          <Typography>
            {hasPackage ? (
              <span>
                Ihr derzeitige Karte läuft am{" "}
                <strong>{packageExpirationDate}</strong> aus.
              </span>
            ) : (
              <span>
                Die Gebühr für ihr derzeitiges Abo{" "}
                <strong>{product.name}</strong> wird monatlich berechnet und
                verlängert sich automatisch am <strong>{renewalDate}</strong>.
              </span>
            )}
          </Typography>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                bgcolor: "grey.500",
                fontWeight: 700,
                px: 1.25,
                borderRadius: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Zur Erinnerung:
            </Typography>
            <Typography>
              Sie müssen Ihr Guthaben aufbrauchen, bevor Sie ein neues Paket
              oder Abo kaufen. Bei Fragen können Sie uns gerne{" "}
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
            </Typography>
          </Stack>
        </Stack>
      </AlertGrey>
    );
  }

  return null;
}
