"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Button from "@/components/html/Button";

import styles from "./styles.module.scss";

type RestartQuestionnaireProps = {
  heading?: string;
  copy?: string;
  buttonLabel?: string;
};

export default function RestartQuestionnaire({
  heading = "Want to double-check your match?",
  copy = "Retake the short questionnaire and we’ll recommend the best service based on your answers.",
  buttonLabel = "Retake the quiz",
}: RestartQuestionnaireProps) {
  const router = useRouter();

  return (
    <div className={styles.restartWrap}>
      <div className={styles.card}>
        <div className={styles.result}>
          <Heading level={3} marginBottom={1} textAlign="center">
            {heading}
          </Heading>
          <Paragraph marginBottom={2} textAlign="center">
            {copy}
          </Paragraph>
          <Button.Group justifyContent="center">
            <Button.Step
              clickHandler={() => router.push("/services-v3")}
              label={buttonLabel}
              variant="primary"
            />
          </Button.Group>
        </div>
      </div>
    </div>
  );
}
