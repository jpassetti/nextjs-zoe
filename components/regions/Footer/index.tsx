import React from "react";
import Container from "../../layout/Container";
import Paragraph from "../../html/Paragraph";
import styles from "./footer.module.scss";

// Define types for the component props
interface FooterProps {
 children?: React.ReactNode; // Optional, since children are passed inside the footer
}

const Footer: React.FC<FooterProps> = ({ children }) => {
 return (
  <footer className={styles.footer}>
   <Container>
    <Paragraph>Copyright 2025, Transform with Irini.</Paragraph>
   </Container>
   {children} {/* Render additional children if passed */}
  </footer>
 );
};

export default Footer;
