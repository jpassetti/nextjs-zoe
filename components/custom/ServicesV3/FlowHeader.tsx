import React from "react";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

import styles from "./styles.module.scss";

type FlowHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function FlowHeader({ title, subtitle }: FlowHeaderProps) {
  return (
    <div className={styles.flowHeader}>
      <Heading level={1} marginBottom={1} textAlign="center">
        {title}
      </Heading>
      {subtitle ? (
        <Paragraph marginBottom={0} textAlign="center">
          {subtitle}
        </Paragraph>
      ) : null}
    </div>
  );
}
