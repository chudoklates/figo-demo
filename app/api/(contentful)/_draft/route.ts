import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  const draft = await draftMode();

  const isDevelopment = process.env.NODE_ENV === "development";

  if (!path) {
    return new Response("Invalid path", { status: 400 });
  }

  if (isDevelopment) {
    draft.enable();

    redirect(path);
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draft.enable();

  redirect(path);
}
