import React from "react";
import Container from "../../layout/Container";
import Paragraph from "../../html/Paragraph";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
 return (
  <footer className={styles.footer}>
   <Container>
    <Paragraph>Copyright 2025, Transform with Irini.</Paragraph>
    <Paragraph>Staging test</Paragraph>
   </Container>
  </footer>
 );
};

export default Footer;
