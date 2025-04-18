import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import { SanityImage } from "./types";

export const urlFor = (source: SanityImage) =>
  imageUrlBuilder(sanityClient).image(source);