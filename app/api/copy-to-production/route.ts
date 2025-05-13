import { NextResponse } from "next/server";

// ✅ Secure the secret key
const secretKey = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;

// ✅ API Route: POST - Copy Staging to Production
export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  // ✅ Verify the secret key
  if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/production/copy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "staging",
          target: "production",
          includeTypes: true,
          excludeTypes: [],
          skipMissingAssets: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Sanity:", errorText);
      throw new Error(`Failed to copy dataset to Production. ${errorText}`);
    }

    return NextResponse.json({ message: "✅ Successfully copied to Production." });
  } catch (error) {
    console.error("❌ Error copying dataset:", error);
    return NextResponse.json(
      { error: "❌ Failed to copy to Production." },
      { status: 500 }
    );
  }
}