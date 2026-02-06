import React, { type ReactNode } from "react";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

import styles from "./styles.module.scss";

type ServiceMatchCardProps = {
  title: string;
  summary: string;
  children?: ReactNode;
};

export default function ServiceMatchCard({ title, summary, children }: ServiceMatchCardProps) {
  return (
    <div className={styles.matchCardWrap}>
      <div className={styles.matchCard}>
        <Heading level={2} marginBottom={1} lineHeight="more" textAlign="center">
          {title}
        </Heading>
        <Paragraph marginBottom={4} textAlign="center">
          {summary}
        </Paragraph>
        {children}
      </div>
    </div>
  );
}
