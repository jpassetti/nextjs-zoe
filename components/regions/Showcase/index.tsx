import React from "react";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import styles from "./showcase.module.scss";

const Showcase: React.FC = () => {
 return (
  <section className={styles.showcase}>
   <div className={styles.showcase__item}>
    <Heading level={2} marginBottom={2}>
     Leadership Coaching
    </Heading>
    <Paragraph marginBottom={2}>
     Strengthening leadership capacity by fostering resilience and effectiveness
     in handling greater responsibilities.
    </Paragraph>
    <Button.Group>
     <Button _type="button" label="Learn more" variant="primary" />
    </Button.Group>
   </div>
   <div className={styles.showcase__item}>
    <Heading level={2} marginBottom={2}>
     Advisory Services
    </Heading>
    <Paragraph marginBottom={2}>
     Looking for a flexible arrangement with an entrepreneurship specialist
     physically (or virtually) present during periods of organizational change?
    </Paragraph>
    <Button.Group>
     <Button _type="button" label="Learn more" variant="primary" />
    </Button.Group>
   </div>
   <div className={styles.showcase__item}>
    <Heading level={2} marginBottom={2}>
     Grinnell Leadership
    </Heading>
    <Paragraph marginBottom={2}>
     In tandem with Transform with Irini, I also work alongside Grinnell
     Leadership&rsquo;s decentralized network of consultants, behavior
     scientists, seasoned business owners, and executives.
    </Paragraph>
    <Button.Group>
     <Button _type="button" label="Learn more" variant="primary" />
    </Button.Group>
   </div>
  </section>
 );
};

export default Showcase;
