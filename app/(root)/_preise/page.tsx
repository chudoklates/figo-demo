import { PageContainer } from "@/components";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { Metadata } from "next";
import PricingSection from "./components/PricingSection";
import { getProductsList } from "@/app/actions/stripe";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Preise & Mitgliedschaften",
  description: "Wählen Sie die Mitgliedschaft, die am besten zu Ihnen passt.",
};

export default async function PricingPage() {
  let products: Stripe.Product[] = [];
  let error;

  try {
    products = await getProductsList();
  } catch (err) {
    console.error(err);
    error = true;
  }

  return (
    <PageContainer containerOverrides={{ maxWidth: "xl" }}>
      <Stack
        spacing={4}
        sx={{
          pb: 6,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
          }}
        >
          Unsere Preise
        </Typography>
        <PricingSection products={products} />
        <Box
          sx={{
            width: 353,
          }}
        >
          <Button
            id="payment-button"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            LinkComponent={NextLink}
            href="/registrieren"
            endIcon={<ArrowForward />}
          >
            Jetzt registrieren
          </Button>
        </Box>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
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
          . Wenn Sie weitere Fragen haben, werfen Sie einen Blick auf unsere{" "}
          <Link href="/faq" component={NextLink}>
            FAQ
          </Link>{" "}
          oder{" "}
          <Link href="#" component={NextLink}>
            kontaktieren Sie uns
          </Link>
          !
        </Typography>
      </Stack>
    </PageContainer>
  );
}
