import React from "react";
import classNames from "classnames/bind";
import Icon, { icons } from "@/components/html/Icon";
import Link from "next/link";
import styles from "./button.module.scss";

const cx = classNames.bind(styles);

// Types for Button component props
interface ButtonProps {
  label?: string; // Text displayed on the button
  linkType?: "internal" | "external"; // Determines the type of link
  internalPage?: { slug?: { current?: string } }; // Reference to an internal page
  externalUrl?: string; // URL for external links
  size?: "small" | "medium" | "large"; // Button size
  variant?: "primary" | "secondary" | "accent" | "inverted" | "inverted-white"; // Button style
  actionType?: "button" | "submit" | "reset"; // HTML button type
  href?: string; // Fallback URL
  children?: React.ReactNode; // Optional children for custom content
}

// Types for Group component props
interface GroupProps {
 borderTop?: number;
 children: React.ReactNode;
 className?: string;
 justifyContent?: string;
 marginBottom?: number;
}

// Types for UI component props
interface UIProps {
 backgroundColor?: "black" | "accent" | "white";
 type?: "next" | "previous" | "primary" | "menu" | "close"; // ✅ Styling purposes only
 buttonType?: "button" | "submit" | "reset"; // ✅ HTML button attribute
 label?: string;
 clickHandler?: () => void;
}

// Types for Step component props
interface StepProps {
 disabled?: boolean;
 label: string;
 type?: "next" | "previous"; // ✅ Used for styling
 buttonType?: "button" | "submit" | "reset"; // ✅ Used for HTML button attribute
 clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
} // Button component

const Button: React.FC<ButtonProps> & {
 Group: React.FC<GroupProps>;
 UI: React.FC<UIProps>;
 Step: React.FC<StepProps>;
} = ({
  label,
  linkType,
  internalPage,
  externalUrl,
  size = "medium",
  variant = "primary",
  actionType = "button",
  href,
  children,
}) => {
  console.log({linkType, internalPage, externalUrl, href});
  const buttonClasses = cx({
    button: true,
    [`size--${size}`]: size,
    [`variant--${variant}`]: variant,
  });

  const resolvedHref =
    linkType === "internal"
      ? internalPage?.slug?.current
      : linkType === "external"
      ? externalUrl
      : href;

  const content = children || label;

  return resolvedHref ? (
    <Link href={resolvedHref} className={buttonClasses}>
      {content}
    </Link>
  ) : (
    <button className={buttonClasses} type={actionType}>
      {content}
    </button>
  );
};

// Group component
const Group: React.FC<GroupProps> = ({
 borderTop,
 children,
 className,
 justifyContent,
 marginBottom,
}) => {
 const groupClasses = cx({
  [`button--group`]: true,
  [`justify-content--${justifyContent}`]: justifyContent,
  [`margin-bottom--${marginBottom}`]: marginBottom,
  [`border-top--${borderTop}`]: borderTop,
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

 const iconName = type === "primary" ? "menu" : type; // Map `primary` to a valid icon name

 if (!icons[iconName as keyof typeof icons]) {
  console.error(`Invalid icon name: ${iconName}`);
  return null;
 }

 return (
  <button className={uiClasses} type={buttonType} onClick={clickHandler}>
   {label ? label : ""}
   <Icon
    name={iconName as keyof typeof icons} // Ensure `name` is a valid key
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
 disabled = false,
 type = "next", // ✅ Used for styling
 buttonType = "button", // ✅ Used for HTML button attribute
 label,
 clickHandler,
}) => {
 const buttonClasses = cx({
  button: true,
  disabled: disabled,
  step: true,
  [`type--${type}`]: type, // ✅ Styling only
 });

 return (
  <button
   onClick={clickHandler}
   className={buttonClasses}
   type={buttonType}
   disabled={disabled}
  >
   {label}
  </button>
 );
};

// Assign subcomponents to the Button component
Button.Group = Group;
Button.UI = UI;
Button.Step = Step;

export default Button;
