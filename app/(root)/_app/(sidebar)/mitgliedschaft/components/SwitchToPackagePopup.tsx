"use client";

import React, { useContext, useState } from "react";

import { BookingPopup } from "@/components";
import { Button, Stack, Typography } from "@mui/material";
import { ProductContext } from "@/lib/context/ProductContext";
import { UserContext } from "@/lib/context/UserContext";
import NextLink from "next/link";
import useCannotPurchaseProduct from "@/lib/hooks/useCannotPurchaseProduct";

export default function SwitchToPackagePopup() {
  const [open, setOpen] = useState(false);

  const { selectedPlan, coupon } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const cannotPurchaseProduct = useCannotPurchaseProduct();

  const disabled =
    !selectedPlan ||
    cannotPurchaseProduct(selectedPlan) ||
    (!!coupon &&
      selectedPlan.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID &&
      coupon.times_redeemed === coupon.max_redemptions);

  const closePopup = async () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        id="payment-button"
        size="large"
        variant="contained"
        disabled={disabled}
        sx={{ width: { xs: "100%", sm: 580, lg: 500 } }}
        onClick={() => setOpen(true)}
      >
        Zur Mehrfachkarte wechseln
      </Button>
      <BookingPopup open={open} onClose={closePopup} maxWidth="md">
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            textAlign: "center",
            p: (theme) => theme.spacing(2.5, 2, 0),
          }}
        >
          <Typography variant="h3">Mehrfachkarte kaufen</Typography>

          <Typography variant="h4">
            Abo kündigen und zur Mehrfachkarte wechseln
          </Typography>
          <Typography>
            Sie können Ihr Abo <strong>jederzeit</strong> kündigen und zu einer
            Mehrfachkarte wechseln. Beim Kauf einer solchen Karte wird Ihr Abo{" "}
            <strong>automatisch beendet</strong>.
          </Typography>

          <Button
            id="payment-button"
            size="large"
            variant="contained"
            disabled={disabled}
            href={`/app/zahlung?pid=${selectedPlan?.id}&uid=${user?.id}`}
            LinkComponent={NextLink}
            onClick={closePopup}
          >
            Abo beenden und Karte kaufen
          </Button>
        </Stack>
      </BookingPopup>
    </React.Fragment>
  );
}
