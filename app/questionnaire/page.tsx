"use client";

import { useState, useEffect } from "react";
import { getQuestionnaire } from "@/lib/sanity";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Section from "@/components/layout/Section";
import Form from "@/components/html/Form";
import Button from "@/components/html/Button";

interface Question {
 question: string;
 type: "short" | "long" | "multiple" | "checkbox";
 options?: string[]; // Only for multiple-choice or checkbox questions
}

interface Step {
 title: string;
 description?: string;
 questions: Question[];
}

interface Questionnaire {
 _id: string;
 title: string;
 description?: string;
 steps: Step[];
}

export default function QuestionnaireLandingPage() {
 const [step, setStep] = useState<number>(0);
 const [responses, setResponses] = useState<Record<string, string | string[]>>(
  {}
 );
 const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 // Fetch questionnaire data
 useEffect(() => {
  setLoading(true);
  getQuestionnaire("consultation-questionnaire")
   .then((data) => {
    console.log({ data });
    if (data && data.steps?.length > 0) {
     setQuestionnaire(data);
    } else {
     setError("No steps found.");
    }
   })
   .catch(() => setError("Error fetching questionnaire."))
   .finally(() => setLoading(false));
 }, []);

 if (loading) return <p>Loading...</p>;
 if (error) return <p style={{ color: "red" }}>{error}</p>;
 if (
  !questionnaire ||
  !questionnaire.steps ||
  questionnaire.steps.length === 0
 ) {
  return <p>No questionnaire found.</p>;
 }

 const steps: Step[] = questionnaire?.steps ?? [];

 const handleInputChange = (
  question: string,
  value: string,
  type?: "short" | "long" | "multiple" | "checkbox"
 ) => {
  setResponses((prev) => {
   if (type === "checkbox") {
    // Ensure that prev[question] is always treated as an array of strings
    const prevAnswers: string[] = Array.isArray(prev[question])
     ? (prev[question] as string[])
     : [];

    return {
     ...prev,
     [question]: prevAnswers.includes(value)
      ? prevAnswers.filter((v) => v !== value) // Remove if unchecked
      : [...prevAnswers, value], // Add if checked
    };
   }

   return { ...prev, [question]: value };
  });
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Submitting responses:", responses);

  try {
   const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     questionnaireId: questionnaire?._id, // Ensure questionnaire exists
     responses,
    }),
   });

   if (!res.ok) throw new Error("Submission failed.");
   alert("Submitted successfully!");
  } catch (error) {
   console.error("Error submitting form:", error);
   alert("Submission failed. Please try again.");
  }
 };

 return (
  <Section backgroundColor="secondary">
   <Container type="content">
    <Heading level={1} color="black" marginBottom={2}>
     {questionnaire.title}
    </Heading>
    {questionnaire.description && (
     <Paragraph color="black" marginBottom={6}>
      {questionnaire.description}
     </Paragraph>
    )}

    <Form onSubmit={handleSubmit}>
     {/* Step Title */}
     <Heading level={2} marginBottom={1} marginTop={3} color="black">
      {steps[step]?.title || "Untitled Step"}
     </Heading>
     {steps[step]?.description && (
      <Paragraph color="black" marginBottom={3}>
       {steps[step].description}
      </Paragraph>
     )}

     {/* Render Questions for the Current Step */}
     {steps[step]?.questions?.map((q: Question, index: number) => (
      <Form.Group key={index}>
       <Heading level={3} marginBottom={1} color="black">
        {q.question}
       </Heading>

       {q.type === "short" && (
        <Form.Input
         type="text"
         placeholder="Your answer"
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(q.question, e.target.value)
         }
        />
       )}
       {q.type === "long" && (
        <Form.Textarea
         placeholder="Your detailed response"
         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleInputChange(q.question, e.target.value)
         }
        />
       )}
       {q.type === "multiple" &&
        Array.isArray(q.options) &&
        q.options.map((option: string, i: number) => (
         <Form.Label key={i}>
          <Form.Input
           type="radio"
           name={q.question}
           value={option}
           onChange={(e) => handleInputChange(q.question, e.target.value)}
          />
          {option}
         </Form.Label>
        ))}
       {q.type === "checkbox" &&
        Array.isArray(q.options) &&
        q.options.map((option: string, i: number) => (
         <Form.Label key={i}>
          <Form.Input
           type="checkbox"
           name={q.question}
           value={option}
           onChange={(e) => {
            e.preventDefault();
            handleInputChange(q.question, option, "checkbox");
           }}
          />
          {option}
         </Form.Label>
        ))}
      </Form.Group>
     ))}

     {/* Navigation Buttons */}
     <Button.Group justifyContent="space-between" borderTop={1}>
      {step > 0 && (
       <Button.Step
        label="Previous"
        buttonType="button" // ✅ Prevent form submission
        clickHandler={() => setStep(step - 1)}
       />
      )}
      {step < steps.length - 1 && (
       <Button.Step
        label="Next"
        buttonType="button" // ✅ Prevent form submission
        clickHandler={() => setStep(step + 1)}
       />
      )}
      {step === steps.length - 1 && (
       <Button
        label="Submit"
        buttonType="submit" // ✅ Form submission only on last step
       />
      )}
     </Button.Group>
    </Form>
   </Container>
  </Section>
 );
}
