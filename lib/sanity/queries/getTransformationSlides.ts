import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getTransformationSlides(preview: boolean = false) {
  console.log(`getTransformationSlides called with preview: ${preview}`);

  const query = groq`
    *[_type == "transformation"] {
      title,
      description,
      subheadline,
      content,
      image {
        asset->{
          url,
          metadata {
            dimensions { width, height }
          }
        },
        alt
      },
      order
    } | order(order asc)
  `;

  if (preview) {
    // Use token and disable CDN for draft mode
    return await sanityClient.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
      perspective: "drafts",
    }).fetch(query);
  } else {
    console.log("Fetching in published mode with CDN");
    // Use CDN for published mode (no token)
    return await sanityClient.withConfig({
      token: undefined,
      useCdn: true,
    }).fetch(query);
  }
}