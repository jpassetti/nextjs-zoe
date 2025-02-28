import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";

// Fetch a Page (already present)
export async function getPage(slug: string) {
 const query = groq`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      slug,
      content,
      featuredImage {
        asset->{
          url,
          metadata {
            dimensions { width, height }
          }
        },
        alt
      },
      excerpt
    }
  `;
 return await sanityClient.fetch(query, { slug });
}

// Fetch Questionnaire Data
export async function getQuestionnaire(slug: string) {
 console.log("Fetching questionnaire for slug:", slug); // ✅ Debugging Log
 const query = groq`
    *[_type == "questionnaire" && slug.current == $slug][0]{
      title,
      description,
      steps[]{
        title,
        description,
        questions[]{
          question,
          type,
          options
        }
      }
    }
  `;

 try {
  const data = await sanityClient.fetch(query, { slug });

  console.log("Sanity Response:", data); // ✅ Debugging Log

  return data;
 } catch (error) {
  console.error("Sanity Fetch Error:", error); // Log any issues
  return null;
 }
}
