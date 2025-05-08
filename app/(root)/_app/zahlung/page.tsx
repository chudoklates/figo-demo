"use server";

import React, { Suspense } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid2 from "@mui/material/Grid2";

import { redirect } from "next/navigation";

import SelectedPlan from "./components/SelectedPlan";
// import CheckoutForm from "./components/CheckoutForm";
import {
  generateCouponForUser,
  getProduct,
  retrieveCouponForUser,
} from "@/app/actions/stripe";
import { PageContainer } from "@/components";

export default async function Payment(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const productId = searchParams["pid"];
  const userId = searchParams["uid"];

  if (!productId || !userId) {
    redirect("/app/mitgliedschaft");
  }

  const product = await getProduct({ productId });

  if (product?.id === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID) {
    const coupon = await retrieveCouponForUser({ userId });

    if (!coupon) {
      await generateCouponForUser({ userId });
    }
  }

  return (
    <PageContainer
      containerOverrides={{ maxWidth: false, disableGutters: true }}
      boxOverrides={{ sx: { pb: 0 } }}
    >
      <Grid2
        container
        direction="row"
        sx={{
          minHeight: "80vh",
          pt: { xs: 0, lg: 8 },
        }}
      >
        <Grid2
          sx={{
            display: { xs: "none", lg: "flex" },
            pb: 15,
            background: `linear-gradient(#FFF 30%, 10%, #FCE5D9 60%)`,
          }}
          size={{
            lg: 5,
          }}
        >
          <Stack
            spacing={4}
            sx={{
              alignItems: "center",
              width: "100%",
            }}
          >
            <Suspense fallback={<CircularProgress size={250} thickness={4} />}>
              <SelectedPlan product={product} />
            </Suspense>
          </Stack>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            lg: 7,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              spacing={4}
              sx={{
                pb: 20,
                textAlign: "center",
              }}
            >
              <Typography variant="h3">Zahlung</Typography>
              {/* <CheckoutForm productId={productId} /> */}
            </Stack>
          </Container>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
