import styles from "./introslide.module.scss";

const IntroSlide = ({ children }) => {
 return <div className={styles.intro_slide}>{children}</div>;
};
export default IntroSlide;
