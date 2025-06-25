import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-03-07",
  token: process.env.SANITY_API_WRITE_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { slug, responses } = await req.json();

    if (!slug || !responses) {
      return NextResponse.json(
        { error: "Missing questionnaire slug or responses" },
        { status: 400 }
      );
    }

    // Extract submitted name and email
    const submittedName = responses["Name"] || "Unnamed Submission";
    const userEmail = responses["Email"] || responses["email"]; // Adjust if your field is named differently

    // Transform responses for Sanity
    const formattedResponses = Object.entries(responses).map(
      ([question, answer]) => ({
        _key: uuidv4(),
        question,
        answer: Array.isArray(answer) ? answer : [answer],
      })
    );

    // Create a new response document in Sanity
    const newResponse = await sanityClient.create({
      _type: "responses",
      title: submittedName,
      slug,
      submittedAt: new Date().toISOString(),
      data: formattedResponses,
    });

    // Send notification to Zoe
    await resend.emails.send({
      from: "notifications@irini.io",
      to: "zoe@irini.io",
      subject: "New Questionnaire Submission",
      html: `<p>New submission for questionnaire slug: ${slug}</p>
             <pre>${JSON.stringify(responses, null, 2)}</pre>`,
    });

    // Send confirmation to user
    if (userEmail) {
      await resend.emails.send({
        from: "notifications@irini.io",
        to: userEmail,
        subject: "Thank you for your submission",
        html: `<p>Thank you for submitting the questionnaire! Zoe will be in touch soon.</p>`,
      });
    }

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