import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";

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

 const page = await sanityClient.fetch(query, { slug });

 return page;
}
