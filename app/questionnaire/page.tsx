"use client";

import { useQuestionnaire } from "@/lib/hooks/useQuestionnaire";
import QuestionnaireForm from "@/components/custom/QuestionnaireForm";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

export default function QuestionnaireLandingPage() {
 const {
  step,
  setStep,
  responses,
  handleInputChange,
  questionnaire,
  loading,
  error,
  isStepValid,
 } = useQuestionnaire("consultation-questionnaire");

 // ✅ Define handleSubmit function
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Submitting responses:", responses);

  try {
   const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     questionnaireId: questionnaire?._id,
     responses,
    }),
   });

   if (!res.ok) throw new Error("Submission failed.");

   const result = await res.json();
   alert("Submitted successfully! Response ID: " + result.responseId);
  } catch (error) {
   console.error("Error submitting form:", error);
   alert("Submission failed. Please try again.");
  }
 };

 if (loading) return <p>Loading...</p>;
 if (error) return <p style={{ color: "red" }}>{error}</p>;
 if (!questionnaire) return <p>No questionnaire found.</p>;

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
    <QuestionnaireForm
     step={step}
     setStep={setStep}
     responses={responses}
     handleInputChange={handleInputChange}
     questionnaire={questionnaire}
     isStepValid={isStepValid}
     handleSubmit={handleSubmit} // ✅ Pass handleSubmit
    />
   </Container>
  </Section>
 );
}
