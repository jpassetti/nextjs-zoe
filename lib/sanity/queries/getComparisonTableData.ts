import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getComparisonTableData(preview: boolean = false) {
  console.log(`getComparisonTableData called with preview: ${preview}`);

  const query = groq`
    *[_type == "comparisonTable"] {
      title,
      description,
      rows[] {
        title,
        cells[] {
          value,
          isHighlighted
        }
      }
    }
  `;

  if (preview) {
    // Use token and disable CDN for draft mode
    return await sanityClient.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
      perspective: "drafts",
    }).fetch(query);
  } else {
    // Use CDN for published mode (no token)
    return await sanityClient.withConfig({
      token: undefined,
      useCdn: true,
    }).fetch(query);
  }
}