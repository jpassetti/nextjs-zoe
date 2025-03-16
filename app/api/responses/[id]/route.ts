import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// ✅ Initialize Sanity Client
const sanityClient = createClient({
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
 useCdn: false,
 apiVersion: "2024-03-07",
});

// ✅ Correct API Route Format for Next.js 14+ (App Router)
export async function GET(
 req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const { id } = await params; // 'a', 'b', or 'c'
  if (!id) {
   return NextResponse.json({ error: "Missing response ID" }, { status: 400 });
  }

  const query = `*[_type == "responses" && _id == $id][0] {
      _id,
      submittedAt,
      "questionnaireTitle": questionnaireId->title,
      data
    }`;

  const response = await sanityClient.fetch(query, { id });

  if (!response) {
   return NextResponse.json({ error: "Response not found" }, { status: 404 });
  }

  return NextResponse.json(response);
 } catch (error) {
  console.error("Error fetching response:", error);
  return NextResponse.json(
   { error: "Failed to fetch response" },
   { status: 500 }
  );
 }
}
