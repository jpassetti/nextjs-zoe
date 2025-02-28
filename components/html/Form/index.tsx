import { ChangeEvent, ReactNode } from "react";
import styles from "./form.module.scss";

// 🔹 Define the form component props
interface FormProps {
 children: ReactNode;
 onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// 🔹 Define the group component props
interface GroupProps {
 children: ReactNode;
}

// 🔹 Define the label component props
interface LabelProps {
 children: ReactNode;
 htmlFor?: string;
}

// 🔹 Define input props, now supporting text and radio inputs
interface InputProps {
 type:
  | "text"
  | "radio"
  | "email"
  | "number"
  | "password"
  | "checkbox"
  | "datetime-local"
  | "tel"; // Add more types as needed
 placeholder?: string;
 value?: string;
 name?: string;
 checked?: boolean; // Required for radio buttons
 onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface TextareaProps {
 name?: string;
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

// 🔹 Form.Input (Handles both text and radio inputs)
const Input = ({
 type,
 placeholder,
 value,
 name,
 checked,
 onChange,
}: InputProps) => {
 return (
  <input
   className={`${styles.form__input} ${styles[`form__input--${type}`]}`}
   type={type}
   placeholder={placeholder}
   value={value}
   name={name}
   checked={checked}
   onChange={onChange}
  />
 );
};
Form.Input = Input;

const Textarea = ({ name }: TextareaProps) => {
 return <textarea className={styles.form__textarea} name={name}></textarea>;
};
Form.Textarea = Textarea;

const Slide = ({ children }: GroupProps) => {
 return <div className={styles.form__slide}>{children}</div>;
};
Form.Slide = Slide;

// ✅ Export Form Component
export default Form;
