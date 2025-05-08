import { crc32 } from "node:zlib";
import { createVerify } from "node:crypto";

export async function verifySignature(raw: string, headers: Headers) {
  const transmissionId = headers.get("paypal-transmission-id");
  const timeStamp = headers.get("paypal-transmission-time");

  const certURL = headers.get("paypal-cert-url");
  const signature = headers.get("paypal-transmission-sig");

  if (!transmissionId || !timeStamp || !certURL || !signature) {
    throw new Error("Missing required headers");
  }

  const crc = parseInt(`0x${crc32(raw).toString(16)}`); // hex crc32 of raw event data, parsed to decimal form

  const message = `${transmissionId}|${timeStamp}|${process.env.PAYPAL_WEBHOOK_ID}|${crc}`;

  console.log(`Original signed message ${message}`);

  const certPem = await fetch(certURL, { cache: "force-cache" }).then((res) =>
    res.text()
  );

  // Create buffer from base64-encoded signature
  const signatureBuffer = Buffer.from(signature, "base64");

  // Create a verification object
  const verifier = createVerify("SHA256");

  // Add the original message to the verifier
  verifier.update(message);

  const isValid = verifier.verify(certPem, signatureBuffer);

  if (!isValid) {
    throw new Error("Invalid signature");
  }
}
