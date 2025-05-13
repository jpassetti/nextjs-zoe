// /app/api/copy-to-staging/route.ts
import { NextResponse } from "next/server";

// ✅ Secure API route for copying Production to Staging
export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  // ✅ Allow only your Sanity Studio origin
  if (origin !== "https://transform-with-irini.sanity.studio") {
    return NextResponse.json(
      { error: "Unauthorized origin" },
      { status: 403 }
    );
  }

  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/datasets/staging/copy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "production",
          target: "staging",
          includeTypes: true,
          replace: true,
        }),
      }
    );

    if (!result.ok) {
      console.error("Sanity API Error:", await result.text());
      return NextResponse.json(
        { error: "Failed to copy dataset to Staging" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully copied to Staging.",
    });
  } catch (error) {
    console.error("Error copying to Staging:", error);
    return NextResponse.json(
      { error: "Failed to copy to Staging." },
      { status: 500 }
    );
  }
}