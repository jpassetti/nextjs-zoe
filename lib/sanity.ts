import { sanityClient } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { Questionnaire } from "@/lib/types/questionnaire";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/lib/interfaces";

// Update the `urlFor` function to use proper typing
const urlFor = (source: SanityImage) => imageUrlBuilder(sanityClient).image(source);

export { urlFor };

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
         paddingTop,
              paddingBottom,
              marginTop,
              marginBottom,
          rows[] {
            ...,
            textAlign, // Include textAlign for rows
            columns[] {
            ...,
              textAlign, // Include textAlign for columns
              content[] {
                ...,
                _type == "headingBlock" => {
                  textAlign, // Include textAlign for headingBlock
                  ...
                },
                _type == "paragraphBlock" => {
                  textAlign, // Include textAlign for paragraphBlock
                  ...
                },
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
                  },
              }
            }
          }
        }
      }
    }
  `;
  return await sanityClient.fetch(query, { slug });
}

// Fetch Questionnaire Data
export async function getQuestionnaire(slug: string) {
  console.log("Fetching questionnaire for slug:", slug);
  const query = groq`
     *[_type == "questionnaire" && slug.current == $slug][0]{
       _id,
       title,
       description,
       steps[]{
         title,
         description,
         questions[]{
           label, // ✅ Include 'label' to match the TypeScript interface
           question,
           type,
           placeholder,
           helperText,
           required,
           validationError,
           options
         }
       }
     }
   `;

  try {
    const data = await sanityClient.fetch(query, { slug });
    console.log("Sanity Response:", data);
    return data as Questionnaire; // ✅ Explicitly cast the data to the correct type
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return null;
  }
}

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

export async function getComparisonTableData(
  featureRefs: { _ref: string }[]
) {
  const ids = featureRefs.map((ref) => ref._ref);
  const query = groq`*[_type == "feature" && _id in $ids]{ _id, label }`;
  const fetchedFeatures = await sanityClient.fetch(query, { ids });

  // Sort the features to match the order of the `_ref` values
  const sortedFeatures = ids.map((id) =>
    fetchedFeatures.find((feature: { _id: string }) => feature._id === id)
  );

  return sortedFeatures;
}
