"use client";

import { useViewport } from "@/lib/context/ViewportContext"; // Adjust path if needed

import Button from "@/components/html/Button";

import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";

import Row from "@/components/layout/Row";
import styles from "./showcase.module.scss";
import { Image as SanityImage } from "@sanity/types";
import Image from "next/image";

import { urlFor } from "@/lib/sanity";

interface ShowcaseProps {
  data: {
    backgroundImage?: SanityImage & {
      alt?: string;
    };
    backgroundImageUrl?: string;
    title?: string;
    description?: string;
    buttons?: Array<{
      label: string;
      linkType: "internal" | "external";
      internalPage?: { slug?: { current?: string } };
      externalUrl?: string;
      variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
    }>;
    textTone?: "light" | "dark";
  };
}

const Showcase: React.FC<ShowcaseProps> = ({ data }) => {
  const { isDesktop } = useViewport();
  const { backgroundImage, backgroundImageUrl, title, description, buttons, textTone } = data;

  const backgroundUrl = backgroundImage?.asset ? urlFor(backgroundImage).url() : backgroundImageUrl;
  const resolvedTone =
    textTone ||
    (backgroundUrl ? "light" : undefined) ||
    (isDesktop ? "light" : "dark");
  const headingColor = resolvedTone === "light" ? "white" : "black";
  const descriptionToneClass =
    resolvedTone === "light" ? styles.showcase_description__light : styles.showcase_description__dark;

  const showcaseContent = (
    <>
      {title && (
        <Heading
          level={1}
          color={headingColor}
          textAlign={isDesktop ? "center" : "left"} // Center text for desktop, left for non-desktop
          textShadow={isDesktop ? true : false} // Apply text shadow for desktop
          marginTop={isDesktop ? 0 : 3} // Add marginTop for non-desktop
          marginBottom={isDesktop ? 0 : 2} // Add marginBottom for non-desktop
        >
          {title}
        </Heading>
      )}
      {description && (
        <p className={`${styles.showcase_description} ${descriptionToneClass}`}>
          {description}
        </p>
      )}
      {buttons && (
        <Button.Group justifyContent="flex-start">
          {buttons.map((button, index) => {
            const resolvedVariant = !isDesktop && button.variant === "inverted-white" ? "inverted" : button.variant; // Force variant to "inverted" if isDesktop is true and variant is "inverted-white"

            return (
              <Button
                _type="button"
                key={index}
                linkType={button.linkType}
                internalPage={
                  button.internalPage?.slug?.current
                    ? { slug: { current: button.internalPage.slug.current } }
                    : undefined
                }
                externalUrl={button.externalUrl || ""}
                size="medium"
                label={button.label}
                variant={resolvedVariant} // Use resolved variant
              />
            );
          })}
        </Button.Group>
      )}
    </>
  );

  return (
    <div
      className={styles.showcase}
    >
      {backgroundUrl && (
        <Image
          src={backgroundUrl}
          alt={backgroundImage?.alt || "Showcase Image"}
          fill
          className={styles.showcase_image}
          priority
        />
      )}
      <div className={styles.showcase_content}>
        {isDesktop ? (
          showcaseContent
        ) : (
          <Container>
            <Row justifyContent="center">
              <Col xs={12} sm={10} md={8} marginBottom={0}>
                {showcaseContent}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Showcase;
