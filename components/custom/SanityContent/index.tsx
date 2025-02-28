import styles from "./SanityContent.module.scss";

const SanityContent = ({ children }: { children: React.ReactNode }) => {
 return <div className={styles.sanity_content}>{children}</div>;
};
export default SanityContent;
