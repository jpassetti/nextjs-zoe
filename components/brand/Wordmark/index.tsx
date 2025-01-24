import Image from "next/image";
import styles from "./wordmark.module.scss";
const Wordmark = () => {
 return (
  <Image
   src="/brand/complete-wordmark.svg"
   alt="Transform with Irini"
   width={664}
   height={113}
   className={styles.brand_wordmark}
  />
 );
};
export default Wordmark;
