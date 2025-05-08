import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import {
  PageContainer,
  ProductList,
  ProductTypeButtonGroup,
  PageHeading,
} from "@/components";
import { getProductsList } from "@/app/actions/stripe";
import ProductWrapper from "@/lib/context/ProductContext";
import SubmitLink from "./components/SubmitLink";
import SuccessPopup from "./components/SuccessPopup";
import CurrentProductAlert from "./components/CurrentProductAlert";
import SubscriptionInfoAlert from "./components/SubscriptionInfoAlert";
import PurchaseNotPossibleAlert from "./components/PurchaseNotPossibleAlert";

export default async function SubscriptionPage(props: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const success = searchParams["success"];

  const products = await getProductsList();

  return (
    <PageContainer boxOverrides={{ sx: { pt: { xs: 4, md: 6 } } }}>
      <SuccessPopup initialOpen={!!success} />
      <PageHeading title="Abo oder Karte wählen" />
      <ProductWrapper>
        <Stack spacing={2}>
          <CurrentProductAlert />
          <SubscriptionInfoAlert />
          <PurchaseNotPossibleAlert />
        </Stack>
        <Stack
          spacing={4}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              lineHeight: "18px",
              fontWeight: 500,
              pt: { xs: 6, lg: 0 },
              display: { xs: "block", lg: "none" },
            }}
          >
            1. Wählen Sie Ihre Tarifoption
          </Typography>
          <ProductTypeButtonGroup />
          <Typography
            sx={{
              lineHeight: "18px",
              fontWeight: 500,
              display: { xs: "block", lg: "none" },
            }}
          >
            2. An wie viele Aktivitäten möchten Sie teilnehmen?
          </Typography>
          <ProductList products={products} />
          <SubmitLink />
          <Box
            sx={{
              pt: 4,
            }}
          >
            <Typography>
              Alle unsere Mitgliedschaften sind{" "}
              <Typography
                variant="inherit"
                component="span"
                sx={{
                  fontWeight: 700,
                }}
              >
                monatlich kündbar
              </Typography>
              . Wenn Sie Fragen haben, finden Sie weitere Informationen{" "}
              <Link component={NextLink} underline="always" href="/faq">
                hier
              </Link>{" "}
              oder{" "}
              <Link component={NextLink} underline="always" href="#">
                kontaktieren
              </Link>{" "}
              Sie uns!
            </Typography>
            {/* <Typography pt={2}>
              Möchten Sie Ihr Abonnement kündigen? Bitte schreiben Sie uns
              einfach{" "}
              <Link 
                component={NextLink}
                underline="always"
                href="#"
              >
                eine E-Mail
              </Link>{" "}
              und wir werden uns sofort darum kümmern. Die Kündigung wird ab dem
              nächsten Zyklus wirksam.
            </Typography> */}
          </Box>
        </Stack>
      </ProductWrapper>
    </PageContainer>
  );
}
