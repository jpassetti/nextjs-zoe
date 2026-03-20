import Image from "next/image";
import styles from "./wordmark.module.scss";

type WordmarkProps = {
    variant?: "default" | "whiteText";
};

const Wordmark = ({ variant = "default" }: WordmarkProps) => {
 const src =
    variant === "whiteText"
     ? "/brand/complete-wordmark-white-text.svg"
     : "/brand/complete-wordmark-2.svg";

 return (
  <Image
     src={src}
   alt="Transform with Irini"
   width={664}
   height={113}
   className={styles.brand_wordmark}
  />
 );
};
export default Wordmark;
