import React from "react";
import styles from "./form.module.scss";
import Label from "./Label";
import Input from "./Input";

interface OtherInputProps {
  show: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export default OtherInput;