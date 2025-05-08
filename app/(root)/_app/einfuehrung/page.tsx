"use client";

import { Loading } from "@/components";
import { UserContext } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

// Just a catch-all in case the user navigates directly to /app/einfuehrung
export default function Onboarding() {
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.status === "ONBOARDED") {
        router.replace("/app/dashboard");
      }

      if (user?.onboarding_progress?.status_tech_name) {
        router.replace(
          `/app/einfuehrung/${user.onboarding_progress.status_tech_name}`
        );
      }
    }
  }, [user, router]);

  return <Loading />;
}
