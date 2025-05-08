"use client";

import React, { useContext, useState, createContext } from "react";

import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { BookingPopup, LoadingButton } from "@/components";
import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import { sendSubscriptionRenewNotification } from "@/app/actions/brevo";
import { UserContext } from "@/lib/context/UserContext";
import { delay } from "@/utils/delay";
import {
  RenewSubscriptionPopupContextType,
  SubscriptionPopupState,
} from "../types";
import dayjs from "dayjs";
import { ProductContext } from "@/lib/context/ProductContext";

const RenewSubscriptionPopupContext =
  createContext<RenewSubscriptionPopupContextType>({
    open: false,
    closePopup: () => {},
    state: "initial",
    setState: () => {},
  });

function RenewSubscriptionButton({ children, ...props }: ButtonProps) {
  const { setState } = useContext(RenewSubscriptionPopupContext);
  const { product } = useContext(SubscriptionContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleRenew = async () => {
    setLoading(true);

    await sendSubscriptionRenewNotification({
      email: user!.email,
      currentSubscription: product.name,
    });

    setLoading(false);
    setState("success");
  };

  return (
    <LoadingButton
      loading={loading}
      color="primary"
      size="large"
      fullWidth
      onClick={handleRenew}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}

export default function RenewSubscriptionPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { product, subscription } = useContext(SubscriptionContext);
  const { setSelectedPlan } = useContext(ProductContext);

  const [state, setState] = useState<SubscriptionPopupState>("initial");

  if (!subscription || !product) return null;

  const closePopup = async () => {
    setOpen(false);
    await delay(200);
    setState("initial");

    if (state === "success") {
      setSelectedPlan(null);
    }
  };

  return (
    <RenewSubscriptionPopupContext.Provider
      value={{
        open,
        closePopup,
        state,
        setState,
      }}
    >
      <BookingPopup open={open} onClose={closePopup} maxWidth="md">
        <StateDisplay />
      </BookingPopup>
    </RenewSubscriptionPopupContext.Provider>
  );
}

function StateDisplay() {
  const { closePopup, state } = useContext(RenewSubscriptionPopupContext);
  const { product, subscription } = useContext(SubscriptionContext);

  if (!subscription || !product) return null;

  const endDate = dayjs()
    .add(1, "day")
    .add(1, "month")
    .toDate()
    .toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  switch (state) {
    case "success":
      return (
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2.5, 2, 0),
            alignItems: "center",
            textAlign: "center",
            minWidth: { xs: "unset", md: 450 },
          }}
        >
          <Typography variant="h3">Ihr Abo wird morgen erneuert</Typography>
          <Typography variant="h4">Vielen Dank!</Typography>
          <Typography>
            Sie bekommen eine Bestätigungsemail, sobald das neue
            <br /> Abonnement aktiv ist.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={closePopup}
            sx={{ px: 10 }}
          >
            Alles klar!
          </Button>
        </Stack>
      );
    case "error":
      return (
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2.5, 2, 0),
            alignItems: "center",
            textAlign: "center",
            minWidth: { xs: "unset", md: 450 },
          }}
        >
          <Typography variant="h3">Etwas ist schief gegangen!</Typography>
          <Typography>
            Leider konnte Ihr Abo nicht erneuert werden. Bitte versuchen Sie es
            später noch einmal.
          </Typography>
          <Button variant="contained" color="primary" onClick={closePopup}>
            Alles klar!
          </Button>
        </Stack>
      );
    default:
      return (
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2.5, 2, 0),
            alignItems: "center",
            textAlign: "center",
            minWidth: { xs: "unset", md: 450 },
          }}
        >
          <Typography variant="h3">Jetzt erneuern</Typography>
          <Typography variant="h4">
            Ihr Abo bleibt gleich, aber erneuert sich morgen!
          </Typography>
          <Typography>
            Wenn Sie jetzt verlängern, zahlen Sie <strong>sofort</strong> für
            einen neuen Monat.
            <br />
            Der Abbuchungsperiode wird angepasst und die nächste
            <br /> automatische Verlängerung erfolgt am{" "}
            <strong>{endDate}</strong>.
            <br /> Ihre Änderung ist ab <strong>morgen</strong> wirksam.
          </Typography>
          <RenewSubscriptionButton variant="contained">
            Jetzt einen Erneuerungsantrag stellen
          </RenewSubscriptionButton>
        </Stack>
      );
  }
}
