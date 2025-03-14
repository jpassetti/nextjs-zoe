import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
 useCdn: false,
 apiVersion: "2024-03-07",
 token: process.env.SANITY_API_WRITE_TOKEN!, // Requires a write-enabled API token
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

  // Transform responses into the correct format for Sanity
  const formattedResponses = Object.entries(responses).map(
   ([question, answer]) => {
    const isArray = Array.isArray(answer);

    return {
     question,
     answer: isArray ? answer : [answer], // Ensure all answers are stored as arrays
     other:
      isArray && answer.includes("Other")
       ? responses[`${question}_other`] || ""
       : undefined, // Store "Other" response if applicable
    };
   }
  );

  // Create a new response document in Sanity
  const newResponse = await sanityClient.create({
   _type: "responses",
   questionnaireId,
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
