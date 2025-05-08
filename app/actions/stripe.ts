"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { stripe } from "@/lib/payment/stripe";
import { SubscriptionWithSchedule } from "@/types/subscription";
import dayjs from "dayjs";

export async function createCheckoutSession({
  eventId,
  seats,
  cancelUrl,
  successUrl,
}: {
  eventId: string;
  seats: number;
  cancelUrl: string;
  successUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const product = await stripe.products.retrieve(
    process.env.EVENT_SIGNUP_PRODUCT_ID as string,
    {
      expand: ["default_price"],
    }
  );

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      line_items: [
        {
          price: (product.default_price as Stripe.Price).id,
          quantity: seats,
        },
      ],
      automatic_tax: {
        enabled: true,
        liability: {
          type: "self",
        },
      },
      metadata: {
        event_id: eventId,
      },
      ui_mode: "hosted",
      locale: "de",
      success_url: `${successUrl}?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancelUrl}`,
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: false,
    });

  return JSON.parse(JSON.stringify(checkoutSession));
}

export async function createSetupSession({
  subscriptionId,
}: {
  subscriptionId: string;
}): Promise<{
  client_secret: string | null;
}> {
  const origin: string = (await headers()).get("origin") as string;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!subscription) {
    throw new Error(`Subscription not found: ${subscriptionId}`);
  }

  const setupSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "setup",
      customer: subscription.customer as string,
      setup_intent_data: {
        metadata: {
          customer_id: subscription.customer as string,
          subscription_id: subscription.id,
        },
      },
      currency: "eur",
      ui_mode: "embedded",
      locale: "de",
      return_url: `${origin}/app/zahlungen`,
    });

  return {
    client_secret: setupSession.client_secret,
  };
}

export async function getCheckoutSession({
  sessionId,
}: {
  sessionId: string;
}): Promise<Stripe.Checkout.Session | null> {
  if (!sessionId) return null;

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data"],
  });

  return JSON.parse(JSON.stringify(checkoutSession)) as Stripe.Checkout.Session;
}

export async function getProduct({
  productId,
}: {
  productId?: string;
}): Promise<Stripe.Product | null> {
  if (!productId) return null;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  return JSON.parse(JSON.stringify(product)) as Stripe.Product;
}

export async function getProductsList(): Promise<Stripe.Product[]> {
  const products = await stripe.products.list({
    active: true,
    created: { lt: dayjs("2024-11-01").unix() },
    expand: ["data.default_price"],
  });

  return products.data;
}

export async function getSubscription(
  subscriptionId?: string
): Promise<SubscriptionWithSchedule | null> {
  if (!subscriptionId) return null;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price.product"],
  });

  const subscriptionSchedule = await stripe.subscriptionSchedules.list({
    customer: subscription.customer as string,
    expand: ["data.phases.items.price"],
  });

  const schedule = subscriptionSchedule.data.find(
    (schedule) => schedule.subscription === subscription.id
  );

  // Prevent unserialised data from being sent to the client
  return JSON.parse(
    JSON.stringify({ ...subscription, schedule })
  ) as SubscriptionWithSchedule;
}

export async function getInvoices(
  subscriptionId?: string
): Promise<Stripe.Invoice[] | null> {
  if (!subscriptionId) return null;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const customer = subscription?.customer as string;

  const result = await stripe.invoices.list({
    customer,
    expand: ["data.payment_intent", "data.payment_intent.payment_method"],
  });

  return result.data;
}

export async function getPaymentMethod(
  subscriptionId?: string
): Promise<Stripe.PaymentMethod | null> {
  if (!subscriptionId) return null;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  const paymentMethod =
    subscription.default_payment_method as Stripe.PaymentMethod;

  return paymentMethod;
}

export async function updateSubscription({
  subscriptionId,
  productId,
}: {
  subscriptionId: string;
  productId: string;
}): Promise<SubscriptionWithSchedule> {
  const product = await stripe.products.retrieve(productId);

  const priceId = product.default_price as string;

  const subscription = await stripe.subscriptions.update(subscriptionId, {
    metadata: {
      credits: product.metadata.credits,
    },
    expand: ["items.data.price.product"],
  });

  const existingSchedules = await stripe.subscriptionSchedules.list({
    customer: subscription.customer as string,
  });

  const existingSchedule = existingSchedules.data.find(
    (schedule) => schedule.subscription === subscription.id
  );

  if (existingSchedule) {
    await stripe.subscriptionSchedules.release(existingSchedule.id);
  }

  const schedule = await stripe.subscriptionSchedules.create({
    from_subscription: subscriptionId,
  });

  const subscriptionSchedule = await stripe.subscriptionSchedules.update(
    schedule.id,
    {
      phases: [
        {
          items: [
            {
              price: schedule.phases[0].items[0].price as string,
              quantity: schedule.phases[0].items[0].quantity,
            },
          ],
          start_date: schedule.phases[0].start_date,
          end_date: schedule.phases[0].end_date,
        },
        {
          items: [
            {
              price: priceId,
            },
          ],
          iterations: 1,
        },
      ],
      expand: ["phases.items.price"],
    }
  );

  return JSON.parse(
    JSON.stringify({ ...subscription, schedule: subscriptionSchedule })
  );
}

export async function generateCouponForUser({
  userId,
}: {
  userId: string;
}): Promise<Stripe.Coupon> {
  const coupon = await stripe.coupons.create({
    amount_off: 1,
    currency: "eur",
    max_redemptions: 1,
    applies_to: {
      products: [process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID as string],
    },
    id: userId,
  });

  return JSON.parse(JSON.stringify(coupon)) as Stripe.Coupon;
}

export async function retrieveCouponForUser({
  userId,
}: {
  userId: string;
}): Promise<Stripe.Coupon | null> {
  try {
    const coupon = await stripe.coupons.retrieve(userId);

    return JSON.parse(JSON.stringify(coupon)) as Stripe.Coupon;
  } catch (err) {
    return null;
  }
}

// function mapProductToSubscriptionItem(product: Stripe.Product): Subscription {
//   // Needs to be expanded to get the full price object
//   const defaultPrice = product.default_price as Stripe.Price;

//   const priceNumerical = (defaultPrice?.unit_amount || NaN) / 100;

//   return {
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: priceNumerical,
//     credits: product.metadata.credits,
//     label: product.metadata.label,
//     defaultPricePerBookingLabel: defaultPrice?.metadata?.saving,
//   };
// }
