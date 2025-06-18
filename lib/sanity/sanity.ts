import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "yourProjectId", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use the latest API version
  useCdn: true, // Use CDN for faster response
});

export { sanityClient };