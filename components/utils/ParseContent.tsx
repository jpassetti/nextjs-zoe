"use client";

import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Button from "@/components/html/Button";
import Icon, { icons } from "@/components/html/Icon";
import ComparisonTable from "@/components/custom/ComparisonTable";
import { getComparisonTableData } from "@/lib/sanity"; // assuming you added it here

export type ContentBlock =
  | {
      _type: "headingBlock";
      level: number;
      text: string;
    }
  | {
      _type: "paragraphBlock";
      text: string;
    }
  | {
      _type: "button";
      label: string;
      linkType: "internal" | "external";
      internalPage?: { slug?: { current?: string } };
      externalUrl?: string;
      variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
      size?: "small" | "medium" | "large";
    }
  | {
      _type: "buttonGroup";
      buttons: Array<{
        label: string;
        linkType: "internal" | "external";
        internalPage?: { slug?: { current?: string } };
        externalUrl?: string;
        variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
        size?: "small" | "medium" | "large";
      }>;
    }
  | {
      _type: "buttonBlock";
      buttonGroup: Array<{
        label: string;
        linkType: "internal" | "external";
        internalPage?: { slug?: { current?: string } };
        externalUrl?: string;
        variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
        size?: "small" | "medium" | "large";
      }>;
    }
  | {
      _type: "iconBlock";
      icon: string;
      alt?: string;
    }
  | {
      _type: "block";
      children: Array<{ text: string }>;
    }
  | {
      _type: "comparisonTable";
      features: Array<{ _ref: string; _type: "reference" }>;
      packages: Array<{
        title: string;
        includedFeatures: Array<{ label: string }>;
      }>;
    };

interface ParseContentProps {
  content: Array<
    | {
        _type: "headingBlock";
        level: number;
        text: string;
      }
    | {
        _type: "paragraphBlock";
        text: string;
      }
    | {
        _type: "button";
        label: string;
        linkType: "internal" | "external";
        internalPage?: { slug?: { current?: string } };
        externalUrl?: string;
        variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
        size?: "small" | "medium" | "large";
      }
    | {
        _type: "buttonGroup";
        buttons: Array<{
          label: string;
          linkType: "internal" | "external";
          internalPage?: { slug?: { current?: string } };
          externalUrl?: string;
          variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
          size?: "small" | "medium" | "large";
        }>;
      }
    | {
        _type: "buttonBlock";
        buttonGroup: Array<{
          label: string;
          linkType: "internal" | "external";
          internalPage?: { slug?: { current?: string } };
          externalUrl?: string;
          variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
          size?: "small" | "medium" | "large";
        }>;
      }
    | {
        _type: "iconBlock";
        icon: string;
        alt?: string;
      }
    | {
        _type: "block";
        children: Array<{ text: string }>;
      }
    | {
        _type: "comparisonTable";
        features: Array<{ _ref: string; _type: "reference" }>;
        packages: Array<{
          title: string;
          includedFeatures: Array<{ label: string }>;
        }>;
      }
  >;
}

const ComparisonTableWrapper = ({ features, packages }: { features: { _ref: string; _type: "reference" }[]; packages: { title: string; includedFeatures: { label: string }[] }[] }) => {
  const [resolvedFeatures, setResolvedFeatures] = useState<{ _id: string; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getComparisonTableData(features); // Fetch feature labels by _ref IDs
        setResolvedFeatures(data);
      } catch (err) {
        console.error("Failed to load feature data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [features]);

  if (loading) return <p>Loading table...</p>;

  const mappedFeatures = resolvedFeatures.map((feature, index) => ({
    ...feature,
    _ref: feature._id, // Use `_id` as `_ref`
    _type: "reference", // Assign a default `_type`
    _key: `feature-${index}`, // Generate a unique `_key`
  }));

  const mappedPackages = packages.map((pkg, pkgIndex) => ({
    ...pkg,
    includedFeatures: pkg.includedFeatures.map((feature, featureIndex) => ({
      ...feature,
      _key: `feature-${pkgIndex}-${featureIndex}`, // Generate a unique `_key`
      _ref: `ref-${pkgIndex}-${featureIndex}`, // Generate a unique `_ref`
      _type: "reference", // Assign a default `_type`
    })),
  }));

  return <ComparisonTable features={mappedFeatures} packages={mappedPackages} />;
};

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
                {block.buttons.map((btn, btnIndex: number) => (
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
                {block.buttonGroup.map((btn, btnIndex: number) => (
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
            const iconName = block.icon as keyof typeof icons; // Narrow the type
            if (!icons[iconName]) {
              console.error(`Invalid icon name: ${block.icon}`);
              return null;
            }
            return (
              <Icon
                key={index}
                name={iconName}
                alt={block.alt || `${block.icon} icon`}
              />
            );
          case "block":
            return (
              <PortableText
                key={index}
                value={[block]}
                components={PortableTextComponents}
              />
            );
          case "comparisonTable":
            return (
              <ComparisonTableWrapper
                key={index}
                features={block.features}
                packages={block.packages}
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