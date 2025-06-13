import React from "react";
import styles from "./form.module.scss";

const CheckboxGroup = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.form__checkbox_group}>{children}</div>
);

export default CheckboxGroup;