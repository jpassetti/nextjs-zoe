import { useState, ChangeEvent, ReactNode } from "react";
import styles from "./form.module.scss";
import { validationPatterns } from "@/lib/validationPatterns";

// 🔹 Define form component props
interface FormProps {
 children: ReactNode;
 onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// 🔹 Define input props
interface InputProps {
 type:
  | "text"
  | "email"
  | "number"
  | "password"
  | "checkbox"
  | "radio"
  | "tel"
  | "date"
  | "datetime-local";
 placeholder?: string;
 value?: string | string[];
 name?: string;
 id?: string;
 checked?: boolean;
 required?: boolean;
 pattern?: string;
 maxLength?: number;
 onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// 🔹 Define textarea props
interface TextareaProps {
 name?: string;
 placeholder?: string;
 id?: string;
 required?: boolean;
 value?: string;
 onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

// 🔹 Define validation error props
interface ValidationErrorProps {
 message?: string;
}

// 🔹 Form component
const Form = ({ children, onSubmit }: FormProps) => {
 return <form onSubmit={onSubmit}>{children}</form>;
};
Form.displayName = "Form";

// 🔹 Form.Group
const Group = ({ children }: { children: ReactNode }) => {
 return <div className={styles.form__group}>{children}</div>;
};
Group.displayName = "Form.Group";
Form.Group = Group;

// 🔹 Form.Label
const Label = ({
 children,
 htmlFor,
}: {
 children: ReactNode;
 htmlFor?: string;
}) => {
 return (
  <label className={styles.form__label} htmlFor={htmlFor}>
   {children}
  </label>
 );
};
Label.displayName = "Form.Label";
Form.Label = Label;

// 🔹 Form.CheckboxGroup (Restored)
const CheckboxGroup = ({ children }: { children: ReactNode }) => {
 return <div className={styles.form__checkbox_group}>{children}</div>;
};
CheckboxGroup.displayName = "Form.CheckboxGroup";
Form.CheckboxGroup = CheckboxGroup;

// 🔹 Form.Input (Handles text, email, password, radio, checkbox, number, date, etc.)
const Input = ({
 type,
 placeholder,
 value,
 name,
 id,
 checked,
 required,
 pattern,
 maxLength,
 onChange,
}: InputProps) => {
 const [error, setError] = useState<string | null>(null);

 // Use predefined pattern if available, fallback to provided pattern
 const appliedPattern =
  pattern || validationPatterns[type]?.pattern || undefined;
 const appliedMaxLength =
  maxLength || validationPatterns[type]?.maxLength || undefined;

 const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.validity.valueMissing) {
   setError("This field is required.");
  } else if (e.target.validity.patternMismatch) {
   setError("Invalid format.");
  } else {
   setError(null);
  }
  onChange?.(e);
 };

 return (
  <div className={styles.form__group}>
   <input
    className={`${styles.form__input} ${styles[`form__input--${type}`]}`}
    type={type}
    placeholder={placeholder}
    value={value ?? ""}
    name={name}
    id={id}
    checked={checked}
    required={required}
    pattern={appliedPattern}
    maxLength={appliedMaxLength}
    onChange={handleValidation}
    onInvalid={(e) => e.preventDefault()} // Prevents default HTML popups
    aria-describedby={error ? `${id}-error` : undefined}
   />
   {error && <Form.ValidationError message={error} />}
  </div>
 );
};
Input.displayName = "Form.Input";
Form.Input = Input;

// 🔹 Form.Textarea
const Textarea = ({
 name,
 placeholder,
 id,
 required,
 value,
 onChange,
}: TextareaProps) => {
 return (
  <textarea
   className={styles.form__textarea}
   name={name}
   id={id}
   placeholder={placeholder}
   required={required}
   value={value ?? ""}
   onChange={onChange}
  />
 );
};
Textarea.displayName = "Form.Textarea";
Form.Textarea = Textarea;

// 🔹 Form.ValidationError
const ValidationError = ({ message }: ValidationErrorProps) => {
 if (!message) return null;
 return <p className={styles.form__validationError}>{message}</p>;
};
ValidationError.displayName = "Form.ValidationError";
Form.ValidationError = ValidationError;

// 🔹 Form.OtherInput (For handling "Other" option)
const OtherInput = ({
 show,
 name,
 value,
 onChange,
}: {
 show: boolean;
 name: string;
 value: string;
 onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
 if (!show) return null;
 return (
  <div className={styles.form__otherInput}>
   <Form.Label htmlFor={name}>Please specify</Form.Label>
   <Form.Input
    type="text"
    name={name}
    id={name}
    value={value}
    onChange={onChange}
   />
  </div>
 );
};
OtherInput.displayName = "Form.OtherInput";
Form.OtherInput = OtherInput;

// ✅ Export Form Component
export default Form;
