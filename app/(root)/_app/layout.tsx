import React, { Suspense } from "react";
import { Loading } from "@/components";
import AuthWrapper from "@/lib/auth/AuthWrapper";
import OnboardingStatusWrapper from "@/lib/auth/OnboardingStatusWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        <OnboardingStatusWrapper>{children}</OnboardingStatusWrapper>
      </AuthWrapper>
    </Suspense>
  );
}
