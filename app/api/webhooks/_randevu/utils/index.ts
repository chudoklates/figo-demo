import crypto from "node:crypto";

export const verifyRandevuWebhook = (signature: string | null, body: any) => {
  if (!signature) {
    throw new Error("No signature provided");
  }

  const digest = crypto
    .createHmac("sha256", process.env.RANDEVU_WEBHOOK_SECRET as string)
    .update(JSON.stringify(JSON.stringify(body))) // double stringify is intentional
    .digest("hex");

  const sigBuffer = Buffer.from(signature, "utf8");
  const digestBuffer = Buffer.from(digest, "utf8");

  const isEqual = crypto.timingSafeEqual(sigBuffer, digestBuffer);

  if (!isEqual) {
    throw new Error("Invalid signature");
  }
};
