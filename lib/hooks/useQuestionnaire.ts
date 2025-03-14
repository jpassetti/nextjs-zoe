import { useState, useEffect } from "react";
import { getQuestionnaire } from "@/lib/sanity";
import { Questionnaire, Responses } from "@/lib/types/questionnaire";

export function useQuestionnaire(slug: string) {
 const [step, setStep] = useState<number>(0);
 const [responses, setResponses] = useState<Responses>({});
 const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [isStepValid, setIsStepValid] = useState(false);

 useEffect(() => {
  setLoading(true);
  getQuestionnaire(slug)
   .then((data) => {
    if (data && data.steps?.length > 0) {
     setQuestionnaire(data as Questionnaire);
    } else {
     setError("No steps found.");
    }
   })
   .catch(() => setError("Error fetching questionnaire."))
   .finally(() => setLoading(false));
 }, [slug]);

 // Validate current step
 useEffect(() => {
  if (questionnaire) {
   const currentStep = questionnaire.steps[step];
   const isValid = currentStep.questions.every((q) =>
    q.required
     ? responses[q.question] && responses[q.question].length > 0
     : true
   );
   setIsStepValid(isValid);
  }
 }, [responses, step, questionnaire]);

 // Handle user input
 const handleInputChange = (
  question: string,
  value: string | string[],
  type?: string
 ) => {
  setResponses((prev) => {
   if (type === "checkbox") {
    const prevAnswers: string[] = Array.isArray(prev[question])
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

 return {
  step,
  setStep,
  responses,
  handleInputChange,
  questionnaire,
  loading,
  error,
  isStepValid,
 };
}
