import React, { useState, Fragment } from "react";
import classnames from "classnames/bind";
import styles from "./form.module.scss";

const cx = classnames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validate?: (value: string | number | boolean) => string | null;
  onValidation?: (error: string | null) => void;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({ type, validate, onValidation, maxLength, ...props }) => {
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number>(0);

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
            typeof value === "string" && !/^\+?[0-9]{10,15}$/.test(value)
              ? "Invalid phone number"
              : null;
          break;
        case "checkbox":
        case "radio":
          validationError =
            typeof value !== "boolean" ? "Invalid selection" : null;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === "checkbox" || type === "radio" ? e.target.checked : e.target.value;

    if (type === "text" || type === "email" || type === "tel" || type === "password") {
      setCharCount((value as string).length);
    }

    handleValidation(value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Fragment>
      <input
        className={inputClasses}
        type={type}
        maxLength={maxLength}
        {...props}
        onChange={handleChange}
      />
      <div className={styles.form__helperText}>
        {maxLength && (
          <p
            className={cx("form__helperText", {
              "form__helperText--error": !!error,
              "form__helperText--success": !error && charCount < maxLength,
            })}
          >
            {charCount}/{maxLength} characters
          </p>
        )}
      </div>
      {error && <span className={cx("form__helperText", "form__helperText--error")}>{error}</span>}
    </Fragment>
  );
};

export default Input;