"use client";

import React, { useEffect } from "react";
import "./overrides.css";

export default function NewsletterSignupForm({
  suffix,
}: {
  suffix: "-main" | "-bottom";
}) {
  const id = `newsletter${suffix}` as const;

  useEffect(() => {
    window.hbspt.forms.create({
      portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
      formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,
      target: `#${id}`,
      locale: "de-DE",
      formInstanceId: id,
      ...(id === "newsletter-main" && {
        errorMessageClass: "hs-error-msgs--main",
      }),
    });
  }, [id]);

  return <div id={id} />;
}
