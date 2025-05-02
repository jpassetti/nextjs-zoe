import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getTransformationSlides() {
  const query = groq`
    *[_type == "transformation"] | order(_createdAt asc) {
      _id,
      title,
      subheadline,
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
    }
  `;
  return await sanityClient.fetch(query);
}