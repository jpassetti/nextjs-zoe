import { useState, useEffect } from "react";
import { getQuestionnaire } from "@/lib/sanity";
import { Questionnaire, Responses } from "@/lib/types/questionnaire";
import { validationPatterns } from "@/lib/validationPatterns";

export function useQuestionnaire(slug: string) {
 const [step, setStep] = useState<number>(0);
 const [responses, setResponses] = useState<Responses>({});
 const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [validationErrors, setValidationErrors] = useState<
  Record<string, string>
 >({});

 useEffect(() => {
  setLoading(true);
  getQuestionnaire(slug)
   .then((data) => {
    if (data && data.steps?.length > 0) {
     setQuestionnaire(data);
    } else {
     setError("No steps found.");
    }
   })
   .catch(() => setError("Error fetching questionnaire."))
   .finally(() => setLoading(false));
 }, [slug]);

 // 🔹 Handle input changes
 const handleInputChange = (
  question: string,
  value: string | string[],
  type?: string
 ) => {
  setResponses((prev) => {
   if (type === "checkbox") {
    const prevAnswers = Array.isArray(prev[question])
     ? (prev[question] as string[])
     : [];
    return {
     ...prev,
     [question]: prevAnswers.includes(value as string)
      ? prevAnswers.filter((v) => v !== value)
      : [...prevAnswers, value as string],
    };
   }
   return { ...prev, [question]: value };
  });
 };

 // 🔹 Validate current step
 const validateStep = (): boolean => {
  if (!questionnaire) return false;

  const currentStep = questionnaire.steps[step];
  let isValid = true;
  const newValidationErrors: Record<string, string> = {};

  currentStep.questions.forEach((q) => {
   const response = responses[q.question] || "";
   const pattern = validationPatterns[q.type]?.pattern;

   if (q.required && !response) {
    newValidationErrors[q.question] = "This field is required.";
    isValid = false;
   } else if (
    pattern &&
    typeof response === "string" &&
    !new RegExp(pattern).test(response)
   ) {
    newValidationErrors[q.question] = "Invalid format.";
    isValid = false;
   }
  });

  setValidationErrors(newValidationErrors);
  return isValid;
 };

 // 🔹 Go to next step
 const nextStep = () => {
  if (validateStep()) {
   setStep((prev) => prev + 1);
  }
 };

 // 🔹 Go to previous step
 const prevStep = () => {
  setStep((prev) => Math.max(0, prev - 1));
 };

 // 🔹 Compute isStepValid based on current step
 const isStepValid = validateStep();

 return {
  step,
  setStep,
  responses,
  setResponses,
  questionnaire,
  loading,
  error,
  validationErrors,
  handleInputChange,
  isStepValid,
  nextStep,
  prevStep,
 };
}
