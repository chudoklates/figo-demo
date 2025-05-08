"use server";

export async function sendEmail({
  to,
  from,
  bcc,
  subject,
  htmlContent,
}: {
  to: string;
  from: string;
  bcc?: Array<{ email: string }>;
  subject: string;
  htmlContent: string;
}) {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoApiLink = process.env.BREVO_API_URL;

  if (!brevoApiKey) {
    console.error("Brevo API key is missing");
    return null;
  }

  if (!brevoApiLink) {
    console.error("Brevo API link is missing");
    return null;
  }

  const emailData = {
    sender: {
      email: from,
    },
    to: [
      {
        email: to,
      },
    ],
    bcc,
    subject,
    htmlContent,
  };

  try {
    const response = await fetch(brevoApiLink, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
}

export async function sendEmailFromTemplate({
  templateId,
  params,
  to,
  from,
  bcc,
  subject,
}: {
  templateId: number | `${number}`;
  params: Record<string, any>;
  to: string;
  from?: string;
  bcc?: Array<{ email: string }>;
  subject?: string;
}) {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoApiLink = process.env.BREVO_API_URL;

  if (!brevoApiKey) {
    console.error("Brevo API key is missing");
    return null;
  }

  if (!brevoApiLink) {
    console.error("Brevo API link is missing");
    return null;
  }

  const emailData = {
    ...(from && {
      sender: {
        email: from,
      },
    }),
    to: [
      {
        email: to,
      },
    ],
    bcc,
    subject,
    templateId,
    params,
  };

  try {
    const response = await fetch(brevoApiLink, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
}
