"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Form from "@/components/html/Form";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import CheckboxGroup from "@/components/html/Form/CheckboxGroup";
import ReCAPTCHA from "react-google-recaptcha";
import RadioGroup from "@/components/html/Form/RadioGroup";
import type { QuestionnaireFormProps } from "@/lib/interfaces";
import { trackFormStep, trackFormCompletion } from "./utilities";

export default function QuestionnaireForm({
  questionnaire,
  step,
  setStep,
  title,
  description,
  slug,
  onError,
  responses,
  setResponses,
}: QuestionnaireFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter(); // Initialize useRouter
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isStepValid = useCallback(() => {
    return questionnaire.steps[step]?.questions.every((q) => {
      if (q.type === "checkbox" && q.required) {
        // Check if at least one checkbox value is selected in the responses
        return responses[q.question]?.length > 0;
      }
      if (q.type === "radio" && q.required) {
        return responses && responses[q.question] && responses[q.question][0] !== undefined;
      }
      if (["text", "email", "tel", "textarea"].includes(q.type) && q.required) {
        return responses && responses[q.question] && responses[q.question][0]?.trim() !== "";
      }
      return true; // Other input types rely on native validation
    });
  }, [questionnaire, step, responses]); // Wrap isStepValid in useCallback

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(!isStepValid()); // Initialize after isStepValid is defined


  useEffect(() => {
    setIsNextButtonDisabled(!isStepValid()); // Update button state based on step validity
  }, [responses, isStepValid]); // Add isStepValid to dependency array


  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaVerified(!!value);
  };

  const handleInputChange = (question: string, value: string | string[]) => {
    // @ts-expect-error TypeScript is unable to infer the correct type for `prev`
    setResponses((prev) => {
    // Ensure the state is updated immutably
    const updatedResponses: Record<string, string | string[]> = {
      ...prev,
      [question]: Array.isArray(value) ? value : [value], // Ensure value is always an array
    };
    return updatedResponses;
  });
};
  const onSuccess = (responseId: string) => {
    const slugString = typeof slug === "string" ? slug : slug?.current; // Extract slug if it's an object
    if (!slugString) {
      console.error("Invalid slug:", slug);
      return;
    }

    console.log("Form submitted successfully with response ID:", responseId);
    router.push(`/${slugString}/success?id=${responseId}`); // Redirect to the success page with the response ID
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, responses }),
      });

      if (!res.ok) throw new Error("Submission failed.");

      const result = await res.json();
      const responseId = result.responseId;

      if (onSuccess) onSuccess(responseId);
    } catch (error) {
      setSubmitting(false);
      console.error("Error submitting form:", error);
      if (onError) {
        if (error instanceof Error) {
          onError(error);
        } else {
          onError(new Error(String(error)));
        }
      }
    }
  };

  if (submitting) return <p>Submitting...</p>;

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        handleSubmit(e);
        trackFormCompletion(questionnaire.title);
      }}
    >
      {title && (
        <Heading level={1} marginBottom={2} color="black">
          {title}
        </Heading>
      )}
      {description && (
        <Paragraph color="black" marginBottom={3}>
          {description}
        </Paragraph>
      )}
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
          <Heading level={3} marginBottom={0} color="black">
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
                handleInputChange(q.question, e.target.value);
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
                handleInputChange(q.question, e.target.value);
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
                handleInputChange(q.question, formattedValue);
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
                handleInputChange(q.question, e.target.value);
              }}
            />
          )}

          {q.type === "radio" && (
            <RadioGroup
              question={q.question}
              options={q.options || []}
              responses={Object.fromEntries(
                Object.entries(responses).map(([k, v]) => [k, Array.isArray(v) ? v : typeof v === "string" ? [v] : []])
              )}
              handleInputChange={handleInputChange}
              required={q.required}
            />
          )}

          {q.type === "checkbox" && (
            <CheckboxGroup
              question={q.question}
              options={q.options || []}
              required={q.required}
              responses={responses}
              onChange={(question, selectedValues) => {
                handleInputChange(question, selectedValues);
              }}
            />
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
          <Button
            _type="button"
            label="Submit"
            variant={!isStepValid() || !recaptchaVerified ? "disabled" : "primary"} // Use variant to style disabled state
            actionType="submit"
            disabled={!isStepValid() || !recaptchaVerified} // Ensure button is disabled
          />
        )}
      </Button.Group>
    </Form>
  );
}
