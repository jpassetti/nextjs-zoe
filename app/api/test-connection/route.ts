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
    const { secret } = await req.json();
    const secretKey = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;

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