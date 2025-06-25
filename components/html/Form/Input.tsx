import React, { useState, Fragment } from "react";
import classnames from "classnames/bind";
import styles from "./form.module.scss";

const cx = classnames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validate?: (value: string | number | boolean) => string | null;
  onValidation?: (error: string | null) => void;
  maxLength?: number;
  id?: string; // Added id to InputProps interface
}

const Input: React.FC<InputProps> = ({ type, validate, onValidation, maxLength, ...props }) => {
  const [error, setError] = useState<string | null>(null);
  const [formattedValue, setFormattedValue] = useState<string>("");

  const inputClasses = cx({
    [`form__input`]: true,
    [`form__input--${type}`]: type,
  });

  const handleValidation = (value: string | number | boolean) => {
    let validationError = null;

    if (validate) {
      validationError = validate(value);
    } else {
      switch (type) {
        case "email":
          validationError =
            typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ? "Invalid email address"
              : null;
          break;
        case "number":
          validationError =
            typeof value === "string" && isNaN(Number(value))
              ? "Must be a valid number"
              : null;
          break;
        case "tel":
          validationError =
            typeof value === "string" && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)
              ? "Invalid phone number"
              : null;
          break;
        case "checkbox":
        case "radio":
          validationError = null; // Radio and checkbox are valid as long as they are clicked
          break;
        default:
          validationError = null;
      }
    }

    setError(validationError);

    if (onValidation) {
      onValidation(validationError);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, ""); // Remove all non-digit characters
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formatted = [
        match[1] && `(${match[1]}`,
        match[2] && `) ${match[2]}`,
        match[3] && `-${match[3]}`,
      ]
        .filter(Boolean)
        .join("");
      return formatted;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (type === "tel") {
      value = formatPhoneNumber(value);
      setFormattedValue(value);
    }

    if (type === "checkbox") {
      const isChecked = e.target.checked; // Use checked state for checkboxes
      value = isChecked ? e.target.value : ""; // Assign value based on checked state
    }

    handleValidation(value); // Trigger validation on every change

    if (props.onChange) {
      // Pass the formatted value and type to the parent component
      props.onChange({
        ...e,
        target: { ...e.target, value, type },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleBlur = () => {
    // Re-trigger validation on blur to ensure the latest value is validated
    const valueToValidate = formattedValue || (props.value as string) || "";
    handleValidation(valueToValidate);
  };

  return (
    <Fragment>
      <input
        className={inputClasses}
        type={type}
        maxLength={maxLength}
        value={type === "tel" ? formattedValue : props.value}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur} // Trigger validation on blur
      />
      {error && <span className={cx("form__helperText", "form__helperText--error")}>{error}</span>}
    </Fragment>
  );
};

export default Input;