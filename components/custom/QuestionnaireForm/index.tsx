"use client";

import { useEffect, useRef, useState } from "react";
import Form from "@/components/html/Form";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Checkbox from "@/components/html/Form/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import RadioGroup from "@/components/html/Form/RadioGroup";

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

  const [checkboxState, setCheckboxState] = useState<Record<string, { name: string; checked: boolean }[]>>({});
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [otherOptionState, setOtherOptionState] = useState<Record<string, boolean>>({});

  const isStepValid = () => {
    return questionnaire.steps[step]?.questions.every((q) => {
      if (q.type === "checkbox" && q.required) {
        return checkboxState[q.question]?.some((item) => item.checked);
      }
      if (q.type === "radio" && q.required) {
        return responses[q.question]?.[0] !== undefined;
      }
      if (["text", "email", "tel", "textarea"].includes(q.type) && q.required) {
        return responses[q.question]?.[0]?.trim() !== "";
      }
      return true; // Other input types rely on native validation
    });
  };

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(!isStepValid()); // Initialize after isStepValid is defined

  useEffect(() => {
    const initialState: Record<string, { name: string; checked: boolean }[]> = {};
    questionnaire.steps[step]?.questions.forEach((q) => {
      if (q.type === "checkbox" && q.options) {
        initialState[q.question] = q.options.map((option) => ({
          name: option,
          checked: responses[q.question]?.includes(option) || false, // Persist checked state from responses
        }));
      }
    });
    setCheckboxState(initialState);
  }, [step, questionnaire, responses]);

  useEffect(() => {
    setIsNextButtonDisabled(!isStepValid()); // Update button state based on step validity
  }, [responses, checkboxState]);

  // useEffect for console logging otherOptionState on update
  useEffect(() => {
    console.log("Other option state updated:", otherOptionState); // Debugging log
  }, [otherOptionState]);


  const updateCheckStatus = (question: string, index: number) => {
    setCheckboxState((prevState) => {
      const updatedQuestionState = prevState[question].map((item, currentIndex) =>
        currentIndex === index ? { ...item, checked: !item.checked } : item
      );

      // Trigger state update only after user interaction
      setTimeout(() => {
        handleInputChange(
          question,
          updatedQuestionState.filter((item) => item.checked).map((item) => item.name),
          "checkbox"
        );
      }, 0);

      return { ...prevState, [question]: updatedQuestionState };
    });
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaVerified(!!value);
  };

  const handleOtherOptionChange = (question: string, value: string) => {
    console.log("Other option selected:", { question, value }); // Debugging log
    setOtherOptionState((prevState) => {
      const newValue = value === "other";
      if (prevState[question] === newValue) {
        console.log("State unchanged, skipping update."); // Debugging log for unchanged state
        return prevState; // Skip state update if value is unchanged
      }
      const updatedState = { ...prevState, [question]: newValue };
      console.log("Updated otherOptionState:", updatedState); // Debugging log for state
      return updatedState;
    });
    handleInputChange(question, value === "other" ? "" : value, "radio");
  };

  const handleOtherInputChange = (question: string, value: string) => {
    console.log("Other input value:", { question, value }); // Debugging log
    handleInputChange(question, value, "text");
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        handleSubmit(e);
        trackFormCompletion(questionnaire.title);
      }}
    >
      <Heading level={2} marginBottom={1} marginTop={3} color="black">
        {questionnaire.steps[step]?.title || "Untitled Step"}
      </Heading>
      {questionnaire.steps[step]?.description && (
        <Paragraph color="black" marginBottom={3}>
          {questionnaire.steps[step].description}
        </Paragraph>
      )}

      {questionnaire.steps[step]?.questions.map((q, index) => (
        <Form.Group key={`step-${step}-question-${index}`}>
          <Heading level={3} marginBottom={1} color="black">
            {q.label}
          </Heading>
          {q.helperText && <Paragraph color="gray">{q.helperText}</Paragraph>}

          {q.type === "text" && (
            <Form.Input
              type="text"
              placeholder={q.placeholder || ""}
              value={responses[q.question]?.[0] || ""}
              name={q.question}
              required={q.required}
              autoComplete="name" // Correct casing for React
              onChange={(e) => {
                handleInputChange(q.question, e.target.value, "text");
              }}
            />
          )}

          {q.type === "email" && (
            <Form.Input
              type="email"
              placeholder={q.placeholder || ""}
              value={responses[q.question]?.[0] || ""}
              name={q.question}
              required={q.required}
              onChange={(e) => {
                handleInputChange(q.question, e.target.value, "email");
              }}
            />
          )}

          {q.type === "tel" && (
            <Form.Input
              type="tel"
              placeholder={q.placeholder || ""}
              maxLength={14} // Adjusted for formatted phone number length
              value={responses[q.question]?.[0] || ""}
              name={q.question}
              required={q.required}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formattedValue = rawValue.replace(
                  /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                  (match, p1, p2, p3) => {
                    let result = "";
                    if (p1) result += `(${p1}`;
                    if (p2) result += `) ${p2}`;
                    if (p3) result += `-${p3}`;
                    return result;
                  }
                );
                handleInputChange(q.question, formattedValue, "tel");
              }}
            />
          )}

          {q.type === "textarea" && (
            <Form.Textarea
              placeholder={q.placeholder || ""}
              maxLength={500}
              value={responses[q.question]?.[0] || ""}
              name={q.question}
              required={q.required}
              onChange={(e) => {
                handleInputChange(q.question, e.target.value, "textarea");
              }}
            />
          )}

          {q.type === "radio" && (
            <RadioGroup
              question={q.question}
              options={q.options || []}
              responses={responses}
              handleInputChange={handleInputChange}
              required={q.required}
            />
          )}

          {q.type === "checkbox" && checkboxState[q.question]?.map((item, i) => (
                <Checkbox
                  key={`checkbox-${step}-${q.question}-${i}`}
                  name={q.question}
                  value={item.name}
                  checked={item.checked}
                  onChange={() => updateCheckStatus(q.question, i)}
                  label={item.name}
                />
              ))}
              {q.required && checkboxState[q.question]?.every((item) => !item.checked) && (
                <span style={{ color: "red" }}>Please select at least one option</span>
              )}
            </Form.Group>
          ))}

      {step === questionnaire.steps.length - 1 && (
        <Button.Group justifyContent="space-between" borderTop={1}>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "your-default-site-key"} // Provide fallback for site key
            onChange={handleRecaptchaChange}
          />
        </Button.Group>
      )}

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
            disabled={isNextButtonDisabled} // Use state to control button disabled state
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
          <>
           
            <Button
              _type="button"
              label="Submit"
              variant={!isStepValid() || !recaptchaVerified ? "disabled" : "primary"} // Use variant to style disabled state
              actionType="submit"
              disabled={!isStepValid() || !recaptchaVerified} // Ensure button is disabled
            />
          </>
        )}
      </Button.Group>
    </Form>
  );
}
