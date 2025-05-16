import { NextResponse } from "next/server";

// ✅ CORS Configuration
const allowedOrigins = [
  "https://transform-with-irini.sanity.studio",
  "https://www.irini.io"
];

function getCorsHeaders(origin: string | null) {
  const sanitizedOrigin = origin || ""; // Ensure origin is a string
  const isAllowed = allowedOrigins.includes(sanitizedOrigin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? sanitizedOrigin : "null",
    "Access-Control-Allow-Methods": "PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// ✅ Handle OPTIONS (CORS preflight)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (!allowedOrigins.includes(origin || "")) {
    return NextResponse.json(
      { error: "Origin not allowed." },
      {
        status: 403,
        headers: corsHeaders,
      }
    );
  }

  return NextResponse.json(null, {
    headers: corsHeaders,
  });
}

// ✅ API Route: PUT - Copy Production to Staging
export async function PUT(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (!allowedOrigins.includes(origin || "")) {
    return NextResponse.json(
      { error: "Origin not allowed." },
      {
        status: 403,
        headers: corsHeaders,
      }
    );
  }

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
      `https://api.sanity.io/v2025-02-19/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/production/copy`,
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

    const responseText = await response.text();
    console.log("✅ Sanity Response:", responseText);

    if (!response.ok) {
      console.error("❌ Error response from Sanity:", responseText);

      // Enhanced error handling for invalid dataset names or insufficient permissions
      if (response.status === 400) {
        return NextResponse.json(
          { error: "Invalid dataset name or request parameters." },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      } else if (response.status === 403) {
        return NextResponse.json(
          { error: "Insufficient permissions to perform this operation." },
          {
            status: 403,
            headers: corsHeaders,
          }
        );
      }

      return NextResponse.json(
        { error: `❌ Failed to copy to Staging: ${responseText}` },
        {
          status: response.status,
          headers: corsHeaders,
        }
      );
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