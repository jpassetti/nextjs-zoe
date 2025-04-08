import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import { urlFor } from "@/lib/sanity";
import styles from "./showcase.module.scss";
import { Image } from "@sanity/types";

interface ShowcaseProps {
  data: {
    backgroundImage?: Image & {
      alt?: string;
    };
    title?: string;
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
  const { backgroundImage, title, buttons } = data;

  return (
    <div
      className={styles.showcase}
      style={{
        backgroundImage: backgroundImage?.asset ? `url(${urlFor(backgroundImage).url()})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.showcase_content}>
        {title && (
          <Heading level={1} color="white" marginBottom={2}>
            {title}
          </Heading>
        )}
        {buttons && (
          <Button.Group justifyContent="center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                href={button.linkType === "internal" ? button.internalPage?.slug?.current : button.externalUrl}
                label={button.label}
                type={button.variant || "primary"}
              />
            ))}
          </Button.Group>
        )}
      </div>
    </div>
  );
};

export default Showcase;