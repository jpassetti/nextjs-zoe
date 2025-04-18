import { groq } from "next-sanity";
import { sanityClient } from "../client";

export async function getComparisonTableData(featureRefs: { _ref: string }[]) {
  const ids = featureRefs.map((ref) => ref._ref);
  const query = groq`
    *[_type == "feature" && _id in $ids] {
      _id,
      label
    }
  `;
  const fetchedFeatures = await sanityClient.fetch(query, { ids });

  // Sort the features to match the order of the `_ref` values
  return ids.map((id) =>
    fetchedFeatures.find((feature: { _id: string }) => feature._id === id)
  );
}