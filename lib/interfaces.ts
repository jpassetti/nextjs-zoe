import { PortableTextBlock } from "@portabletext/types";
import type { Section, SanityImage } from "@/lib/sanity";

export interface Block {
    _type: "block";
    children: Array<{ text: string }>;
}

export interface BlockProps {
    _type: "block";
    children: RichTextChild[];
}

export interface ButtonBlockProps {
    _type: "buttonBlock";
    buttonGroup: ButtonProps[];
}

export interface ButtonGroupBlockProps {
    _type: "buttonGroup";
    buttons: ButtonProps[];
}

export interface ButtonProps {
    _type: "button";
    disabled?: boolean;
    label?: string;
    linkType?: "internal" | "external";
    internalPage?: { slug: { current: string } };
    externalUrl?: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white" | "disabled";
    type?: "button" | "submit" | "reset";
    actionType?: "button" | "submit" | "reset";
    href?: string;
    children?: React.ReactNode;
}

export interface CallToActionProps {
    headline?: string;
    paragraph?: string;
    buttons?: ButtonBlockProps;
}

export interface ColumnsSectionProps {
    data: {
        rows: Array<{
            columns: Array<{
                title: string;
                content: string | ContentBlockProps[];
                width?: {
                    xs?: number;
                    sm?: number;
                    md?: number;
                    lg?: number;
                    xl?: number;
                };
                textAlign?: "left" | "center" | "right";
            }>;
            backgroundColor?: string;
        }>;
        backgroundColor?: string;
        textAlign?: "left" | "center";
        adminTitle?: string;
        paddingTop?: "small" | "medium" | "large";
        paddingBottom?: "small" | "medium" | "large";
        marginTop?: "small" | "medium" | "large";
        marginBottom?: "small" | "medium" | "large";
    }
}

export type ContentBlockProps =
    | HeadingBlockProps
    | ParagraphBlockProps
    | BlockProps
    | ButtonProps
    | ButtonGroupBlockProps
    | ButtonBlockProps
    | IconBlockProps
    | ComparisonTableBlockProps
    | Block;

export interface ComparisonTableBlockProps {
    _type: "comparisonTable";
    features: Feature[];
    packages: Package[];
}

export interface ComparisonTableProps {
    features: Feature[];
    packages: Package[];
}

export interface Feature {
    _type: "reference";
    _id: string;
    _ref: string;
    _key: string;
    label: string;
}

export interface GroupProps {
    borderTop?: number;
    children: React.ReactNode;
    className?: string;
    justifyContent?: string;
    marginBottom?: number;
}

export interface HeadingBlockProps {
    _type: "headingBlock";
    level: number;
    text: string;
}

export interface IconBlockProps {
    _type: "iconBlock";
    icon: string;
    alt?: string;
    color?: "black" | "white" | "primary" | "secondary" | "accent";
    size?: "small" | "medium" | "large";
}
export interface LinkMark {
 _type: "link";
 href: string;
 isButton?: boolean;
};

export interface Package {
    _type: "package";
    _ref: string;
    title: string;
    description?: string;
    includedFeatures: PackageFeature[];
}

export interface PackageFeature {
    _id: string;
    _ref: string;
    _type: "reference";
    _key: string;
    label: string;
}

export interface PageData {
    title: string;
    slug?: { current: string };
    content?: PortableTextBlock[];
    sections?: Section[];
    excerpt?: string;
    seo?: SEOProps;
    featuredImage?: SanityImage & {
        asset: {
            url: string;
            metadata: {
                dimensions: {
                    width: number;
                    height: number;
                };
            };
        };
    };
    callToAction?: CallToActionProps;
}

export interface ParagraphBlockProps {
    _type: "paragraphBlock";
    text: string;
}

export interface RichTextChild {
    _type: "span" | "paragraph" | "ul" | "li";
    text?: string;
    items?: RichTextChild[];
}

export interface SanityImageValue {
 asset: {
  url: string;
  metadata?: {
   dimensions?: {
    width?: number;
    height?: number;
   };
  };
 };
 alt?: string;
};

export interface SEOImageProps {
    asset?: {
        url?: string;
        metadata?: {
            dimensions?: {
                width: number;
                height: number;
            };
        };
    };
    alt?: string;
}

export interface SEOProps {
    seoTitle?: string;
    seoDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: SEOImageProps;
    noIndex?: boolean;
}

export interface StepProps {
    disabled?: boolean;
    variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
    label: string;
    type?: "next" | "previous";
    buttonType?: "button" | "submit" | "reset";
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UIProps {
    backgroundColor?: "black" | "accent" | "white";
    disabled?: boolean;
    type?: "next" | "previous" | "primary" | "menu" | "close";
    buttonType?: "button" | "submit" | "reset";
   iconProps?: {
    name?: string;
    color?: string;
   };
    label?: string;
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}