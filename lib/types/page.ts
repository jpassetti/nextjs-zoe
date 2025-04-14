import { PortableTextBlock } from "@portabletext/types";

export interface PageType {
  title: string;
  slug?: {
    current: string;
  };
  content?: PortableTextBlock[];
  featuredImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  excerpt?: string;
}
