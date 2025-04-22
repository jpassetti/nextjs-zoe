"use client";

import React, { Fragment, useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Button from "@/components/html/Button";
import Icon, { icons } from "@/components/html/Icon";
import ComparisonTable from "@/components/custom/ComparisonTable";
import { getComparisonTableData } from "@/lib/sanity"; // assuming you added it here
import { ButtonProps, ButtonBlockProps, ButtonGroupBlockProps, ComparisonTableBlockProps, ContentBlockProps, HeadingBlockProps, IconBlockProps, ParagraphBlockProps } from "@/lib/interfaces";

interface ParseContentProps {
  content: ContentBlockProps[];
}

const ComparisonTableWrapper = ({ features, packages }: ComparisonTableBlockProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [transformedFeatures, setTransformedFeatures] = useState<any[]>([]); // State to store fetched features

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedFeatures = await getComparisonTableData(features); // Fetch feature labels by _ref IDs
        const transformed = fetchedFeatures.map((feature, index) => ({
          _id: feature._id, // Use `_id` as is
          _ref: feature._ref, // Keep `_ref` as is
          _type: feature._type, // Preserve `_type`
          _key: feature._key || `feature-${index}`, // Use existing `_key` or generate one
          label: feature.label || "Unknown Feature", // Provide a default label if missing
        }));
        setTransformedFeatures(transformed); // Store the transformed features in state
      } catch (err) {
        console.error("Failed to load feature data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [features]);

  if (loading) return <p>Loading table...</p>;

  // Transform packages to include the fetched features
  const transformedPackages = packages.map((pkg, pkgIndex) => ({
    ...pkg,
    includedFeatures: pkg.includedFeatures.map((feature, featureIndex) => ({
      _id: feature._id, // Use `_ref` as `_id`
      _ref: feature._ref, // Keep `_ref` as is
      _type: feature._type, // Preserve `_type`
      _key: feature._key || `feature-${pkgIndex}-${featureIndex}`, // Use existing `_key` or generate one
      label: feature.label || "Unknown Feature", // Provide a default label if missing
    })),
  }));

  return (
    <ComparisonTable
      features={transformedFeatures} // Pass the fetched and transformed features
      packages={transformedPackages} // Pass the transformed packages
    />
  );
};

const isHeadingBlock = (block: ContentBlockProps): block is HeadingBlockProps =>
  block._type === "headingBlock";

const isParagraphBlock = (block: ContentBlockProps): block is ParagraphBlockProps =>
  block._type === "paragraphBlock";

const isButtonProps = (block: ContentBlockProps): block is ButtonProps =>
  block._type === "button";

const isButtonGroupBlock = (block: ContentBlockProps): block is ButtonGroupBlockProps =>
  block._type === "buttonGroup";

const isButtonBlockProps = (block: ContentBlockProps): block is ButtonBlockProps =>
  block._type === "buttonBlock";

const isIconBlock = (block: ContentBlockProps): block is IconBlockProps =>
  block._type === "iconBlock";

const isComparisonTableBlock = (block: ContentBlockProps): block is ComparisonTableBlockProps =>
  block._type === "comparisonTable";

const ParseContent: React.FC<ParseContentProps> = ({ content }) => {
  return (
    <>
      {content.map((block, index) => {
        switch (block._type) {
          case "headingBlock":
            if (isHeadingBlock(block)) {
              return (
                <Heading key={index} level={block.level} marginBottom={1}>
                  {block.text}
                </Heading>
              );
            }
            return null;

          case "paragraphBlock":
            if (isParagraphBlock(block)) {
              return (
                <Paragraph key={index} marginBottom={1}>
                  {block.text}
                </Paragraph>
              );
            }
            return null;

          case "button":
            console.log(block?.internalPage?.slug.current);
            if (isButtonProps(block)) {
              return (
                <Button.Group key={index}>
                  <Button
                    _type="button"
                    linkType={block.linkType}
                    internalPage={block.internalPage}
                    size={block.size || "medium"}
                    label={block.label}
                    actionType={block.actionType}
                    variant={block.variant}
                  />
                </Button.Group>
              );
            }
            return null;

          case "buttonGroup":
            if (isButtonGroupBlock(block)) {
              return (
                <div key={index} className="button-group">
                  {block.buttons.map((btn, btnIndex) => (
                    <Button
                      _type="button"
                      key={btnIndex}
                      linkType={btn.linkType}
                      href={
                        btn.linkType === "internal"
                          ? `/${btn.internalPage?.slug?.current}`
                          : btn.externalUrl
                      }
                      variant={btn.variant || "primary"}
                      size={btn.size || "medium"}
                      label={btn.label}
                      actionType={btn.actionType}
                    />
                  ))}
                </div>
              );
            }
            return null;

          case "buttonBlock":
            if (isButtonBlockProps(block)) {
              return (
                <div key={index} className="button-block">
                  {block.buttonGroup.map((btn, btnIndex) => (
                    <Button
                      _type="button"
                      key={btnIndex}
                      linkType={btn.linkType}
                      href={
                        btn.linkType === "internal"
                          ? `/${btn.internalPage?.slug?.current}`
                          : btn.externalUrl
                      }
                      variant={btn.variant || "primary"}
                      size={btn.size || "medium"}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              );
            }
            return null;

          case "iconBlock":
            if (isIconBlock(block)) {
              const iconName = block.icon as keyof typeof icons;
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
            }
            return null;

          case "comparisonTable":
            if (isComparisonTableBlock(block)) {
              return (
                <ComparisonTableWrapper
                  _type="comparisonTable"
                  key={index}
                  features={block.features}
                  packages={block.packages}
                />
              );
            }
            return null;

          default:
            // Use PortableText as a fallback for unhandled blocks
            return (
              <PortableText
                key={index}
                value={[block]} // Pass the block as an array
                components={PortableTextComponents}
              />
            );
        }
      })}
    </>
  );
};

export default ParseContent;