import { PortableTextBlock } from "@portabletext/types";
import type { Section, SanityImage } from "@/lib/sanity";

// Unified interfaces for both ParseContent and ComparisonTable
export interface Feature {
    _type: "reference"; // Type of the feature
    _id: string; // Unique identifier for the feature
    _ref: string; // Reference ID for the feature
    _key: string; // Unique key for React rendering
    label: string; // Label describing the feature
}

export interface PackageFeature {
    _id: string; // Unique identifier for the included feature
    _ref: string; // Reference ID for the included feature
    _type: "reference"; // Type of the included feature
    _key: string; // Unique key for React rendering
    label: string; // Label describing the included feature
}

export interface Package {
    _type: "package";
    _ref: string; // Reference ID for the package
    title: string; // Title of the package
    description?: string; // Optional description of the package
    includedFeatures: PackageFeature[]; // List of features included in the package
}



export interface ButtonProps {
    _type: "button"; // Type of the button
    label?: string; // Text to display on the button
    linkType?: "internal" | "external"; // Type of link (internal or external)
    internalPage?: { slug: { current: string } }; // Optional internal page slug
    externalUrl?: string; // Optional external URL
    size?: "small" | "medium" | "large"; // Size of the button
    variant?: string; // Variant of the button (e.g., primary, secondary)
    type?: "button" | "submit" | "reset"; // HTML button type
    actionType?: "button" | "submit" | "reset"; // Action type for the button
    href?: string; // Optional href for the button
    children?: React.ReactNode; // Optional children to render inside the button
}

// Renamed interfaces to have "Props" at the end of their names
export interface ButtonBlockProps {
    _type: "buttonBlock";
    buttonGroup: ButtonProps[]; // Array of button properties
}

export interface ButtonGroupBlockProps {
    _type: "buttonGroup";
    buttons: ButtonProps[]; // Array of button properties
}

export interface CallToActionProps {
        headline?: string;
        paragraph?: string;
        buttons?: ButtonBlockProps; // Reuse the ButtonGroupBlockProps interface
}
export interface GroupProps {
    borderTop?: number;
    children: React.ReactNode;
    className?: string;
    justifyContent?: string;
    marginBottom?: number;
}

export interface UIProps {
    backgroundColor?: "black" | "accent" | "white";
    type?: "next" | "previous" | "primary" | "menu" | "close"; // ✅ Styling purposes only
    buttonType?: "button" | "submit" | "reset"; // ✅ HTML button attribute
    label?: string;
    clickHandler?: () => void;
}

export interface StepProps {
    disabled?: boolean;
    label: string;
    type?: "next" | "previous"; // ✅ Used for styling
    buttonType?: "button" | "submit" | "reset"; // ✅ Used for HTML button attribute
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface HeadingBlockProps {
    _type: "headingBlock";
    level: number;
    text: string;
}


export interface PageData {
  title: string;
  slug?: { current: string };
  content?: PortableTextBlock[];
  sections?: Section[];
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
  callToAction?: CallToActionProps; // Reference the unified CallToAction interface
}

export interface ParagraphBlockProps {
    _type: "paragraphBlock";
    text: string;
}

export interface IconBlockProps {
    _type: "iconBlock";
    icon: string;
    alt?: string;
}

export interface ComparisonTableProps {
    features: Feature[]; // List of features to display
    packages: Package[]; // List of packages to display
}

export interface ComparisonTableBlockProps {
    _type: "comparisonTable";
    features: Feature[];
    packages: Package[];
}

export interface Block {
    _type: "block";
    children: Array<{ text: string }>;
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

export interface RichTextChild {
    _type: "span" | "paragraph" | "ul" | "li"; // Add other child types as needed
    text?: string; // For span and paragraph
    items?: RichTextChild[]; // For ul and li
}

export interface BlockProps {
    _type: "block";
    children: RichTextChild[]; // Ensure children are properly typed
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
