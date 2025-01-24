import React from "react";
import classNames from "classnames/bind";
import styles from "./paragraph.module.scss";

// Binding classNames to styles
const cx = classNames.bind(styles);

// Define types for the component props
interface ParagraphProps {
 type?: "intro" | "caption"; // Type of paragraph (optional)
 caps?: boolean; // Whether the text is capitalized
 children: React.ReactNode; // The content of the paragraph (required)
 className?: string; // Optional additional class names
 condensed?: boolean; // Whether to condense the text
 color?: string; // Font color (optional, can be any string)
 diminish?: boolean; // Whether the text should be dimmed
 marginBottom?: number; // Optional margin at the bottom
 marginTop?: number; // Optional margin at the top
 textAlign?: "left" | "center" | "right" | "justify"; // Text alignment (optional)
 fontWeight?: "normal" | "bold" | "lighter" | string; // Font weight (optional)
}

const Paragraph: React.FC<ParagraphProps> = ({
 type,
 caps,
 children,
 className,
 condensed,
 color,
 diminish,
 marginBottom,
 marginTop,
 textAlign,
 fontWeight,
}) => {
 // Generate the dynamic class names based on props
 const paragraphClasses = cx({
  paragraph: true,
  intro: type === "intro",
  caption: type === "caption",
  [`margin-bottom-${marginBottom}`]: marginBottom,
  [`margin-top-${marginTop}`]: marginTop,
  diminish: diminish,
  [`text-align-${textAlign}`]: textAlign,
  [`font-weight-${fontWeight}`]: fontWeight,
  [`font-color-${color}`]: color,
  condensed: condensed,
  caps: caps,
  [className || ""]: className, // Support custom classNames if passed
 });

 // Render the paragraph with dynamic classes
 return <p className={paragraphClasses}>{children}</p>;
};

export default Paragraph;
