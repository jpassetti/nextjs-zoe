import React from "react";
import styles from "./form.module.scss";

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label className={styles.form__label} htmlFor={htmlFor}>
    {children}
  </label>
);

export default Label;