import "server-only";

import {
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} from "@paypal/paypal-server-sdk";

export const paypal = new Client({
  environment:
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
      ? Environment.Production
      : Environment.Sandbox,
  timeout: 0,
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
  },
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

export const ordersController = new OrdersController(paypal);
export const paymentsController = new PaymentsController(paypal);
