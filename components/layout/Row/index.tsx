import React from "react";
import classnames from "classnames/bind";
import styles from "./row.module.scss";

// Binding classNames to styles
const cx = classnames.bind(styles);

// Define types for the component props
interface RowProps {
 alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"; // Possible values for alignItems
 children: React.ReactNode; // The content inside the Row (required)
 className?: string; // Optional additional class names
 flexDirection?: "row" | "column"; // Possible values for flexDirection
 gap?: number; // Optional gap value, e.g., "1rem"
 justifyContent?:
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"; // Possible values for justifyContent
}

const Row: React.FC<RowProps> = ({
 alignItems,
 children,
 className,
 flexDirection,
 gap,
 justifyContent,
}) => {
 // Generate the dynamic class names based on the props
 const rowClasses = cx({
  row: true,
  [`justify-content--${justifyContent}`]: justifyContent,
  [`align-items--${alignItems}`]: alignItems,
  [`flex-direction--${flexDirection}`]: flexDirection,
  [`gap--${gap}`]: gap,
  className, // Allows additional custom classes
 });

 return <div className={rowClasses}>{children}</div>;
};

export default Row;
