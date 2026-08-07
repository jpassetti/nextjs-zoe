import styles from "./number.module.scss";

type NumberProps = {
  children: React.ReactNode;
  className?: string;
};

const Number = ({ children, className }: NumberProps) => {
  return <span className={`${styles.number} ${className || ""}`.trim()}>{children}</span>;
};

export default Number;
