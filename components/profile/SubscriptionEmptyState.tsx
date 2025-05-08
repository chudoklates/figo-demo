"use client";

import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { UserContext } from "@/lib/context/UserContext";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

const FlippedBackground = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundBlendMode: "multiply",
      background: {
        xs: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(/painting-class.webp) no-repeat center -20px / cover",
        md: `linear-gradient(90deg, rgba(0, 0, 0, 0.30) 17%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), lightgray url(/register.webp) no-repeat left -17.263px / 41.071% 154.737%;`,
      },
      transform: { xs: "none", md: "scaleX(-1)" },
      zIndex: -1,
      borderRadius: "10px",
    }}
  />
);

const HeaderText = () => (
  <Typography
    color="white"
    sx={{
      fontSize: { xs: 24, md: 32 },
      fontWeight: 700,
      lineHeight: { xs: "26px", md: "36px" },
      letterSpacing: 1.6,
      textTransform: "uppercase",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
    }}
  >
    Jetzt Abos und karten entdecken
  </Typography>
);

export default function SubscriptionEmptyState() {
  const { product, loading } = useContext(SubscriptionContext);
  const { user } = useContext(UserContext);

  const credits = user?.credits || 0;

  if (loading) {
    return <Skeleton variant="rectangular" height={172} />;
  }

  if (product) {
    return null;
  }

  return (
    <Stack
      direction="row"
      sx={{
        p: 3,
        borderRadius: "10px",
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "stretch" },
        position: "relative",
      }}
    >
      <FlippedBackground />
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          textAlign: { xs: "center", md: "left" },
          alignItems: { xs: "center", md: "stretch" },
        }}
      >
        <Box>
          <HeaderText />
          <Typography
            color="white"
            sx={{
              fontSize: { xs: 16, md: 18 },
              lineHeight: { xs: "18px", md: "34px" },
            }}
          >
            und sich exklusiven Zugang zu spannenden Kursen sichern.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-end" },
          }}
        >
          <Box
            sx={{
              maxWidth: 332,
              color: "white",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              sx={{
                py: 1,
                borderWidth: 2,
                borderRadius: "4px",
                fontSize: 18,
                fontWeight: 700,
                lineHeight: "18px",
              }}
              href="/app/mitgliedschaft"
              LinkComponent={Link}
            >
              AB 30€
            </Button>
          </Box>
          {credits > 0 ? (
            <Typography
              color="white"
              sx={{
                fontSize: { xs: 14, md: 16 },
                lineHeight: { xs: "18px", md: "24px" },
              }}
            >
              *Ihr Schnupperkurs bleibt gültig.
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}
