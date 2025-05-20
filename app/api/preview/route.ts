import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }

  // Enable draft/preview mode
  draftMode().enable();

  // Build absolute redirect URL
  const origin = req.headers.get("origin") || `${new URL(req.url).protocol}//${new URL(req.url).host}`;
  const redirectUrl = slug.startsWith("/") ? `${origin}${slug}` : `${origin}/${slug}`;

  return NextResponse.redirect(redirectUrl);
}