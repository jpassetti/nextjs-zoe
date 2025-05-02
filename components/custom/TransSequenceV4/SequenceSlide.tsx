import { PortableText } from "@portabletext/react"; // Only import PortableText from @portabletext/react
import { PortableTextBlock } from "@portabletext/types"; // Import PortableTextBlock from @portabletext/types
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import { ForwardedRef } from "react";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";

import styles from "./slide.module.scss";

interface Slide {
  title: string;
  subheadline?: string;
  content?: PortableTextBlock[];
  cta?: {
    label: string;
    href: string;
  };
}
interface SequenceSlideProps {
  slide: Slide;
  ref?: ForwardedRef<HTMLDivElement>; // Type the ref as a forwarded ref for a div element
}

const SequenceSlide: React.FC<SequenceSlideProps> = ({ slide, ref }) => {
  return <div
    ref={ref}
    className={styles.sequence_slide}
  >
    <Heading level={2} marginBottom={2}>
      {slide.title}
    </Heading>
    {slide.subheadline && (
      <Heading
        level={3}
        marginBottom={2}
        color="black"
        fontWeight="normal"
        fontFamily="primary"
        fontStyle="italic"
      >
        {slide.subheadline}
      </Heading>
    )}
    {slide.content && (
      <div className="prose">
        <PortableText
          value={slide.content}
          components={PortableTextComponents}
        />
      </div>
    )}
    {slide.cta && (
      <Button.Group>
        <Button
          _type="button"
          variant="primary"
          label={slide.cta.label}
          size="medium"
          actionType="button"
          linkType="internal"
          internalPage={{ slug: { current: slide.cta.href } }} // Assuming href is a slug
        />
      </Button.Group>
    )}
  </div>
}
export default SequenceSlide;