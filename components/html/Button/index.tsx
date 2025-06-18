import React from "react";
import classNames from "classnames/bind";
import Icon, { icons } from "@/components/html/Icon";
import Link from "next/link";
import styles from "./button.module.scss";
import { ButtonProps, GroupProps, UIProps, StepProps } from "@/lib/interfaces";

const cx = classNames.bind(styles);

const Button: React.FC<ButtonProps> & {
  Group: React.FC<GroupProps>;
  UI: React.FC<UIProps>;
  Step: React.FC<StepProps>;
} = ({
  disabled =false,
  label,
  linkType,
  internalPage,
  externalUrl,
  size = "medium",
  variant,
  type,
  actionType = "button",
  children,
}) => {
  //console.log({externalUrl});
  const resolvedVariant = variant || type;
  const buttonClasses = cx({
    button: true,
    [`size--${size}`]: size,
    [`variant--${resolvedVariant}`]: resolvedVariant,
    [`disabled`]: disabled,
  });

  const content = children || label;

  if (linkType === "internal" && internalPage?.slug?.current) {
    return (
      <Link href={`/${internalPage.slug.current}`} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  if (linkType === "external") {
    //console.log("External URL: ", externalUrl);
    return (
      <a
        href={externalUrl}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} type={actionType}>
      {content}
    </button>
  );
};

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

const UI: React.FC<UIProps> = ({
 backgroundColor,
 disabled = false,
 iconProps,
 label,
 type, // Optional type for styling
 buttonType = "button", // Default HTML button attribute
 clickHandler,
}) => {
 const uiClasses = cx({
  [`button--ui`]: true,
  [`type--${type}`]: type, // Apply type class only if provided
  [`background-color--${backgroundColor}`]: backgroundColor,
 });

 const iconName = type === "primary" ? "menu" : iconProps?.name || undefined; // Use iconProps or undefined if no type

 return (
  <button className={uiClasses} type={buttonType} onClick={clickHandler} disabled={disabled}>
   {label && <span>{label}</span>} {/* Render label if provided */}
   {iconName && (
     <Icon
       name={iconName as keyof typeof icons} // Ensure `name` is a valid key
       color={
         (iconProps?.color as "black" | "accent" | "white" | "primary" | "secondary" | "gray" | "orange" | undefined) ||
         ((backgroundColor === "black" || backgroundColor === "accent"
           ? "white"
           : "black") as "black" | "accent" | "white" | "primary" | "secondary" | "gray" | "orange")
       }
     />
   )}
  </button>
 );
};

const Step: React.FC<StepProps> = ({
 disabled = false,
 type = "next", // ✅ Used for styling
 buttonType = "button", // ✅ Used for HTML button attribute
 label,
 clickHandler,
 variant,
}) => {
  const resolvedVariant = variant || type; // Merge `variant` and `type`

 const buttonClasses = cx({
  button: true,
  disabled: disabled,
  step: true,
  [`type--${type}`]: type, // ✅ Styling only
  [`variant--${resolvedVariant}`]: resolvedVariant, // Use merged `variant` and `type`
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

Button.Group = Group;
Button.UI = UI;
Button.Step = Step;

export default Button;
