import { Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import SubscriptionBreakdown from "./SubscriptionBreakdown";
import React from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import Stripe from "stripe";
import { ProductContext } from "@/lib/context/ProductContext";

export default function SubscriptionBreakdownMobileContainer({
  product,
}: {
  product: Stripe.Product;
}) {
  const [open, setOpen] = React.useState(false);
  const { type } = React.useContext(ProductContext);

  return (
    <Box
      sx={{
        display: { xs: "block", lg: "none" },
        py: 4,
        px: 2,
        border: "3px solid #BBBBC0",
        borderRadius: "15px",
        maxWidth: 580,
      }}
    >
      <Stack
        direction="row"
        role="button"
        aria-label={open ? "Details ausblenden" : "Details anzeigen"}
        onClick={() => setOpen((prev) => !prev)}
        spacing={2}
        sx={{
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            lineHeight: "24px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          Wie kann ich meine {product.name}{" "}
          {type === "one_time" ? "Mehrfachkarte" : "Mitgliedschaft"} nutzen?
        </Typography>
        {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
      </Stack>
      <Collapse in={open}>
        <Stack
          spacing={4}
          sx={{
            pt: 4,
          }}
        >
          <Divider flexItem />
          <SubscriptionBreakdown product={product} />
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            Gestalten Sie Ihren eigenen Plan!
          </Typography>
        </Stack>
      </Collapse>
    </Box>
  );
}
