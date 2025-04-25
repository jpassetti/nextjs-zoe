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
 label,
 linkType,
 internalPage,
 externalUrl,
 size = "medium",
 variant,
 type,
 actionType = "button",
 href,
 children,
}) => {
 const resolvedVariant = variant || type; // Merge `variant` and `type`

 const buttonClasses = cx({
  button: true,
  [`size--${size}`]: size,
  [`variant--${resolvedVariant}`]: resolvedVariant, // Use merged `variant` and `type`
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
