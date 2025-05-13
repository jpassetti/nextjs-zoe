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
    const result = await fetch(
      `https://api.sanity.io/v1/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/production/copy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "staging",
          targetDataset: "production",
          includeTypes: true,
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to copy dataset to Production");
    }

    return NextResponse.json({ message: "Successfully copied to Production." });
  } catch (error) {
    console.error("Error copying dataset:", error);
    return NextResponse.json(
      { error: "Failed to copy to Production." },
      { status: 500 }
    );
  }
}