import React from "react";
import classNames from "classnames/bind";
import Icon from "@/components/html/Icon";
import Link from "next/link";
import styles from "./button.module.scss";

const cx = classNames.bind(styles);

// Types for Button component props
interface ButtonProps {
 href?: string;
 label: string;
 type?: string;
 buttonType?: "button" | "submit" | "reset"; // ✅ Allow button type
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
 backgroundColor?: "black" | "accent" | "white";
 type?: string;
 label?: string;
 clickHandler?: () => void;
 buttonType?: "button" | "submit" | "reset"; // ✅ Allow button type
}

// Types for Step component props
interface StepProps {
 label: string;
 clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
 type?: string;
 buttonType?: "button" | "submit" | "reset"; // ✅ Allow button type
}

// Button component
const Button: React.FC<ButtonProps> & {
 Group: React.FC<GroupProps>;
 UI: React.FC<UIProps>;
 Step: React.FC<StepProps>;
} = ({ href, label, type = "default", buttonType = "button" }) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type,
 });

 return (
  <button className={buttonClasses} type={buttonType}>
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
 type = "button", // Default type to "button"
 clickHandler,
}) => {
 const uiClasses = cx({
  [`button--ui`]: true,
  [`type--${type}`]: type,
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 return (
  <button className={uiClasses} type={type} onClick={clickHandler}>
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
const Step: React.FC<StepProps> = ({
 type,
 label,
 clickHandler,
 buttonType = "button", // ✅ Default to "button"
}) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type,
 });

 return (
  <button onClick={clickHandler} className={buttonClasses} type={buttonType}>
   {label}
  </button>
 );
};

// Assign subcomponents to the Button component
Button.Group = Group;
Button.UI = UI;
Button.Step = Step;

export default Button;
