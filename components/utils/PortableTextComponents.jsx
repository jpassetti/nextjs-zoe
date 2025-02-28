import Heading from "@/components/html/Heading";
import Image from "next/image";
import Paragraph from "@/components/html/Paragraph";
import { Ul, Ol, Li } from "@/components/html/List";

// Define the custom PortableText components
export const PortableTextComponents = {
 types: {
  image: ({ value }) => {
   if (!value?.asset?.url) return null; // Prevent errors if no image
   return (
    <Image
     src={value.asset.url}
     alt={value.alt || " "}
     width={value.asset.metadata?.dimensions?.width || 500}
     height={value.asset.metadata?.dimensions?.height || 500}
    />
   );
  },
 },
 block: {
  normal: ({ children }) => <Paragraph>{children}</Paragraph>,
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
  link: ({ value, children }) => {
   if (!value || !value.href) {
    return <>{children}</>; // If no href, just return text
   }
   return (
    <a href={value.href} className="text-blue-600 underline">
     {children}
    </a>
   );
  },
 },
};
