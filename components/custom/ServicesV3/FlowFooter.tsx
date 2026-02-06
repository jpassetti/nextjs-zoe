import React from "react";

import Button from "@/components/html/Button";

import styles from "./styles.module.scss";

type FlowFooterProps = {
  label?: string;
};

export default function FlowFooter({ label = "Retake the quiz" }: FlowFooterProps) {
  return (
    <div className={styles.flowFooter}>
      <Button
        _type="button"
        label={label}
        linkType="internal"
        internalPage={{ slug: { current: "services-v3" } }}
        variant="secondary"
        size="medium"
        actionType="button"
      />
    </div>
  );
}
