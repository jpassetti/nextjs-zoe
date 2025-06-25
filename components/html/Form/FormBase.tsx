import React, { forwardRef } from "react";
import classnames from "classnames/bind";
import styles from "./form.module.scss";

const cx = classnames.bind(styles);

const FormBase = forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(({ children, ...props }, ref) => {
  return (
    <form ref={ref} {...props} className={cx("form__base")}>
      {children}
    </form>
  );
});

FormBase.displayName = "FormBase";

export default FormBase;