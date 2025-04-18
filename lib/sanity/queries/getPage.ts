import { groq } from "next-sanity";
import { sanityClient } from "../client";

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
      excerpt,
      sections[] {
        _type,
        ...,
        buttons[] {
          label,
          linkType,
          "internalPage": internalPage-> {
            _id,
            slug {
              current
            }
          },
          externalUrl,
          variant,
          size,
          actionType
        },
        _type == "columnsSection" => {
          ...,
          rows[] {
          ...,
            columns[] {
            ...,
              content[]
            }
          }
        }
      }
    }
  `;
  return await sanityClient.fetch(query, { slug });
}