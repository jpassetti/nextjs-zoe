import {
 forwardRef,
 ChangeEvent,
 ReactNode,
 FormHTMLAttributes,
 InputHTMLAttributes,
 TextareaHTMLAttributes,
} from "react";
import styles from "./form.module.scss";

// 🔹 Form props
interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
 children: ReactNode;
}

// 🔹 Input props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
}

// 🔹 OtherInput props
interface OtherInputProps {
 show: boolean;
 name: string;
 value: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// 🔹 Main form component
const FormBase = forwardRef<HTMLFormElement, FormProps>(
 ({ children, ...props }, ref) => {
  return (
   <form ref={ref} {...props}>
    {children}
   </form>
  );
 }
);
FormBase.displayName = "Form";

// 🔹 Subcomponents
const Group = ({ children }: { children: ReactNode }) => (
 <div className={styles.form__group}>{children}</div>
);

const CheckboxGroup = ({ children }: { children: ReactNode }) => (
 <div className={styles.form__checkbox_group}>{children}</div>
);

const Label = ({
 children,
 htmlFor,
}: {
 children: ReactNode;
 htmlFor?: string;
}) => (
 <label className={styles.form__label} htmlFor={htmlFor}>
  {children}
 </label>
);

const Input = ({
 type,
 className,
 pattern,
 title,
 inputMode,
 ...props
}: InputProps) => {
 const isTel = type === "tel";

 const defaultPattern = "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$";
 const defaultTitle = "Please enter a valid phone number";
 const defaultInputMode = "tel";

 const resolvedPattern = isTel && !pattern ? defaultPattern : pattern;
 const resolvedTitle = isTel && !title ? defaultTitle : title;
 const resolvedInputMode = isTel && !inputMode ? defaultInputMode : inputMode;

 return (
  <input
   className={`${styles.form__input} ${styles[`form__input--${type}`]} ${className || ""}`}
   type={type}
   pattern={resolvedPattern}
   title={resolvedTitle}
   inputMode={resolvedInputMode}
   {...props}
  />
 );
};

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
 <textarea className={styles.form__textarea} {...props} />
);

const HelperText = ({ children }: { children: ReactNode }) => (
 <p className={styles.form__helperText}>{children}</p>
);

const ValidationError = ({ message }: { message?: string }) =>
 message ? <p className={styles.form__validationError}>{message}</p> : null;

const OtherInput = ({ show, name, value, onChange }: OtherInputProps) => {
 if (!show) return null;
 return (
  <div className={styles.form__otherInput}>
   <Label htmlFor={name}>Please specify</Label>
   <Input type="text" name={name} id={name} value={value} onChange={onChange} />
  </div>
 );
};

// 🔹 Extend the main Form type with all subcomponents
type FormComponent = typeof FormBase & {
 Group: typeof Group;
 CheckboxGroup: typeof CheckboxGroup;
 Label: typeof Label;
 Input: typeof Input;
 Textarea: typeof Textarea;
 HelperText: typeof HelperText;
 ValidationError: typeof ValidationError;
 OtherInput: typeof OtherInput;
};

// 🔹 Merge base + subcomponents
const Form = Object.assign(FormBase, {
 Group,
 CheckboxGroup,
 Label,
 Input,
 Textarea,
 HelperText,
 ValidationError,
 OtherInput,
}) as FormComponent;

export default Form;
