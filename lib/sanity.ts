import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";
import { Questionnaire } from "@/lib/types/questionnaire";
import imageUrlBuilder from "@sanity/image-url";

// Define types for Sanity data structures
export interface SanityReference {
  _ref: string;
  _type: string;
}

export interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  [key: string]: unknown; // Added index signature to ensure compatibility
}

export interface ShowcaseSection {
  _type: "showcaseSection";
  title: string;
  description?: string;
  backgroundImage?: SanityImage;
  buttons?: Array<{
    label: string;
    linkType: "internal" | "external";
    internalPage?: { slug: { current: string } };
    externalUrl?: string;
    variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
  }>;
}

export interface ColumnsSection {
  _type: "columnsSection";
  rows: Array<{
    columns: Array<{
      title: string;
      content: string;
      width?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    }>;
    backgroundColor?: string;
  }>;
}

export type Section = ShowcaseSection | ColumnsSection;

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
      excerpt
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
