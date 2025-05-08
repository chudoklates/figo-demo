"use server";

import { sendEmail, sendEmailFromTemplate } from "@/lib/email";

export const sendContactMessage = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}) => {
  const to = process.env.BREVO_CONTACT_EMAIL;

  if (!to) {
    console.error("Brevo contact email is missing");
    return null;
  }

  const htmlContent = `
    <p>Vorname: ${data.firstName}</p>
    <p>Nachname: ${data.lastName}</p>
    <p>E-Mail: ${data.email}</p>
    <p>Nachricht:</p>
    <p>${data.message}</p>
  `;

  return sendEmail({
    to,
    from: "system@figosocial.de",
    subject: "Kontaktanfrage",
    htmlContent,
  });
};

export const sendSubscriptionChangeNotification = async ({
  email,
  currentSubscription,
  newSubscription,
}: {
  email: string;
  currentSubscription: string;
  newSubscription: string;
}) => {
  const to = process.env.BREVO_CONTACT_EMAIL;

  if (!to) {
    console.error("Brevo contact email is missing");
    return null;
  }

  const htmlContent = `
    <p>Customer ${email} has requested an immediate subscription change.</p>
    <p>Current subscription: ${currentSubscription}</p>
    <p>New subscription: ${newSubscription}</p>
  `;

  return sendEmail({
    to,
    from: "system@figosocial.de",
    subject: "A customer has requested an immediate subscription change",
    htmlContent,
  });
};

export const sendSubscriptionRenewNotification = async ({
  email,
  currentSubscription,
}: {
  email: string;
  currentSubscription: string;
}) => {
  const to = process.env.BREVO_CONTACT_EMAIL;

  if (!to) {
    console.error("Brevo contact email is missing");
    return null;
  }

  const htmlContent = `
    <p>Customer ${email} has requested an immediate renewal of their subscription ${currentSubscription}.</p>
  `;

  return sendEmail({
    to,
    from: "system@figosocial.de",
    subject:
      "A customer has requested an immediate renewal of their subscription",
    htmlContent,
  });
};

export const sendUserBookingNotification = async ({
  email,
  params,
}: {
  email: string;
  params: { [x: string]: any };
}) => {
  return sendEmailFromTemplate({
    to: email,
    templateId: 3,
    params,
  });
};

export const sendAdminBookingNotification = async (params: {
  [x: string]: any;
}) => {
  const to = process.env.BREVO_CONTACT_EMAIL;

  if (!to) {
    console.error("Brevo contact email is missing");
    return null;
  }

  return sendEmailFromTemplate({
    to,
    templateId: 10,
    params,
  });
};
