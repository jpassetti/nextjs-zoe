import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-02-28", // Update this to the correct version
    useCdn: false, // Set to false if you need fresh data on every request
    token: process.env.SANITY_API_READ_TOKEN, // Required for fetching drafts
});
