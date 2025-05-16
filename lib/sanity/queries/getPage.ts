import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getPage(slug: string, preview: boolean = false) {
  const query = groq`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      slug,
      content[]{
        ...,
        _type == "button" => {
          ...,
          "internalPage": internalPage->{
            _id,
            slug { current }
          }
        },
        _type == "buttonGroup" => {
          ...,
          buttons[]{
            ...,
            "internalPage": internalPage->{
              _id,
              slug { current }
            }
          }
        }
      },
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
      callToAction-> {
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
              }
            }
          }
        }
      }
    }
  `;

  // Use the Sanity client with or without CDN based on the preview flag
  const client = preview
    ? sanityClient.withConfig({ useCdn: false }) // Fetch drafts in preview mode
    : sanityClient;

  return await client.fetch(query, { slug });
}