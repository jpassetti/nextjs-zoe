"use client";

import { useRef, useState } from "react";
import Form from "@/components/html/Form";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

interface Question {
  label: string;
  question: string;
  type:
  | "text"
  | "email"
  | "tel"
  | "password"
  | "number"
  | "date"
  | "textarea"
  | "radio"
  | "checkbox";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: string[];
}

interface Step {
  title: string;
  description?: string;
  questions: Question[];
}

interface Questionnaire {
  title: string;
  description?: string;
  steps: Step[];
}

interface QuestionnaireFormProps {
  step: number;
  setStep: (step: number) => void;
  responses: Record<string, string | string[]>;
  handleInputChange: (
    question: string,
    value: string | string[],
    type?: string
  ) => void;
  questionnaire: Questionnaire;
  validationErrors: Record<string, string>;
  validateStep: () => boolean; // ✅ Add this line
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

// Google Analytics tracking helpers
function trackFormStep(step: number, questionnaireTitle: string) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      "form_step",
      {
        step,
        questionnaire_title: questionnaireTitle,
      }
    );
  }
}

function trackFormCompletion(questionnaireTitle: string) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      "form_complete",
      {
        questionnaire_title: questionnaireTitle,
      }
    );
  }
}

export default function QuestionnaireForm({
  step,
  setStep,
  responses,
  handleInputChange,
  questionnaire,
  handleSubmit,
}: QuestionnaireFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string | string[] | null }>({});
  const [isFormValid, setIsFormValid] = useState(true);

  const updateFormValidity = (
    updatedErrors: { [key: string]: string | null },
    updatedValues: { [key: string]: string | string[] | null }
  ) => {
    const allFieldsFilled = Object.values(updatedValues).every(
      (value) =>
        value !== null &&
        (Array.isArray(value) ? value.length > 0 : value !== "")
    );
    const noValidationErrors = Object.values(updatedErrors).every((error) => error === null);
    setIsFormValid(allFieldsFilled && noValidationErrors);
  };

  const handleValidation = (name: string, error: string | null) => {
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, [name]: error };
      updateFormValidity(updatedErrors, formValues);
      return updatedErrors;
    });
  };

  const handleValueChange = (name: string, value: string | string[] | null) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      updateFormValidity(formErrors, updatedValues);
      return updatedValues;
    });
  };
  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        handleSubmit(e);
        // Track form completion on submit
        trackFormCompletion(questionnaire.title);
      }}
    >
      {/* Step Heading */}
      <Heading level={2} marginBottom={1} marginTop={3} color="black">
        {questionnaire.steps[step]?.title || "Untitled Step"}
      </Heading>
      {questionnaire.steps[step]?.description && (
        <Paragraph color="black" marginBottom={3}>
          {questionnaire.steps[step].description}
        </Paragraph>
      )}

      {/* Questions */}
      {questionnaire.steps[step]?.questions.map((q, index) => (
        <Form.Group key={`step-${step}-question-${index}`}>
          <Heading level={3} marginBottom={1} color="black">
            {q.label} {q.required && <span style={{ color: "red" }}>*</span>}
          </Heading>
          {q.helperText && <Paragraph color="gray">{q.helperText}</Paragraph>}

          {/* Standard inputs */}
          {["text", "email", "tel", "password", "number", "date"].includes(q.type) && (
            <Form.Input
              type={q.type as "text" | "email" | "tel" | "password" | "number" | "date"}
              placeholder={q.placeholder || ""}
              maxLength={100} // Set maximum character limit
              value={typeof responses[q.question] === "string" ? responses[q.question] : ""}
              name={q.question}
              required={q.required}
              validate={(value) => {
                if (
                  q.required &&
                  (!value ||
                    (typeof value === "string" && value.trim() === "") ||
                    (typeof value !== "string" && String(value).trim() === ""))
                ) {
                  return "This field is required";
                }
                if (typeof value === "string" && value.length > 100) {
                  return "Maximum 100 characters allowed";
                }
                if (q.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
                  return "Invalid email address";
                }
                if (q.type === "tel" && value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(String(value))) {
                  return "Invalid phone number. Format: (###) ###-####";
                }

                return null;
              }}
              onValidation={(error) => handleValidation(q.question, error)}
              onChange={(e) => {
                handleValueChange(q.question, e.target.value);
                handleInputChange(q.question, e.target.value);
              }}
            />
          )}

          {/* Textarea */}
          {q.type === "textarea" && (
            <Form.Textarea
              placeholder={q.placeholder || ""}
              maxLength={500}
              value={typeof responses[q.question] === "string" ? responses[q.question] : ""}
              name={q.question}
              required={q.required}
              validate={(value) => {
                if (q.required && (!value || value.trim() === "")) {
                  return "This field is required";
                }
                if (value.length > 500) {
                  return "Maximum 500 characters allowed";
                }
                return null;
              }}              //onValidation={(error) => handleValidation(q.question, error)}
              onChange={(e) => {
                handleValueChange(q.question, e.target.value);
                handleInputChange(q.question, e.target.value);
              }}
            />
          )}

          {/* Radio group */}
          {q.type === "radio" &&
            q.options?.map((option, i) => (
              <Form.Label key={`radio-${step}-${q.question}-${i}`}>
                <Form.Input
                  type="radio"
                  name={q.question}
                  required={q.required}
                  value={option}
                  checked={responses[q.question] === option}
                  onChange={(e) => {
                    handleValueChange(q.question, e.target.value);
                    handleInputChange(q.question, e.target.value);
                  }}
                />
                {option}
              </Form.Label>
            ))}

          {/* Checkbox group */}
        {q.type === "checkbox" && (
  <Form.CheckboxGroup>
    {q.options?.map((option, i) => (
      <Form.Label key={`checkbox-${step}-${q.question}-${i}`}>
        <Form.Input
          type="checkbox"
          name={q.question} // Use the same name for all checkboxes in the group
          value={option}
          checked={
            Array.isArray(responses[q.question])
              ? responses[q.question].includes(option)
              : false
          }
          onChange={(e) => {
            const checked = e.target.checked;

            // Ensure responses[q.question] is an array
            const currentValues = Array.isArray(responses[q.question])
              ? responses[q.question]
              : [];

            // Update the array based on whether the checkbox is checked or unchecked
            const updatedValues = checked
              ? [...currentValues, option]
              : currentValues.filter((val) => val !== option);

            // Update the state with the new array
            handleValueChange(q.question, updatedValues);
            handleInputChange(q.question, updatedValues, "checkbox");
          }}
        />
        {option}
      </Form.Label>
    ))}
    {/* Group-level validation */}
    {q.required && Array.isArray(responses[q.question]) && responses[q.question].length === 0 && (
      <span style={{ color: "red" }}>Please select at least one option</span>
    )}
  </Form.CheckboxGroup>
)}

        </Form.Group>
      ))}

      {/* Navigation Buttons */}
      <Button.Group justifyContent="space-between" borderTop={1}>
        {step > 0 && (
          <Button.Step
            label="Previous"
            variant="inverted"
            buttonType="button"
            clickHandler={() => setStep(step - 1)}
          />
        )}
        <Paragraph textAlign={step === 0 ? "left" : "center"}>
          Step {step + 1} of {questionnaire.steps.length}
        </Paragraph>
        {step < questionnaire.steps.length - 1 && (
          <Button.Step
            label="Next"
            variant="primary"
            buttonType="button"
            disabled={!isFormValid}
            clickHandler={() => {
              if (formRef.current?.checkValidity()) {
                setStep(step + 1);
                trackFormStep(step + 2, questionnaire.title);
              } else {
                formRef.current?.reportValidity();
              }
            }}
          />
        )}
        {step === questionnaire.steps.length - 1 && (
          <Button
            _type="button"
            label="Submit"
            variant="primary"
            actionType="submit"
            disabled={!isFormValid}
          />
        )}
      </Button.Group>

    </Form>
  );
}
