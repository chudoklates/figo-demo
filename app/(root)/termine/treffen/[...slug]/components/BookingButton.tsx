"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { LoadingButton } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingButton({
  eventId,
  disabled,
  seats,
}: {
  eventId: string;
  disabled: boolean;
  seats: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      size="large"
      loading={loading}
      disabled={disabled}
      fullWidth
      sx={{
        px: { xs: 1, sm: 5 },
        height: 55,
        borderRadius: "40px",
        fontWeight: 700,
      }}
      onClick={async (e) => {
        e.preventDefault();

        if (disabled) return;

        setLoading(true);

        const session = await createCheckoutSession({
          eventId,
          seats,
          successUrl: `${window.location.origin}/zahlung/bestaetigt`,
          cancelUrl: `${window.location.href}`,
        });

        if (session?.url) {
          router.push(session.url);
        }

        setLoading(false);
      }}
      href="#"
    >
      Buchen
    </LoadingButton>
  );
}
