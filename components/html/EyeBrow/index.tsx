import styles from "./eyebrow.module.scss";

type EyeBrowProps = {
  children: React.ReactNode;
  className?: string;
};

const EyeBrow = ({ children, className }: EyeBrowProps) => {
  return <span className={`${styles.eyebrow} ${className || ""}`.trim()}>{children}</span>;
};

export default EyeBrow;
