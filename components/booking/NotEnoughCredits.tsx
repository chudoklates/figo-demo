import { UserContext } from "@/lib/context/UserContext";
import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
import { Skeleton, Stack, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { Suspense, useContext } from "react";

const EmptyState = () => {
  return (
    <Typography component="span">
      Sie haben keine aktive Mitgliedschaft.{" "}
      <Link href="/app/mitgliedschaft" component={NextLink}>
        Abonnieren Sie jetzt
      </Link>
      , um Aktivitäten zu genießen.
    </Typography>
  );
};

const SubscriptionDisplay = () => {
  const { subscription } = useContext(SubscriptionContext);

  if (!subscription) return <EmptyState />;

  const currentPeriodEndDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end * 1000)
    : null;

  if (!currentPeriodEndDate) return null;

  const currentPeriodEndDateFormatted = currentPeriodEndDate.toLocaleDateString(
    "de-DE",
    {
      month: "numeric",
      year: "numeric",
      day: "numeric",
    }
  );

  return (
    <Typography component="span">
      Leider haben Sie Ihr monatliches Aktivitätsguthaben bereits aufgebraucht.
      Aber keine Sorge,{" "}
      <strong>
        Ihr Zyklus wird am {currentPeriodEndDateFormatted} zurückgesetzt
      </strong>
      , so dass Sie bald mehr Aktivitäten genießen können!
    </Typography>
  );
};

export default function NotEnoughCredits() {
  const { user } = useContext(UserContext);

  if (!user?.stripe_subscription_id) {
    return (
      <Stack
        sx={{
          pt: 5,
          alignItems: "center",
          textAlign: "center",
          minWidth: { xs: "unset", md: 450 },
        }}
      >
        <Typography variant="h3" gutterBottom>
          Jetzt Mitglied werden
        </Typography>
        <EmptyState />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        pt: 5,
        alignItems: "center",
        textAlign: "center",
        minWidth: { xs: "unset", md: 450 },
      }}
    >
      <Typography variant="h3" gutterBottom>
        Aktivitätsgrenze erreicht
      </Typography>
      <Typography variant="h5" gutterBottom>
        Es scheint, dass Sie keine Aktivität mehr haben
      </Typography>
      <Suspense
        fallback={
          <Skeleton variant="rectangular">
            <EmptyState />
          </Skeleton>
        }
      >
        <SubscriptionDisplay />
      </Suspense>
    </Stack>
  );
}
