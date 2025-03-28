import React from "react";
import classnames from "classnames/bind";
import styles from "./section.module.scss";

// Bind classNames to styles
const cx = classnames.bind(styles);

// Define types for the component props
interface SectionProps {
 backgroundColor?:
  | "primary"
  | "primary-dark"
  | "primary-light"
  | "secondary"
  | "tertiary"
  | string; // You can add more predefined colors or allow any string for backgroundColor
 children: React.ReactNode; // The content inside the section (required)
}

const Section: React.FC<SectionProps> = ({
 backgroundColor = "secondary",
 children,
}) => {
 // Generate the dynamic class names based on the backgroundColor prop
 const sectionClasses = cx({
  section: true,
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 return <section className={sectionClasses}>{children}</section>;
};

export default Section;
