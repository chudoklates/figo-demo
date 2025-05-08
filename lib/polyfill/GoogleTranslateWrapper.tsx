"use client";

import { PropsWithChildren, useEffect } from "react";
import monkeyPatchGoogleTranslate from "./googleTranslate";

/**
 * Wrapper to ensure Google translating the page does not cause crashes
 * @returns
 */
export default function GoogleTranslateWrapper({
  children,
}: PropsWithChildren) {
  useEffect(() => {
    monkeyPatchGoogleTranslate();
  }, []);

  return children;
}
