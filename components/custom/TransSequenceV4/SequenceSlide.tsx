import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";

import styles from './slide.module.scss';

const SequenceSlide = ({slide, ref}) => {
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
                      href={slide.cta.href}
                    />
                  </Button.Group>
                )}
              </div>
}
export default SequenceSlide;