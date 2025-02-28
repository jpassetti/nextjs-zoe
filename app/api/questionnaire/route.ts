import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";

export async function GET(req: Request) {
 console.log("Fetching questionnaire...", req); // ✅ Debugging log
 const slug = "consultation-questionnaire";

 const query = groq`
    *[_type == "questionnaire" && slug.current == $slug][0]{
      _id,
      title,
      description,
      steps[]{
        title,
        description,
        questions[]{
          question,
          type,
          options
        }
      }
    }
  `;

 try {
  const data = await sanityClient.fetch(query, { slug });
  return NextResponse.json(data);
 } catch (error) {
  console.error("Sanity fetch error:", error); // ✅ Log error
  return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
 }
}
