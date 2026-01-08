import React from "react";
import Form from "@/components/html/Form";

interface RadioGroupProps {
  question: string;
  options: string[];
  responses: Record<string, string | string[]>;
  handleInputChange: (
    question: string,
    value: string | string[],
    type?: string
  ) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  question,
  options,
  responses,
  handleInputChange,
  required,
}) => {
  const selectedResponse = Array.isArray(responses[question])
    ? responses[question][0]
    : responses[question];

  const normalizedSelected = (selectedResponse ?? "").toLowerCase().split(" ")[0];
  const isOtherSelected = normalizedSelected === "other";

  const handleOptionChange = (value: string) => {
    const normalizedValue = value.toLowerCase().split(" ")[0]; // Normalize the value
    const isOther = normalizedValue === "other";
    if (isOther) {
      handleInputChange(question, "other", "radio"); // Add "other" answer to responses
      handleInputChange(`${question}-other`, "", "text"); // Initialize conditional text box value
    } else {
      handleInputChange(question, value, "radio"); // Add selected option to responses
    }
  };

  return (
    <>
      {options.map((option, i) => {
        const normalizedOption = option.toLowerCase().split(" ")[0]; // Normalize the option
        const isOtherOption = normalizedOption === "other";
        const radioId = `radio-${question}-${i}`;
        return (
          <Form.Label key={radioId} htmlFor={radioId}>
            <Form.Input
              type="radio"
              id={radioId}
              name={question}
              value={option}
              required={required}
              checked={
                responses[question]?.[0] === option ||
                (isOtherOption && isOtherSelected) // Ensure "other" remains checked
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOptionChange(e.target.value);
              }}
            />
            {option}
          </Form.Label>
        );
      })}
      {isOtherSelected && (
        <Form.Input
          type="text"
          placeholder="Please specify"
          value={responses[`${question}-other`] || ""}
          name={`${question}-other`}
          required={required}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log("Typing into other input:", { question, value }); // Debugging log
            handleInputChange(`${question}-other`, value, "text"); // Ensure correct key is used for responses
          }}
        />
      )}
    </>
  );
};

export default RadioGroup;
