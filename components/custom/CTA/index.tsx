import Button from "../../html/Button";
import Container from "../../layout/Container";
import Heading from "../../html/Heading";
import Paragraph from "../../html/Paragraph";
import Section from "../../layout/Section";

import styles from "./cta.module.scss";

import { CallToActionProps } from "@/lib/interfaces";

const CTA: React.FC<CallToActionProps> = ({ headline, paragraph, buttons }) => {
  return (
    <Section backgroundColor="primary">
      <Container type="content">
        <div className={styles.cta}>
          <Heading level={2} marginBottom={2} textAlign="center">
            {headline}
          </Heading>
          {paragraph && (
            <Paragraph marginBottom={2} textAlign="center">
              {paragraph}
            </Paragraph>
          )}
          {buttons && (
            <Button.Group justifyContent="center">
              {buttons.buttonGroup.map((button, index) => (
                <Button
                  key={index}
                  _type="button"
                  href={
                    button.linkType === "internal"
                      ? `/${button.internalPage?.slug?.current}`
                      : button.externalUrl
                  }
                  label={button.label}
                  variant={button.variant || "primary"}
                />
              ))}
            </Button.Group>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default CTA;