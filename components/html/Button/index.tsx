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
 marginBottom?: number;
}

// Types for UI component props
interface UIProps {
 backgroundColor?: "black" | "accent" | "white"; // Add more color options if needed
 type?: string;
 label?: string;
 clickHandler: () => void;
}

// Types for Step component props
interface StepProps {
 label: string;
 clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void; // ✅ Accepts event
 type?: string;
}

// Button component
const Button: React.FC<ButtonProps> & {
 Group: React.FC<GroupProps>;
 UI: React.FC<UIProps>;
 Step: React.FC<StepProps>; // ✅ Add Step to the type definition
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
 marginBottom,
}) => {
 const groupClasses = cx({
  [`button--group`]: true,
  [`justify-content--${justifyContent}`]: justifyContent,
  [`margin-bottom--${marginBottom}`]: marginBottom,
  className,
 });
 return <div className={groupClasses}>{children}</div>;
};

// UI component (for button with icons)
const UI: React.FC<UIProps> = ({
 backgroundColor,
 label,
 type,
 clickHandler,
}) => {
 const uiClasses = cx({
  [`button--ui`]: true,
  [`type--${type}`]: type,
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 return (
  <button className={uiClasses} onClick={clickHandler}>
   {label ? label : ""}
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

// Step component
const Step: React.FC<StepProps> = ({ type, label, clickHandler }) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type,
 });

 return (
  <button onClick={clickHandler} className={buttonClasses}>
   {label}
  </button>
 );
};

// Assign subcomponents to the Button component
Button.Group = Group;
Button.UI = UI;
Button.Step = Step; // ✅ Ensure Step is assigned

export default Button;
