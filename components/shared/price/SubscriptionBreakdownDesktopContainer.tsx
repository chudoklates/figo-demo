import {
  Box,
  Collapse,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import SubscriptionBreakdown from "./SubscriptionBreakdown";
import React from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import Stripe from "stripe";
import { ProductContext } from "@/lib/context/ProductContext";

export default function SubscriptionBreakdownDesktopContainer({
  products,
}: {
  products: Stripe.Product[];
}) {
  const [open, setOpen] = React.useState(false);
  const { type } = React.useContext(ProductContext);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        py: 4,
      }}
    >
      <Divider flexItem component="div" role="presentation">
        <Stack
          direction="row"
          role="button"
          aria-label={open ? "Details ausblenden" : "Details anzeigen"}
          onClick={() => setOpen((prev) => !prev)}
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
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
            Wie kann ich meine{" "}
            {type === "one_time" ? "Mehrfachkarte" : "Mitgliedschaft"} nutzen?
          </Typography>
          {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
        </Stack>
      </Divider>
      <Collapse in={open}>
        <Typography
          sx={{
            fontSize: 18,
            lineHeight: "30px",
            textAlign: "center",
            py: 3,
          }}
        >
          Gestalten Sie Ihren eigenen Plan!
        </Typography>
        <Grid2 container columnSpacing={2}>
          {products.map((product) => (
            <Grid2
              key={product.id}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 5,
                  borderRadius: "15px",
                  border: "3px solid #BBBBC0",
                  height: "100%",
                }}
              >
                <SubscriptionBreakdown product={product} />
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Collapse>
    </Box>
  );
}
