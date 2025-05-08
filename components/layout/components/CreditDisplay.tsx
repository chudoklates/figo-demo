import { UserContext } from "@/lib/context/UserContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { Box, Button, ButtonProps, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { DropdownContext } from "./UserDropdown";

const ACTIONS: Record<string, Partial<ButtonProps>> = {
  "Kurskatalog einsehen": {
    href: "/kurskatalog",
    variant: "text" as const,
    sx: {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: "28px",
      py: 0,
    },
  },
  "Jetzt abonnieren": {
    href: "/app/mitgliedschaft",
    variant: "contained" as const,
    sx: {
      mt: 2,
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "30px",
      py: 0.5,
      textTransform: "none",
    },
  },
};

export default function CreditDisplay() {
  const { user } = useContext(UserContext);

  const credits = user?.credits || 0;

  const { subscription, product } = useContext(SubscriptionContext);

  const { handleClose } = useContext(DropdownContext);

  const subscribed = !!subscription;

  const secondary =
    credits === 0 ? (
      "Sie haben gerade keine Aktivitäten zur Verfügung."
    ) : subscribed || !!product ? (
      "verfügbar"
    ) : (
      <em>Ihre erste Aktivität ist kostenlos!</em>
    );

  const tertiary =
    credits === 0
      ? subscribed
        ? "Neue Aktivitäten werden bei der Erneuerung Ihres Abonnements hinzugefügt."
        : "Wählen Sie ein Abo oder Karte, um mehr Aktivitäten zu bekommen!"
      : "";

  const action = credits > 0 ? "Kurskatalog einsehen" : undefined;

  return (
    <Box
      sx={{
        px: 2.5,
        py: 2,
        border: "2px solid #FFC998",
        borderRadius: "20px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
        textAlign: "center",
        maxWidth: 320,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {credits} Aktivität{credits === 1 ? "" : "en"}
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 16,
          lineHeight: "20px",
        }}
      >
        {secondary}
      </Typography>
      {tertiary && (
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 16,
            lineHeight: "20px",
            fontWeight: 700,
          }}
        >
          {tertiary}
        </Typography>
      )}
      {action && (
        <Button
          LinkComponent={Link}
          color="secondary"
          onClick={handleClose}
          {...ACTIONS[action]}
        >
          {action}
        </Button>
      )}
    </Box>
  );
}
