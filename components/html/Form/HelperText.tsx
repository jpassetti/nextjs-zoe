import React from "react";
import styles from "./form.module.scss";

const HelperText = ({ children }: { children: React.ReactNode }) => (
  <p className={styles.form__helperText}>{children}</p>
);

export default HelperText;