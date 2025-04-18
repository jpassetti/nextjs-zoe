import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getTransformationSlides() {
  const query = groq`
    *[_type == "transformation"] | order(_createdAt asc) {
      _id,
      title,
      subheadline,
      content,
      "cta": cta {
        label,
        href
      }
    }
  `;
  return await sanityClient.fetch(query);
}