import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: Request) {
  const dm = await draftMode();
  dm.disable();

  const { searchParams } = new URL(req.url);
  const redirectPath = searchParams.get("redirect") || "/";
  // Build absolute URL for redirect
  const url = new URL(redirectPath, req.url);
  url.search = ""; // Remove any query params from the redirect

  return NextResponse.redirect(url.toString());
}