import React from "react";
import Label from "./Label";

const Checkbox = ({ name, value, checked, onChange, label }) => {
  return (
    <Label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </Label>
  );
};

export default Checkbox;
