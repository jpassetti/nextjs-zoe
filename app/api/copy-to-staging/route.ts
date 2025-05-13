import { NextResponse } from "next/server";

// ✅ CORS Configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://transform-with-irini.sanity.studio",
  "Access-Control-Allow-Methods": "PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle OPTIONS (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: corsHeaders,
  });
}

// ✅ API Route: PUT - Copy Production to Staging
export async function PUT(req: Request) {
  let secret = null;

  try {
    const body = await req.text();
    secret = JSON.parse(body)?.secret;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON input. Ensure you are sending a valid JSON body." },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }

  const secretKey = process.env.SANITY_API_SECRET;

  // ✅ Verify the secret key
  if (!secret || secret !== secretKey) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  try {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/production/copy`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetDataset: "staging", // Target dataset name
          skipHistory: true,       // Optionally skip history to speed up the copy
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error response from Sanity:", errorText);
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