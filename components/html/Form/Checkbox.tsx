import React from "react";
import type { CheckboxProps } from "@/lib/interfaces";
import Label from "./Label";



const Checkbox: React.FC<CheckboxProps> = ({ name, value, label, checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <Label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </Label>
  );
};

export default Checkbox;