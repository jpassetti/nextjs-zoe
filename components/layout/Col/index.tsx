import React from "react";
import classNames from "classnames/bind";
import styles from "./col.module.scss";

const cx = classNames.bind(styles);

// Define types for the component props
interface ColProps {
 backgroundColor?: string;
 borderLeft?: boolean;
 children?: React.ReactNode;
 xs?: number;
 sm?: number;
 md?: number;
 lg?: number;
 xl?: number;
 fontSize?: string;
 fontWeight?: string;
 position?: "static" | "relative" | "absolute" | "fixed" | "sticky"; // Position types
 marginTop?: number;
 marginRight?: number;
 marginBottom?: number;
 marginLeft?: number;
 paddingTop?: number;
 paddingRight?: number;
 paddingBottom?: number;
 paddingLeft?: number;
 paddingAll?: number;
 th?: boolean; // If it's a table header
 td?: boolean; // If it's a table cell
 textAlign?: "left" | "center" | "right" | "justify"; // Text alignment
 flexOrder?: string; // Flex order, e.g. "xs:1 sm:2"
 verticalLine?: boolean; // If it's a vertical line
}

const Col: React.FC<ColProps> = ({
 backgroundColor,
 borderLeft,
 children,
 xs,
 sm,
 md,
 lg,
 xl,
 fontSize,
 fontWeight,
 position,
 marginTop,
 marginRight,
 marginBottom = "2", // Default value for marginBottom
 marginLeft,
 paddingTop,
 paddingRight = "1", // Default value for paddingRight
 paddingBottom,
 paddingLeft = "1", // Default value for paddingLeft
 paddingAll,
 th,
 td,
 textAlign,
 flexOrder,
 verticalLine,
}) => {
 // Process the flex order if it's provided
 const responsiveOrderArr = flexOrder ? flexOrder.split(" ") : null;
 const responsiveOrderObj: Record<string, string> = {};

 responsiveOrderArr?.forEach((string) => {
  const [key, value] = string.split(":");
  responsiveOrderObj[key] = value;
 });

 const colClasses = cx({
  col: true,
  [`col__xs__${xs}`]: xs,
  [`col__sm__${sm}`]: sm,
  [`col__md__${md}`]: md,
  [`col__lg__${lg}`]: lg,
  [`col__xl__${xl}`]: xl,
  sticky: position === "sticky",
  [`margin-top-${marginTop}`]: marginTop,
  [`margin-right-${marginRight}`]: marginRight,
  [`margin-bottom-${marginBottom}`]: marginBottom,
  [`margin-left-${marginLeft}`]: marginLeft,
  [`padding-top-${paddingTop}`]: paddingTop,
  [`padding-right-${paddingRight}`]: paddingRight,
  [`padding-bottom-${paddingBottom}`]: paddingBottom,
  [`padding-left-${paddingLeft}`]: paddingLeft,
  [`padding-all-${paddingAll}`]: paddingAll,
  [`position-${position}`]: position,
  [`table-header`]: th,
  [`table-data-cell`]: td,
  [`text-align-${textAlign}`]: textAlign,
  [`font-size-${fontSize}`]: fontSize,
  [`font-weight-${fontWeight}`]: fontWeight,
  [`flex-order-xs-${responsiveOrderObj["xs"]}`]:
   responsiveOrderObj.hasOwnProperty("xs"),
  [`flex-order-sm-${responsiveOrderObj["sm"]}`]:
   responsiveOrderObj.hasOwnProperty("sm"),
  [`flex-order-md-${responsiveOrderObj["md"]}`]:
   responsiveOrderObj.hasOwnProperty("md"),
  [`flex-order-lg-${responsiveOrderObj["lg"]}`]:
   responsiveOrderObj.hasOwnProperty("lg"),
  [`flex-order-xl-${responsiveOrderObj["xl"]}`]:
   responsiveOrderObj.hasOwnProperty("xl"),
  [`background-color-${backgroundColor}`]: backgroundColor,
  [`border-left-${borderLeft}`]: borderLeft,
  [`vertical-line`]: verticalLine,
 });

 return <div className={colClasses}>{children}</div>;
};

export default Col;
