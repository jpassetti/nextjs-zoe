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
  [key: string]: unknown;
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