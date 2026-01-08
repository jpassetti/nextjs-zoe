import { useState, useEffect, useMemo } from "react";
import { getQuestionnaire } from "@/lib/sanity/queries/getQuestionnaire";
import { Questionnaire } from "@/lib/types/questionnaire";
import { validationPatterns } from "@/lib/validationPatterns";

export function useQuestionnaire(slug: string) {
 const [step, setStep] = useState<number>(0);
 const [responses, setResponses] = useState<Record<string, string[]>>({}); // All responses stored as arrays
 const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
 const [validationErrors, setValidationErrors] = useState<
  Record<string, string>
 >({});

 useEffect(() => {
  getQuestionnaire(slug)
   .then((data) => {
    if (data && data.steps?.length > 0) {
     setQuestionnaire(data);
     setError(null);
    } else {
     setQuestionnaire(null);
     setError("No steps found.");
    }

    setLoadedSlug(slug);
   })
   .catch(() => {
    setQuestionnaire(null);
    setError("Error fetching questionnaire.");
    setLoadedSlug(slug);
   });
 }, [slug]);

 const loading = loadedSlug !== slug;
 const questionnaireForSlug = loadedSlug === slug ? questionnaire : null;
 const errorForSlug = loadedSlug === slug ? error : null;

 const handleInputChange = (
  question: string,
  value: string | string[],
  type?: string
 ) => {
  setResponses((prev) => {
   const currentValues = prev[question] || [];

   if (type === "checkbox") {
    const updatedValues = Array.isArray(value)
     ? value
     : currentValues.includes(value)
     ? currentValues.filter((v) => v !== value)
     : [...currentValues, value];

    return {
     ...prev,
     [question]: updatedValues,
    };
   }

   return {
    ...prev,
    [question]: Array.isArray(value) ? value : [value], // Ensure single values are stored as arrays
   };
  });
 };

 const validateStep = (): boolean => {
  if (!questionnaireForSlug) return false;

  const currentStep = questionnaireForSlug.steps[step];
  let isValid = true;
  const newValidationErrors: Record<string, string> = {};

  currentStep.questions.forEach((q) => {
   const response = responses[q.question] || [];
   const pattern = validationPatterns[q.type]?.pattern;

   if (q.required && response.length === 0) {
    newValidationErrors[q.question] = "This field is required.";
    isValid = false;
   } else if (
    pattern &&
    response.length > 0 &&
    !response.every((r) => new RegExp(pattern).test(r))
   ) {
    newValidationErrors[q.question] = "Invalid format.";
    isValid = false;
   }
  });

  setValidationErrors(newValidationErrors);
  return isValid;
 };

 const isStepValid = useMemo(() => {
  if (!questionnaireForSlug) return false;

  const currentStep = questionnaireForSlug.steps[step];
  return currentStep.questions.every((q) => {
   const response = responses[q.question] || [];
   const pattern = validationPatterns[q.type]?.pattern;

   if (q.required && response.length === 0) return false;
   if (pattern) {
    return response.every((r) => new RegExp(pattern).test(r));
   }
   return true;
  });
 }, [questionnaireForSlug, step, responses]);

 const nextStep = () => {
  if (validateStep()) {
   setStep((prev) => prev + 1);
  }
 };

 const prevStep = () => {
  setStep((prev) => Math.max(0, prev - 1));
 };

 return {
  step,
  setStep,
  responses,
  setResponses,
  questionnaire: questionnaireForSlug,
  loading,
  error: errorForSlug,
  validationErrors,
  handleInputChange,
  validateStep,
  isStepValid,
  nextStep,
  prevStep,
 };
}
