"use client";

import React, { useContext, useState } from "react";

import { ProductContext } from "@/lib/context/ProductContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { Button } from "@mui/material";
import SubscriptionChangeDateSelectPopup from "./SubscriptionChangeDateSelectPopup";
import useCannotPurchaseProduct from "@/lib/hooks/useCannotPurchaseProduct";

export default function SubscriptionChangeButton() {
  const { selectedPlan } = useContext(ProductContext);
  const { product, subscription } = useContext(SubscriptionContext);
  const [open, setOpen] = useState(false);

  const cannotPurchaseProduct = useCannotPurchaseProduct();

  if (!subscription || !product) return null;

  const handleClick = async () => {
    if (!selectedPlan) return;

    setOpen(true);
  };

  const disabled = !selectedPlan || cannotPurchaseProduct(selectedPlan);

  return (
    <React.Fragment>
      <SubscriptionChangeDateSelectPopup open={open} setOpen={setOpen} />
      <Button
        id="payment-button"
        size="large"
        variant="contained"
        disabled={disabled}
        sx={{ width: { xs: "100%", sm: 580, lg: 500 } }}
        onClick={handleClick}
      >
        Weiter zur Auswahl des Anfangsdatums
      </Button>
    </React.Fragment>
  );
}
