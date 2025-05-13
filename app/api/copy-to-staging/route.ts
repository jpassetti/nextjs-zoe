import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secretKey = process.env.SANITY_API_SECRET;
  const authHeader = req.headers.get("authorization");

  // ✅ Verify the secret key
  if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Set CORS Headers
  const responseHeaders = new Headers();
  responseHeaders.set("Access-Control-Allow-Origin", "https://transform-with-irini.sanity.studio");
  responseHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    const result = await fetch(
      `https://api.sanity.io/v1/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/staging/copy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "production",
          targetDataset: "staging",
          includeTypes: true,
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to copy dataset to Staging");
    }

    return new NextResponse(
      JSON.stringify({ message: "Successfully copied to Staging." }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to copy to Staging." }),
      {
        status: 500,
        headers: responseHeaders,
      }
    );
  }
}