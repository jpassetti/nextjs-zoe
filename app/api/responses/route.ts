import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
 useCdn: false,
 apiVersion: "2024-03-07",
});

export async function GET() {
 try {
  const query = `*[_type == "responses"] | order(submittedAt desc) {
    _id,
    submittedAt,
    "submitterName": data[question == "Name"][0].answer[0],
    data
  }`;

  const responses = await sanityClient.fetch(query);

  return NextResponse.json(responses);
 } catch (error) {
  console.error("Error fetching responses:", error);
  return NextResponse.json(
   { error: "Failed to fetch responses" },
   { status: 500 }
  );
 }
}
