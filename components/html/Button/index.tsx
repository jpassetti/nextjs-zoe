import React from "react";
import classNames from "classnames/bind";
import Icon from "@/components/html/Icon";
import Link from "next/link";
import styles from "./button.module.scss";

// Bind classNames to the styles object
const cx = classNames.bind(styles);

// Types for Button component props
interface ButtonProps {
 href?: string;
 label: string;
 type?: string;
}

// Types for Group component props
interface GroupProps {
 children: React.ReactNode;
 className?: string;
 justifyContent?: string;
}

// Types for UI component props
interface UIProps {
 backgroundColor?: "black" | "accent" | "white"; // Add more color options if needed
 type?: string;
 clickHandler: () => void;
}

// Button component
const Button: React.FC<ButtonProps> & {
 Group: React.FC<GroupProps>;
 UI: React.FC<UIProps>;
} = ({ href, label, type = "default" }) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type,
 });
 return (
  <button className={buttonClasses}>
   {href ? <Link href={href}>{label}</Link> : label}
  </button>
 );
};

// Group component
const Group: React.FC<GroupProps> = ({
 children,
 className,
 justifyContent,
}) => {
 const groupClasses = cx({
  [`button--group`]: true,
  [`justify-content--${justifyContent}`]: justifyContent,
  className,
 });
 return <div className={groupClasses}>{children}</div>;
};

// UI component (for button with icons)
const UI: React.FC<UIProps> = ({ backgroundColor, type, clickHandler }) => {
 const uiClasses = cx({
  [`button--ui`]: true,
  [`type--${type}`]: type,
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 return (
  <button className={uiClasses} onClick={clickHandler}>
   <Icon
    icon={type}
    color={
     backgroundColor === "black" || backgroundColor === "accent"
      ? "white"
      : "black"
    }
   />
  </button>
 );
};

// Assign subcomponents to the Button component
Button.Group = Group;
Button.UI = UI;

export default Button;
