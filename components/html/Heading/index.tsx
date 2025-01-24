import React, { ReactNode, ElementType } from "react";
import classNames from "classnames/bind";
import styles from "./heading.module.scss";

// Binding classNames to styles
const cx = classNames.bind(styles);

// Define types for the component props
interface HeadingProps {
 borderTop?: boolean;
 children: ReactNode;
 className?: string;
 color?: string;
 fontFamily?: string;
 fontStyle?: string;
 fontWeight?: string;
 label?: boolean;
 level: number; // h1-h6
 lineHeight?: string;
 marginTop?: number;
 marginBottom?: number;
 marginLeft?: number;
 marginRight?: number;
 textAlign?: "left" | "center" | "right" | "justify"; // Allowed text alignments
 textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
 size?: string; // You can define more specific size types if necessary
}

const Heading: React.FC<HeadingProps> = ({
 borderTop,
 children,
 className,
 color,
 fontFamily,
 fontStyle,
 fontWeight,
 label,
 level,
 lineHeight,
 marginTop,
 marginBottom,
 marginLeft,
 marginRight,
 textAlign,
 textTransform,
 size,
}) => {
 // Mapping for valid heading levels
 function getTagLevel(level: number): ElementType {
  return `h${level}` as ElementType;
 }

 // Ensure that the level is within the valid range and default to "h6" for out-of-bound values
 const Tag: ElementType = getTagLevel(level) || "h6"; // Explicitly cast to ElementType

 // Generate the dynamic class names
 const headingClasses = cx({
  heading: true,
  [`heading--level-${level}`]: level,
  [`text-align-${textAlign}`]: textAlign,
  [`margin-top-${marginTop}`]: marginTop,
  [`margin-right-${marginRight}`]: marginRight,
  [`margin-bottom-${marginBottom}`]: marginBottom,
  [`margin-left-${marginLeft}`]: marginLeft,
  [`border-top-${borderTop}`]: borderTop,
  [`text-transform-${textTransform}`]: textTransform,
  [`font-weight-${fontWeight}`]: fontWeight,
  [`font-color-${color}`]: color,
  [`font-style-${fontStyle}`]: fontStyle,
  [`line-height-${lineHeight}`]: lineHeight,
  [`font-family-${fontFamily}`]: fontFamily,
  [`size-${size}`]: size,
  label: label, // Use `label` prop if it is passed
  className, // Allow additional classNames passed via props
 });

 // Render the heading tag with the calculated classes
 return <Tag className={headingClasses}>{children}</Tag>;
};

export default Heading;
