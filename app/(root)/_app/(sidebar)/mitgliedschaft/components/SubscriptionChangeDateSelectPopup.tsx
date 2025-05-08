"use client";

import React, { useContext, useState, createContext } from "react";

import { ProductContext } from "@/lib/context/ProductContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { updateSubscription } from "@/app/actions/stripe";
import { BookingPopup, LoadingButton } from "@/components";
import { Button, Stack, Typography } from "@mui/material";
import { sendSubscriptionChangeNotification } from "@/app/actions/brevo";
import { UserContext } from "@/lib/context/UserContext";
import { delay } from "@/utils/delay";
import {
  UpdateSubscriptionButtonProps,
  UpdateSubscriptionPopupContextType,
  SubscriptionPopupState,
} from "../types";

const UpdateSubscriptionPopupContext =
  createContext<UpdateSubscriptionPopupContextType>({
    open: false,
    closePopup: () => {},
    state: "initial",
    setState: () => {},
    immediate: false,
    setImmediate: () => {},
  });

function UpdateSubscriptionButton({
  immediate,
  children,
  ...props
}: UpdateSubscriptionButtonProps) {
  const { setState, setImmediate } = useContext(UpdateSubscriptionPopupContext);
  const { selectedPlan } = useContext(ProductContext);
  const { product, subscription, setSubscriptionSchedule } =
    useContext(SubscriptionContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  if (!subscription || !product) return null;

  const subscriptionId = subscription.id;

  const handleSubscriptionChange = async () => {
    if (!selectedPlan) return;

    setImmediate(!!immediate);
    setLoading(true);

    if (immediate) {
      try {
        await sendSubscriptionChangeNotification({
          email: user!.email,
          currentSubscription: product.name,
          newSubscription: selectedPlan.name,
        });

        setState("success");
      } catch (err) {
        console.error(err);
        setState("error");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const { schedule } = await updateSubscription({
        productId: selectedPlan.id,
        subscriptionId,
      });
      setSubscriptionSchedule(schedule);
      setState("success");
    } catch (err) {
      console.error(err);
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      color="primary"
      size="large"
      fullWidth
      onClick={handleSubscriptionChange}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}

export default function SubscriptionChangeDateSelectPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { product, subscription } = useContext(SubscriptionContext);
  const { setSelectedPlan } = useContext(ProductContext);

  const [state, setState] = useState<SubscriptionPopupState>("initial");
  const [immediate, setImmediate] = useState(false);

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
    <UpdateSubscriptionPopupContext.Provider
      value={{
        open,
        closePopup,
        state,
        setState,
        immediate,
        setImmediate,
      }}
    >
      <BookingPopup open={open} onClose={closePopup} maxWidth="md">
        <StateDisplay />
      </BookingPopup>
    </UpdateSubscriptionPopupContext.Provider>
  );
}

function StateDisplay() {
  const { closePopup, state, immediate } = useContext(
    UpdateSubscriptionPopupContext
  );
  const { product, subscription } = useContext(SubscriptionContext);
  const { selectedPlan } = useContext(ProductContext);

  if (!subscription || !product) return null;

  const endDate = new Date(
    subscription.current_period_end * 1000
  ).toLocaleDateString("de-DE", {
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
          <Typography variant="h3">
            {immediate
              ? `Das ${selectedPlan?.name} Abo ist bestätigt`
              : "Geplante Veränderung bestätigt"}
          </Typography>
          <Typography variant="h4">Vielen Dank!</Typography>
          <Typography>
            {immediate ? (
              <span>
                Ihr neues Abo ist ab <strong>morgen</strong> wirksam. Sie
                bekommen eine Bestätigungs E-Mail, sobald es aktiv ist.
              </span>
            ) : (
              <span>
                Ihr neues Abo <strong>{selectedPlan?.name}</strong> ist ab dem{" "}
                <strong>{endDate}</strong> aktiv.
              </span>
            )}
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
            Leider konnte Ihr Abo nicht geändert werden. Bitte versuchen Sie es
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
          <Typography variant="h3">Zu {selectedPlan?.name} wechseln</Typography>
          <Typography variant="h4">
            Wählen Sie Ihr gewünschtes Startdatum
          </Typography>
          <Typography>
            Sie können Ihr Abo mit Wirkung zum <strong>nächsten Tag</strong>{" "}
            ändern. Ihre Rechnung wird automatisch der neuen Abrechnungsperiode
            angepasst.
          </Typography>
          <Typography>
            Alternativ können Sie nach Beendigung Ihres Abos wechseln. Die
            Abrechnungsperiode bleibt in diesem Fall gleich und der neue Betrag
            wird automatisch abgebucht.
          </Typography>
          <UpdateSubscriptionButton variant="contained">
            Neues Abonnement beginnt am {endDate}
          </UpdateSubscriptionButton>
          <UpdateSubscriptionButton variant="outlined" immediate>
            Neues Abonnement beginnt morgen
          </UpdateSubscriptionButton>
        </Stack>
      );
  }
}
