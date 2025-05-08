"use client";

import { BookingPopup } from "@/components";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function SuccessPopup({ initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);

  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    // Remove search param
    router.replace(pathname);
  };

  const { user } = useContext(UserContext);
  const { product, subscription, loading } = useContext(SubscriptionContext);

  const isPackage = !subscription;
  const packageExpirationDate =
    user?.credit_expiration_date &&
    new Date(user.credit_expiration_date).toLocaleDateString("de", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <BookingPopup open={open} onClose={handleClose} fullWidth>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          p: (theme) => theme.spacing(2.5, 2, 0),
        }}
      >
        {loading ? (
          <CircularProgress size={100} color="primary" />
        ) : (
          <React.Fragment>
            <Typography variant="h3" align="center">
              Ihr{" "}
              {isPackage
                ? `Mehrfachkarte ${product?.name} `
                : `${product?.name} Abonnement `}
              ist bestätigt
            </Typography>
            <Typography variant="h4" align="center">
              Vielen Dank!
            </Typography>
            <SuccessText
              isPackage={isPackage}
              packageExpirationDate={packageExpirationDate}
              credits={product?.metadata.credits}
              hasFreeClass={user?.has_free_class}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClose}
              sx={{ mt: 5, px: 10 }}
            >
              Schließen
            </Button>
          </React.Fragment>
        )}
      </Stack>
    </BookingPopup>
  );
}

function SuccessText({
  credits,
  hasFreeClass,
  isPackage,
  packageExpirationDate,
}: {
  credits?: string;
  hasFreeClass?: boolean;
  isPackage: boolean;
  packageExpirationDate?: string;
}) {
  if (isPackage) {
    return (
      <Typography align="center">
        Sie können jetzt <strong>{credits} Aktivitäten</strong> buchen. Ihre
        Karte ist bis zum <strong>{packageExpirationDate}</strong> gültig
        {hasFreeClass ? (
          <span>
            {" "}
            - und Ihr <strong>Schnupperkurs</strong> is auch noch aktiv
          </span>
        ) : (
          "."
        )}
      </Typography>
    );
  }

  return (
    <Typography align="center">
      Sie können jetzt <strong>{credits} Aktivitäten</strong> pro Monat buchen
      {!hasFreeClass ? (
        ", bis Sie sich entscheiden, Ihr Abonnement zu beenden"
      ) : (
        <span>
          {" "}
          - und Ihr <strong>Schnupperkurs</strong> is auch noch gültig.
        </span>
      )}
    </Typography>
  );
}
