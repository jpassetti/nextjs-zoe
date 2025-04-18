import { groq } from "next-sanity";
import { sanityClient } from "../client";
import { Questionnaire } from "@/lib/types/questionnaire";

export async function getQuestionnaire(slug: string) {
  const query = groq`
    *[_type == "questionnaire" && slug.current == $slug][0] {
      _id,
      title,
      description,
      steps[] {
        title,
        description,
        questions[] {
          label,
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
  return await sanityClient.fetch(query, { slug }) as Questionnaire;
}