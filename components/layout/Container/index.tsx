import React from "react";
import classnames from "classnames/bind";
import styles from "./container.module.scss";

// Binding classNames to styles
const cx = classnames.bind(styles);

// Define types for the component props
interface ContainerProps {
 alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"; // Possible values for alignItems
 children: React.ReactNode; // The content inside the container (required)
 justifyContent?:
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"; // Possible values for justifyContent
 type?: string; // The type of container, optional (e.g., 'content', 'sidebar')
 height?: string; // The height of the container, optional (e.g., 'auto', '100vh')
 width?: string; // The width of the container, optional (e.g., '100%', '50%')
}

const Container: React.FC<ContainerProps> = ({
 alignItems,
 children,
 height,
 justifyContent,
 type,
 width,
}) => {
 // Generate the dynamic class names based on the 'type' prop
 const containerClasses = cx({
  container: true,
  [`container__${type}`]: type, // Add class based on the 'type' if provided
  [`height--${height}`]: height, // Add class based on the 'height' if provided
  [`width--${width}`]: width, // Add class based on the 'width' if provided
  [`justify-content--${justifyContent}`]: justifyContent, // Add class based on the 'justifyContent' prop
  [`align-items--${alignItems}`]: alignItems, // Add class based on the 'alignItems' prop
 });

 return <div className={containerClasses}>{children}</div>;
};

export default Container;
