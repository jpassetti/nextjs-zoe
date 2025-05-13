import { NextResponse } from "next/server";

// ✅ Secure the secret key
const secretKey = process.env.SANITY_API_SECRET;

// ✅ CORS Configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://transform-with-irini.sanity.studio",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle OPTIONS (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: corsHeaders,
  });
}

// ✅ API Route: POST - Copy Production to Staging
export async function POST(req: Request) {
  const { secret } = await req.json();

  // ✅ Verify the secret key from request body
  if (!secret || secret !== secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/staging/copy`,
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
          excludeTypes: [],
          skipMissingAssets: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Sanity:", errorText);
      throw new Error(`Failed to copy dataset to Staging. ${errorText}`);
    }

    return NextResponse.json(
      { message: "✅ Successfully copied to Staging." },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Error copying dataset:", error);
    return NextResponse.json(
      { error: "❌ Failed to copy to Staging." },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}