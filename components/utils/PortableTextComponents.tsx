import type {
 PortableTextReactComponents,
 PortableTextMarkComponentProps,
 PortableTextTypeComponentProps,
} from "@portabletext/react";

import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Image from "next/image";
import Paragraph from "@/components/html/Paragraph";
import { Ul, Ol, Li } from "@/components/html/List";
import { getEnvironmentAwareUrl } from "@/components/utils/urlHelpers";

// ----------------------------
// Types
// ----------------------------
type SanityImageValue = {
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

type ButtonType = {
 _type: "button";
 label: string;
 href: string;
 type?: "primary" | "secondary" | "accent" | "inverted";
};

type ButtonGroupType = {
 _type: "buttonGroup";
 buttons: ButtonType[];
};

type LinkMark = {
 _type: "link";
 href: string;
 isButton?: boolean;
};

// ----------------------------
// PortableText Components
// ----------------------------
export const PortableTextComponents: PortableTextReactComponents = {
 types: {
  image: ({ value }: PortableTextTypeComponentProps<SanityImageValue>) => {
   if (!value?.asset?.url) return null;

   const width = value.asset.metadata?.dimensions?.width || 500;
   const height = value.asset.metadata?.dimensions?.height || 500;

   return (
    <Image
     src={value.asset.url}
     alt={value.alt || " "}
     width={width}
     height={height}
    />
   );
  },

  buttonGroup: ({ value }: PortableTextTypeComponentProps<ButtonGroupType>) => {
   if (!value?.buttons || !Array.isArray(value.buttons)) return null;

   return (
    <div style={{ margin: "1rem 0" }}>
     <Button.Group>
      {value.buttons.map((btn, i) => (
       <Button
        key={i}
        href={getEnvironmentAwareUrl(btn.href)}
        type={btn.type || "primary"}
        label={btn.label}
       />
      ))}
     </Button.Group>
    </div>
   );
  },
 },

 block: {
  normal: ({ children }) => <Paragraph marginBottom={2}>{children}</Paragraph>,
  h1: ({ children }) => <Heading level={1}>{children}</Heading>,
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
  h5: ({ children }) => <Heading level={5}>{children}</Heading>,
  h6: ({ children }) => <Heading level={6}>{children}</Heading>,
  blockquote: ({ children }) => (
   <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">
    {children}
   </blockquote>
  ),
 },

 list: {
  bullet: ({ children }) => <Ul>{children}</Ul>,
  number: ({ children }) => <Ol>{children}</Ol>,
 },

 listItem: {
  bullet: ({ children }) => <Li>{children}</Li>,
  number: ({ children }) => <Li>{children}</Li>,
 },

 marks: {
  link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => {
   if (!value?.href) return <>{children}</>;

   const adjustedHref = getEnvironmentAwareUrl(value.href);

   if (value.isButton) {
    return (
     <div style={{ margin: "1rem 0" }}>
      <Button.Group>
       <Button href={adjustedHref} type="primary">
        {children}
       </Button>
      </Button.Group>
     </div>
    );
   }

   const isExternal = adjustedHref.startsWith("http");

   return (
    <a
     href={adjustedHref}
     className="text-blue-600 underline"
     target={isExternal ? "_blank" : undefined}
     rel={isExternal ? "noopener noreferrer" : undefined}
    >
     {children}
    </a>
   );
  },
 },

 // ✅ TypeScript-required fallbacks
 hardBreak: () => <br />,
 unknownMark: ({ children }) => <>{children}</>,
 unknownType: ({ value }) => {
  console.error("Unknown type encountered in PortableText: ", value);
  return <div>Unsupported content type</div>;
 },
 unknownBlockStyle: ({ children }) => <Paragraph>{children}</Paragraph>,
 unknownList: ({ children }) => <Ul>{children}</Ul>,
 unknownListItem: ({ children }) => <Li>{children}</Li>,
};
