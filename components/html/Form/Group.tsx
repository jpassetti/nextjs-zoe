import React from "react";
import styles from "./form.module.scss";

const Group = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.form__group}>{children}</div>
);

export default Group;