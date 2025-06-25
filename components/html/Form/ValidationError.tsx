import React from "react";
import styles from "./form.module.scss";

const ValidationError = ({ message }: { message?: string }) =>
  message ? <p className={styles.form__validationError}>{message}</p> : null;

export default ValidationError;