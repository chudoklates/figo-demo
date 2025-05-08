"use client";

import { navigateReplace } from "@/lib/routing";
import { useEffect } from "react";

export default function TimedRedirect() {
  useEffect(() => {
    setTimeout(() => {
      navigateReplace("/app/mitgliedschaft?success=1");
    }, 1000);
  }, []);

  return null;
}
