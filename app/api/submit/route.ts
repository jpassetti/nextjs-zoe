import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";

const sanityClient = createClient({
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
 useCdn: false,
 apiVersion: "2024-03-07",
 token: process.env.SANITY_API_WRITE_TOKEN!,
});

export async function POST(req: Request) {
 try {
  const { questionnaireId, responses } = await req.json();

  if (!questionnaireId || !responses) {
   return NextResponse.json(
    { error: "Missing questionnaire ID or responses" },
    { status: 400 }
   );
  }

  // Extract submitted name
  const submittedName = responses["Name"] || "Unnamed Submission";

  // Transform responses for Sanity
  const formattedResponses = Object.entries(responses).map(
   ([question, answer]) => ({
    _key: uuidv4(), // ✅ Generate unique keys (Sanity requires _key for arrays via API)
    question,
    answer: Array.isArray(answer) ? answer : [answer], // Store answers as arrays
   })
  );

  // Create a new response document in Sanity
  const newResponse = await sanityClient.create({
   _type: "responses",
   title: submittedName, // ✅ Use Name field as the document title
   questionnaireId: { _ref: questionnaireId, _type: "reference" },
   submittedAt: new Date().toISOString(),
   data: formattedResponses,
  });

  return NextResponse.json(
   { message: "Submission successful", responseId: newResponse._id },
   { status: 200 }
  );
 } catch (error) {
  console.error("Error submitting form:", error);
  return NextResponse.json(
   { error: "Failed to submit response" },
   { status: 500 }
  );
 }
}
