import { PortableTextBlock } from "@portabletext/types";

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

export interface CheckboxProps {
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (isChecked: boolean) => void;
}

export interface CheckboxGroupProps {
    question: string;
    options: string[];
    required?: boolean;
    responses: Record<string, string | string[]>;
    onChange: (question: string, selectedValues: string[]) => void;
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

export interface Question {
    label: string;
    question: string;
    type:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "date"
    | "textarea"
    | "radio"
    | "checkbox";
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    options?: string[];
}

export interface StepProps {
    title: string;
    description?: string;
    questions: Question[];
}
export interface StepButtonProps {
    disabled?: boolean; // Whether the button is disabled
    type?: "next" | "previous" | "submit"; // Type of the button for styling purposes
    buttonType?: "button" | "submit" | "reset"; // HTML button type attribute
    label: string; // The text label displayed on the button
    clickHandler?: () => void; // Optional click handler function
    variant?: "primary" | "secondary" | "inverted" | "disabled" | string; // Variant for styling
}

export interface Questionnaire {
    title: string;
    slug: { current: string };
    description?: string;
    steps: StepProps[];
}

export interface QuestionnaireBlock {
    _type: "questionnaireBlock";
    questionnaire: Questionnaire;
    title?: string;
    description?: string;
}

export interface QuestionnaireFormProps {
    questionnaire: Questionnaire;
    slug: {
        current: string;
    };
    step: number;
    setStep: (step: number) => void;
    title: string;
    description?: string;
    onSuccess?: (responseId: string) => void;
    onError?: (error: Error) => void;
    responses: Record<string, string | string[]>;
    setResponses: (responses: Record<string, string | string[]>) => void;
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

export interface Testimonial {
    quote: string;
    name: string;
    jobTitle?: string;
    photo?: SanityImageValue;
    linkedinUrl?: string;
    companyName?: string;
    companyUrl?: string;
}


export interface TestimonialBlockSection {
    _type: "testimonialBlock";
    testimonial: Testimonial;
}


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



export type Section = ColumnsSection | ShowcaseSection | TestimonialBlockSection | QuestionnaireBlock;


