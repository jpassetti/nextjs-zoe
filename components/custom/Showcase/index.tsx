import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import { urlFor } from "@/lib/sanity";
import styles from "./showcase.module.scss";
import { Image as SanityImage } from "@sanity/types";
import Image from "next/image";

interface ShowcaseProps {
  data: {
    backgroundImage?: SanityImage & {
      alt?: string;
    };
    title?: string;
    description?: string;
    buttons?: Array<{
      label: string;
      linkType: "internal" | "external";
      internalPage?: { slug?: { current?: string } };
      externalUrl?: string;
      variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white";
    }>;
  };
}

const Showcase: React.FC<ShowcaseProps> = ({ data }) => {
  const { backgroundImage, title, description, buttons } = data;

  //console.log("Showcase buttons data:", buttons);

  return (
    <div
      className={styles.showcase}
    >
      {backgroundImage?.asset && (
        <Image
          src={urlFor(backgroundImage).url()}
          alt={backgroundImage.alt || "Showcase Image"}
          fill
          className={styles.showcase_image}
          priority
        />
      )}
      <div className={styles.showcase_content}>
        {title && (
          <Heading level={1} color="white" marginBottom={2}>
            {title}
          </Heading>
        )}
        {description && (
          <p className={styles.showcase_description}>
            {description}
          </p>
        )}
        {buttons && (
          <Button.Group justifyContent="center">
            {buttons.map((button, index) => (
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
                variant={button.variant || "primary"}
              />
            ))}
          </Button.Group>
        )}
      </div>
    </div>
  );
};

export default Showcase;