import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  const draft = await draftMode();

  if (!path) {
    return new Response("Invalid path", { status: 400 });
  }

  // Enable Draft Mode by setting the cookie
  draft.disable();

  redirect(path);
}
