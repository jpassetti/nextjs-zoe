import React from "react";
import Container from "../../layout/Container";
import Paragraph from "../../html/Paragraph";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
 const handleThemeChange = (theme: "theme1" | "theme2") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  window.location.reload(); // ✅ Force reload to reapply font variables
 };

 return (
  <footer className={styles.footer}>
   <Container>
    <Paragraph>Copyright 2025, Transform with Irini.</Paragraph>
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
     <button onClick={() => handleThemeChange("theme1")}>Theme 1</button>
     <button onClick={() => handleThemeChange("theme2")}>Theme 2</button>
    </div>
   </Container>
  </footer>
 );
};

export default Footer;
