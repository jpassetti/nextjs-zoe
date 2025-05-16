import { draftMode } from "next/headers";

export default function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  draftMode().enable();
  res.writeHead(307, { Location: "/" }); // Redirect to the homepage or a specific page
  res.end();
}