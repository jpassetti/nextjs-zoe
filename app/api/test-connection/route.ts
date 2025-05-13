import { NextResponse } from "next/server";

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

// ✅ API Route: POST - Test API Connection
export async function POST(req: Request) {
  try {
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

    // ✅ If authenticated, return success
    return NextResponse.json(
      { message: "✅ API connection successful!" },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Error in test connection:", error);
    return NextResponse.json(
      { error: "❌ Failed to connect to API." },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}