import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getPage(slug: string, preview: boolean = false) {
  console.log(`getPage called with slug: ${slug} and preview: ${preview}`);
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
        },
        _type == "testimonialBlock" => {
          ...,
          testimonial-> {
            quote,
            name,
            jobTitle,
            photo {
              asset-> {
                url
              }
            },
            linkedinUrl,
            companyName,
            companyUrl
          }
        }
      }
    }
  `;

  if (preview) {
    // Use token and disable CDN for draft mode
    // console.log("Fetching in preview mode with token");
    // console.log("Sanity API Write Token:", process.env.SANITY_API_WRITE_TOKEN);
    // console.log("Dataset:", sanityClient.config().dataset);
    return await sanityClient.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
      perspective: 'drafts',
    }).fetch(query, { slug });
  } else {
    // Use CDN for published mode (no token)
    // console.log("Fetching in published mode without token");
    return await sanityClient
      .withConfig({
        token: undefined,
        useCdn: true,
      })
      .fetch(query, { slug });
  }
}