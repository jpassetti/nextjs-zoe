import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secretKey = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;

  // ✅ Verify the secret key
  if (req.headers.authorization !== `Bearer ${secretKey}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await fetch(
      `https://api.sanity.io/v1/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/datasets/staging/copy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "production",
          targetDataset: "staging",
          includeTypes: true,
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to copy dataset to Staging");
    }

    return res.status(200).json({ message: "Successfully copied to Staging." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to copy to Staging." });
  }
}