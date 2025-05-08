"use server";

import { ordersController } from "@/lib/payment/paypal";
import {
  AmountWithBreakdown,
  ApiError,
  CheckoutPaymentIntent,
  Item,
  OrderRequest,
} from "@paypal/paypal-server-sdk";

const BOOKING_PRICE = 6.3;
const BOOKING_TAX = 1.2;

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export const createOrder = async (eventId: string, seats: number) => {
  const items: Item[] = getItems(seats);

  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: getAmount(seats),
          customId: `${eventId}:${new Date().toISOString()}`,
          items: items,
        },
      ],
    } as OrderRequest,
    prefer: "return=minimal",
  };

  try {
    const { result } = await ordersController.ordersCreate(collect);

    return result;
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Failed to create order");
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export const captureOrder = async (orderID: string) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { result } = await ordersController.ordersCapture(collect);

    return result;
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Failed to capture order");
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const { result } = await ordersController.ordersGet({
      id: orderId,
    });

    return result;
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Failed to get order");
  }
};

function getAmount(seats: number): AmountWithBreakdown {
  const total = BOOKING_PRICE * seats;
  const tax = BOOKING_TAX * seats;

  return {
    currencyCode: "EUR",
    value: (total + tax).toFixed(2),
    breakdown: {
      itemTotal: {
        currencyCode: "EUR",
        value: total.toFixed(2),
      },
      taxTotal: {
        currencyCode: "EUR",
        value: tax.toFixed(2),
      },
    },
  };
}

function getItems(seats: number): Item[] {
  return [
    {
      name: "Figo Social - Reservierung Ü60-Treffen",
      quantity: seats.toFixed(0),
      unitAmount: {
        currencyCode: "EUR",
        value: BOOKING_PRICE.toFixed(2),
      },
      tax: {
        currencyCode: "EUR",
        value: BOOKING_TAX.toFixed(2),
      },
    },
  ];
}
