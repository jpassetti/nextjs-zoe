import { PortableText } from "@portabletext/react"; // Only import PortableText from @portabletext/react
import { PortableTextBlock } from "@portabletext/types"; // Import PortableTextBlock from @portabletext/types
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import { ForwardedRef } from "react";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import SlideNumbers from "./SlideNumbers";

import styles from "./transsequence.module.scss";

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
    id: string; // Assuming each slide has a unique ID
    isMobile?: boolean; // Optional prop to indicate if the slide is for mobile
    activeSlide?: number; // Optional prop to control animation state
    totalSlides?: number; // Optional prop to indicate total number of slides
}

const SequenceSlide: React.FC<SequenceSlideProps> = ({ activeSlide, slide, ref, id, isMobile, totalSlides }) => {
    return <div
        ref={ref}
        className={styles.sequence__slide}
        id={id}
    >
        <div className={styles.sequence__slide__content}>
            {isMobile && (
                <SlideNumbers
                    totalSlides={totalSlides ?? 3}
                    activeSlide={activeSlide ?? 0}
                />
            )}
            <Heading level={2} marginBottom={2} color="primary" textAlign={isMobile ? "center" : "left"}>
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
                    textAlign={isMobile ? "center" : "left"}
                >
                    {slide.subheadline}
                </Heading>
            )}
            {slide.content && (
                <div>
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
    </div>
}
export default SequenceSlide;