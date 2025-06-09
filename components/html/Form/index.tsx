import { useState, Fragment } from "react";
import classnames from "classnames/bind";

import {
 forwardRef,
 ChangeEvent,
 ReactNode,
 FormHTMLAttributes,
 InputHTMLAttributes,
 TextareaHTMLAttributes,
} from "react";

import styles from "./form.module.scss";
const cx = classnames.bind(styles);

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
  validate?: (value: string | number | boolean) => string | null; // Custom validation function
  onValidation?: (error: string | null) => void; // Notify parent about validation errors
}

// 🔹 OtherInput props
interface OtherInputProps {
 show: boolean;
 name: string;
 value: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  validate?: (value: string) => string | null; // Validation function
  onValidation?: (error: string | null) => void; // Notify parent about validation errors
}

// 🔹 Main form component
const FormBase = forwardRef<HTMLFormElement, FormProps>(
 ({ children, ...props }, ref) => {
  // const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  // const [isFormValid, setIsFormValid] = useState(true);

  // const handleValidation = (name: string, error: string | null) => {
  //   setFormErrors((prevErrors) => {
  //     const updatedErrors = { ...prevErrors, [name]: error };
  //     setIsFormValid(Object.values(updatedErrors).every((err) => err === null));
  //     return updatedErrors;
  //   });
  // };
  
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

const Input: React.FC<InputProps> = ({ type, validate, onValidation, ...props }) => {
  const [error, setError] = useState<string | null>(null);

  const inputClasses = cx({ 
    [`form__input`]: true,
    [`form__input--${type}`]: type, // Add type-specific class
  });

  const handleValidation = (value: string | number | boolean) => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
      if (onValidation) {
        onValidation(validationError);
      }
    } else {
      // Default validation logic for common types
      switch (type) {
        case "email":
          if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError("Invalid email address");
          } else {
            setError(null);
          }
          break;
        case "number":
          if (typeof value === "string" && isNaN(Number(value))) {
            setError("Must be a valid number");
          } else {
            setError(null);
          }
          break;
        case "tel":
          if (typeof value === "string" && !/^\+?[0-9]{10,15}$/.test(value)) {
            setError("Invalid phone number");
          } else {
            setError(null);
          }
          break;
        case "checkbox":
        case "radio":
          if (typeof value !== "boolean") {
            setError("Invalid selection");
          } else {
            setError(null);
          }
          break;
        default:
          setError(null); // No default validation
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === "checkbox" || type === "radio" ? e.target.checked : e.target.value;
    handleValidation(value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
   <Fragment>
      <input className={inputClasses} type={type} {...props} onChange={handleChange} />
      {error && <span style={{ color: "red" }}>{error}</span>}
   </Fragment>
  );
};

const Textarea: React.FC<TextareaProps> = ({ validate, onValidation, maxLength, ...props }) => {
  const [error, setError] = useState<string | null>(null);

  const textAreaClasses = cx({ 
    [`form__textarea`]: true, 
  });

  const handleValidation = (value: string) => {
    let validationError = null;
    if (validate) {
      validationError = validate(value);
    }
    // Check for maxLength validation
    if (maxLength && value.length > maxLength) {
      validationError = `Maximum ${maxLength} characters allowed`;
    }
    setError(validationError);
    if (onValidation) {
      onValidation(validationError);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleValidation(value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Fragment>
      <textarea className={textAreaClasses} maxLength={maxLength} onChange={handleChange} {...props} />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </Fragment>
  );
};


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
