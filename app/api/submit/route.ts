import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client"; // ✅ Ensure correct import

export async function POST(req: NextRequest) {
 try {
  const { questionnaireId, responses } = await req.json();

  if (!questionnaireId || !responses) {
   return NextResponse.json(
    { message: "Missing required fields" },
    { status: 400 }
   );
  }

  const responseDoc = {
   _type: "responses",
   questionnaire: { _type: "reference", _ref: questionnaireId },
   responses,
  };

  console.log("Saving to Sanity:", responseDoc); // ✅ Debugging log

  await sanityClient.create(responseDoc);

  return NextResponse.json(
   { message: "Submission successful!" },
   { status: 200 }
  );
 } catch (error) {
  console.error("Error saving responses:", error);
  return NextResponse.json(
   { message: "Internal Server Error" },
   { status: 500 }
  );
 }
}
