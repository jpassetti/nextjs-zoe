"use client";

import React, { useState } from "react";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Section from "@/components/layout/Section";
import type { QuestionnaireBlock } from "@/lib/interfaces";
import QuestionnaireForm from "@/components/custom/QuestionnaireForm";


// todo: Splitting logic between QuestionnaireBlock and QuestionnaireForm

const QuestionnaireBlock: React.FC<QuestionnaireBlock> = ({ questionnaire }) => {
  console.log("QuestionnaireBlock rendered with questionnaire:", questionnaire);
  const [step, setStep] = useState<number>(0); // Explicitly type state as number
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});

  return (
    <Section paddingTop="large" paddingBottom="large" backgroundColor="secondary-light">
      <Container>
        <Row justifyContent="center" alignItems="center">
          <Col xs={12} sm={10} md={8}>
            <QuestionnaireForm
              step={step}
              setStep={setStep}
              slug={questionnaire.slug}
              title={questionnaire.title}
              description={questionnaire.description}
              questionnaire={questionnaire}
              responses={responses}
              setResponses={setResponses}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default QuestionnaireBlock;
