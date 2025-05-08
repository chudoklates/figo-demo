"use client";

import { UserContext } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext, useEffect, useRef } from "react";

export default function OnboardedWrapper({ children }: PropsWithChildren) {
  const { user } = useContext(UserContext);

  const onboardingStatus = useRef(user?.status);

  const router = useRouter();

  useEffect(() => {
    if (onboardingStatus.current === "ONBOARDED") {
      router.replace("/app/dashboard");
    }
  }, [router]);

  if (onboardingStatus.current === "ONBOARDED") {
    return null;
  }

  return children;
}
