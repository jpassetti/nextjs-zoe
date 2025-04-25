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
      seo {
        seoTitle,
        seoDescription,
        ogTitle,
        ogDescription,
        ogImage {
          asset->{
            url,
            metadata {
              dimensions { width, height }
            }
          },
          alt
        },
        noIndex
      },
      callToAction-> { // Dereference the callToAction document
        headline,
        paragraph,
        buttons {
          ...,
          buttonGroup[] {
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
          }
        }
      },
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
              content[] {
                ...,
                     _type == "button" => {
                  ...,
                  
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
                    }
                },
             
            }
          }
        }
      }
    }
  `;
  return await sanityClient.fetch(query, { slug });
}