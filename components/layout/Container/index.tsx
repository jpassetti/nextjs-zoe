import React from "react";
import classnames from "classnames/bind";
import styles from "./container.module.scss";

// Binding classNames to styles
const cx = classnames.bind(styles);

// Define types for the component props
interface ContainerProps {
 children: React.ReactNode; // The content inside the container (required)
 type?: string; // The type of container, optional (e.g., 'content', 'sidebar')
}

const Container: React.FC<ContainerProps> = ({ children, type }) => {
 // Generate the dynamic class names based on the 'type' prop
 const containerClasses = cx({
  container: true,
  [`container__${type}`]: type, // Add class based on the 'type' if provided
 });

 return <div className={containerClasses}>{children}</div>;
};

export default Container;
