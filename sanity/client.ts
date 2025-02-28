import { createClient } from "@sanity/client";

export const sanityClient = createClient({
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
 apiVersion: "2024-01-01",
 useCdn: true, // Set to false if you need fresh data on every request
});
