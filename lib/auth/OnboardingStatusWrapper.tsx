"use client";

import React, { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loading } from "@/components";
import { UserContext } from "@/lib/context/UserContext";

export default function OnboardingStatusWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useContext(UserContext);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const { onboarding_progress, status } = user || {};

      if (
        status &&
        onboarding_progress?.status_tech_name &&
        status !== "ONBOARDED" &&
        onboarding_progress?.status_tech_name !== "onboarded" &&
        !pathname.includes("/einfuehrung")
      ) {
        router.replace(
          `/app/einfuehrung/${onboarding_progress.status_tech_name}`
        );
      }
    }
  }, [user, router, pathname]);

  if (loading) return <Loading />;

  return children;
}
