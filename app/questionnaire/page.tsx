"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestionnaire } from "@/lib/hooks/useQuestionnaire";
import QuestionnaireForm from "@/components/custom/QuestionnaireForm";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Loading from "@/components/custom/Loading"; // Adjust the import path as needed

export default function QuestionnaireLandingPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    step,
    setStep,
    responses,
    handleInputChange,
    questionnaire,
    loading,
    error,
    validateStep,
    validationErrors,
  } = useQuestionnaire("consultation-questionnaire");

  // ✅ Define handleSubmit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionnaireId: questionnaire?._id,
          responses,
          questionTypes: questionnaire?.steps
            .flatMap((step) => step.questions.map((q) => ({ [q.question]: q.type })))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        }),
      });

      if (!res.ok) throw new Error("Submission failed.");

      const result = await res.json();
      const responseId = result.responseId;

      // ✅ Redirect to success page with the response ID
      router.push(`/questionnaire/success?id=${responseId}`);
    } catch (error) {
      setSubmitting(false); // Only reset if there's an error
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  if (submitting) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!questionnaire) return <p>No questionnaire found.</p>;

  return (
    <Section backgroundColor="secondary" paddingTop="large" paddingBottom="large">
      <Container type="content">
        <Heading level={1} color="primary" marginBottom={2}>
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
          validateStep={validateStep}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit} // ✅ Pass handleSubmit
        />
      </Container>
    </Section>
  );
}
