import React, { useState, Fragment } from "react";
import classnames from "classnames/bind";
import styles from "./form.module.scss";

const cx = classnames.bind(styles);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  validate?: (value: string) => string | null;
  onValidation?: (error: string | null) => void;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  validate,
  onValidation,
  maxLength,
  value,
  defaultValue,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number>(
    (value as string)?.length || (defaultValue as string)?.length || 0
  );

  const handleValidation = (value: string) => {
    let validationError = null;

    if (validate) {
      validationError = validate(value);
    }

    if (maxLength && value.length > maxLength) {
      validationError = `Maximum ${maxLength} characters allowed`;
    }

    setError(validationError);

    if (onValidation) {
      onValidation(validationError);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setCharCount(newValue.length); // Update character count live
    handleValidation(newValue);

    if (props.onInput) {
      props.onInput(e);
    }
  };

  return (
    <Fragment>
      <textarea
        className={cx("form__textarea")}
        maxLength={maxLength}
        onInput={handleInput} // Use onInput for live updates
        value={value} // Ensure controlled behavior
        defaultValue={defaultValue} // Fallback for uncontrolled behavior
        {...props}
      />
      <div className={styles.form__charCount}>
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

export default Textarea;