import React from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { redirect, RedirectType } from "next/navigation";
import { ErrorPage, Loading, PageContainer } from "@/components";
import { headers as headersPromise } from "next/headers";
import Stripe from "stripe";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function PaymentPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [x: string]: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const headers = await headersPromise();

  const host = headers.get("host");
  const proto = headers.get("x-forwarded-proto") || "https";

  const baseUrl = `${proto}://${host}`;

  const eventId = searchParams["eid"];
  const seats = parseInt(searchParams["seats"] || "1", 10);

  if (!eventId) {
    redirect("/");
  }

  let checkoutSession: Stripe.Checkout.Session | null = null;

  // Create a Checkout Session as soon as the page loads
  try {
    checkoutSession = await createCheckoutSession({
      eventId,
      cancelUrl: baseUrl,
      successUrl: `${baseUrl}/zahlung/bestaetigt`,
      seats,
    });
  } catch (err) {
    console.error(err);
    return (
      <PageContainer>
        <ErrorPage>
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </ErrorPage>
      </PageContainer>
    );
  }

  if (checkoutSession) {
    redirect(checkoutSession.url as string, RedirectType.replace);
  }

  return <Loading />;
}
