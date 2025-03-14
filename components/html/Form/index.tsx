import { ChangeEvent, ReactNode } from "react";
import styles from "./form.module.scss";

// 🔹 Define form component props
interface FormProps {
 children: ReactNode;
 onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// 🔹 Define form group component props
interface GroupProps {
 children: ReactNode;
}

// 🔹 Define label component props
interface LabelProps {
 children: ReactNode;
 htmlFor?: string;
}

// 🔹 Define input props, supporting various types
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
  | "datetime-local"
  | "textarea"; // Added 'textarea' for consistency, though not a valid input type
 placeholder?: string;
 value?: string | string[]; // Allow multiple values for checkboxes
 name?: string;
 id?: string;
 checked?: boolean;
 required?: boolean;
 pattern?: string;
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

// 🔹 Define helper text props
interface HelperTextProps {
 children: ReactNode;
}

// 🔹 Define validation error props
interface ValidationErrorProps {
 message?: string;
}

// 🔹 Form component
const Form = ({ children, onSubmit }: FormProps) => {
 return <form onSubmit={onSubmit}>{children}</form>;
};

// 🔹 Form.Group
const Group = ({ children }: GroupProps) => {
 return <div className={styles.form__group}>{children}</div>;
};
Form.Group = Group;

// 🔹 Form.CheckboxGroup
const CheckboxGroup = ({ children }: GroupProps) => {
 return <div className={styles.form__checkbox_group}>{children}</div>;
};
Form.CheckboxGroup = CheckboxGroup;

// 🔹 Form.Label
const Label = ({ children, htmlFor }: LabelProps) => {
 return (
  <label className={styles.form__label} htmlFor={htmlFor}>
   {children}
  </label>
 );
};
Form.Label = Label;

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
 onChange,
}: InputProps) => {
 return (
  <input
   className={`${styles.form__input} ${styles[`form__input--${type}`]}`}
   type={type}
   placeholder={placeholder}
   value={value ?? ""} // Ensure controlled inputs don't become uncontrolled
   name={name}
   id={id}
   checked={checked}
   required={required}
   pattern={pattern}
   onChange={onChange}
  />
 );
};
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
   value={value ?? ""} // Ensure controlled behavior
   onChange={onChange}
  />
 );
};
Form.Textarea = Textarea;

// 🔹 Form.HelperText
const HelperText = ({ children }: HelperTextProps) => {
 return <p className={styles.form__helperText}>{children}</p>;
};
Form.HelperText = HelperText;

// 🔹 Form.ValidationError
const ValidationError = ({ message }: ValidationErrorProps) => {
 if (!message) return null;
 return <p className={styles.form__validationError}>{message}</p>;
};
Form.ValidationError = ValidationError;

// 🔹 Form.OtherInput (For handling "Other" option)
interface OtherInputProps {
 show: boolean;
 name: string;
 value: string;
 onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const OtherInput = ({ show, name, value, onChange }: OtherInputProps) => {
 if (!show) return null;
 return (
  <div className={styles.form__otherInput}>
   <Label htmlFor={name}>Please specify</Label>
   <Input type="text" name={name} id={name} value={value} onChange={onChange} />
  </div>
 );
};
Form.OtherInput = OtherInput;

// ✅ Export Form Component
export default Form;
