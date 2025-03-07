import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 const searchParams = new URL(req.url).searchParams;
 const path = searchParams.get("path");
 const secret = searchParams.get("secret");

 if (!path || !secret) {
  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
 }

 if (secret !== process.env.REVALIDATION_SECRET) {
  return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
 }

 try {
  await fetch(`https://nextjs-zoe.vercel.app/api/revalidate?path=${path}`, {
   method: "GET",
   headers: { Authorization: `Bearer ${process.env.REVALIDATION_SECRET}` },
  });

  return NextResponse.json({ message: `Revalidated ${path}` });
 } catch (error) {
  console.error("Failed to revalidate:", error);
  return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
 }
}
