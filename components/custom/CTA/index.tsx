import Button from "../../html/Button";
import Container from "../../layout/Container";
import Heading from "../../html/Heading";
import Paragraph from "../../html/Paragraph";
import Section from "../../layout/Section";

import styles from "./cta.module.scss";

const CTA = () => {
 return (
  <Section backgroundColor="primary">
   <Container type="content">
    <div className={styles.cta}>
     <Heading level={2} marginBottom={2} textAlign="center">
      Empowering Leaders to Navigate Change with Confidence
     </Heading>
     <Paragraph marginBottom={2} textAlign="center">
      Discover tailored strategies that enhance your leadership skills, foster
      resilience, and drive meaningful transformation in your organization.
     </Paragraph>
     <Button.Group justifyContent="center">
      <Button
       href="/contact"
       label="Schedule a free consultation"
       type="accent"
      />
      <Button href="/services" label="Learn more" type="inverted" />
     </Button.Group>
    </div>
   </Container>
  </Section>
 );
};
export default CTA;
