import React, { useState, useEffect } from "react";
import type { CheckboxGroupProps } from "@/lib/interfaces";
import Checkbox from "./Checkbox";

import styles from './form.module.scss';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  question,
  options,
  required = false,
  responses,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(responses[question])
      ? responses[question] as string[]
      : responses[question]
      ? [responses[question] as string]
      : []
  );
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    const updatedValues = isChecked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    setSelectedValues(updatedValues);
    onChange(question, updatedValues);

    // Hide validation message when at least one checkbox is selected
    if (updatedValues.length > 0) {
      setShowValidationMessage(false);
    }
  };

  useEffect(() => {
    // Show validation message if required and no checkbox is selected
    if (required && selectedValues.length === 0) {
      setShowValidationMessage(true);
    }
  }, [selectedValues, required]);

  return (
    <div className={styles.form__checkbox_group}>
      {options.map((option, index) => (
        <Checkbox
          key={`${question}-${index}`}
          name={question}
          value={option}
          label={option}
          checked={selectedValues.includes(option)}
          onChange={(isChecked) => handleCheckboxChange(option, isChecked)}
        />
      ))}
      {showValidationMessage && (
        <span style={{ color: "red" }}>Please select at least one option</span>
      )}
    </div>
  );
};

export default CheckboxGroup;