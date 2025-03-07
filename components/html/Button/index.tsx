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
 type?: "primary" | "secondary" | "accent" | "inverted"; // ✅ Used for styling
 buttonType?: "button" | "submit" | "reset"; // ✅ Used for HTML `<button>` type
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
 type?: "next" | "previous" | "primary"; // ✅ Styling purposes only
 buttonType?: "button" | "submit" | "reset"; // ✅ HTML button attribute
 label?: string;
 clickHandler?: () => void;
}

// Types for Step component props
interface StepProps {
 label: string;
 type?: "next" | "previous"; // ✅ Used for styling
 buttonType?: "button" | "submit" | "reset"; // ✅ Used for HTML button attribute
 clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
} // Button component

const Button: React.FC<ButtonProps> & {
 Group: React.FC<GroupProps>;
 UI: React.FC<UIProps>;
 Step: React.FC<StepProps>;
} = ({ href, label, type = "primary", buttonType = "button" }) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type, // ✅ Used for styling only
 });

 return href ? (
  <Link href={href} className={buttonClasses}>
   {label}
  </Link>
 ) : (
  <button className={buttonClasses} type={buttonType}>
   {label}
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
 type = "primary", // ✅ Used for styling
 buttonType = "button", // ✅ Used for the HTML attribute
 clickHandler,
}) => {
 const uiClasses = cx({
  [`button--ui`]: true,
  [`type--${type}`]: type, // ✅ Used for styling only
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 return (
  <button className={uiClasses} type={buttonType} onClick={clickHandler}>
   {label ? label : ""}
   <Icon
    icon={type} // ✅ This will still use "next"/"previous" for styling
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
 type = "next", // ✅ Used for styling
 buttonType = "button", // ✅ Used for HTML button attribute
 label,
 clickHandler,
}) => {
 const buttonClasses = cx({
  button: true,
  [`type--${type}`]: type, // ✅ Styling only
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
