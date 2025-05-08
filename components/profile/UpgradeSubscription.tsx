"use client";

import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { Alert, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

export default function UpgradeSubscription() {
  const { product, subscription, loading } = useContext(SubscriptionContext);

  if (loading) {
    return null;
  }

  if (!product || (subscription && product?.name === "Figo L")) {
    return null;
  }

  if (product && !subscription) {
    return null;
  }

  return (
    <Alert
      severity="info"
      sx={{
        background: {
          xs: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(/painting-class.webp) no-repeat center -20px / cover",
          md: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(/painting-class.webp) no-repeat center -150px / cover",
        },
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        textAlign: { xs: "center", md: "left" },
        borderRadius: "10px",
        py: 1,
        px: 4,
        gap: 1,
        "& .MuiAlert-action": {
          marginLeft: "unset",
          flexGrow: 1,
          padding: 0,
          justifyContent: { xs: "flex-start", md: "flex-end" },
        },
      }}
      icon={false}
      action={
        <Box
          sx={{
            mb: 0.5,
            alignSelf: "center",
            color: "white",
            flexBasis: 300,
          }}
        >
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            fullWidth
            href="/app/mitgliedschaft"
            LinkComponent={Link}
            sx={{
              borderWidth: 2,
            }}
          >
            Abo ändern
          </Button>
        </Box>
      }
    >
      <Typography
        color="white"
        sx={{
          fontSize: 24,
          lineHeight: "34px",
          fontWeight: 700,
          textTransform: "uppercase",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
        }}
      >
        Zu Figo L wechseln
      </Typography>
      <Typography
        color="white"
        sx={{
          lineHeight: "20px",
        }}
      >
        So erhalten Sie Zugang zu 8 Aktivitäten pro Monat*
      </Typography>
      <Typography
        color="white"
        sx={{
          fontSize: 16,
          lineHeight: "24px",
        }}
      >
        *Ihr Guthaben verfällt nicht
      </Typography>
    </Alert>
  );
}
