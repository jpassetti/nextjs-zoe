import React from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Button from "@/components/html/Button";
import Icon from "@/components/html/Icon";

interface HeadingBlock {
  _type: "headingBlock";
  level: number;
  text: string;
}

interface ParagraphBlock {
  _type: "paragraphBlock";
  text: string;
}

interface Button {
  _type: "button";
  label: string;
  linkType: "internal" | "external";
  internalPage?: { slug?: { current?: string } };
  externalUrl?: string;
  variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
  size?: "small" | "medium" | "large";
}

interface ButtonGroup {
  _type: "buttonGroup";
  buttons: Button[];
}

interface ButtonBlock {
  _type: "buttonBlock";
  buttonGroup: Button[];
}

interface IconBlock {
  _type: "iconBlock";
  icon: string;
}

interface PortableTextBlock {
  _type: "block";
  children: Array<{ text: string }>;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | Button
  | ButtonGroup
  | ButtonBlock
  | IconBlock
  | PortableTextBlock;

interface ParseContentProps {
  content: ContentBlock[];
}

const ParseContent: React.FC<ParseContentProps> = ({ content }) => {
  return (
    <>
      {content.map((block, index) => {
        switch (block._type) {
          case "headingBlock":
            return <Heading key={index} level={block.level}>{block.text}</Heading>;
          case "paragraphBlock":
            return <Paragraph key={index}>{block.text}</Paragraph>;
          case "button":
            return (
              <Button
                key={index}
                href={block.linkType === "internal" ? block.internalPage?.slug?.current : block.externalUrl}
                type={block.variant || "primary"}
                size={block.size || "medium"}
              >
                {block.label}
              </Button>
            );
          case "buttonGroup":
            return (
              <div key={index} className="button-group">
                {block.buttons.map((btn: Button, btnIndex: number) => (
                  <Button
                    key={btnIndex}
                    href={btn.linkType === "internal" ? btn.internalPage?.slug?.current : btn.externalUrl}
                    type={btn.variant || "primary"}
                    size={btn.size || "medium"}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            );
          case "buttonBlock":
            return (
              <div key={index} className="button-block">
                {block.buttonGroup.map((btn: Button, btnIndex: number) => (
                  <Button
                    key={btnIndex}
                    href={btn.linkType === "internal" ? btn.internalPage?.slug?.current : btn.externalUrl}
                    type={btn.variant || "primary"}
                    size={btn.size || "medium"}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            );
          case "iconBlock":
            return <Icon key={index} name={block.icon} />;
          case "block":
            return (
              <PortableText
                key={index}
                value={[block]}
                components={PortableTextComponents}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default ParseContent;