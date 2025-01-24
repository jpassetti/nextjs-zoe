import Button from "@/components/html/Button";
import Image from "next/image";
import styles from "./showcase.module.scss";

const Showcase = () => {
 return (
  <div className={styles.showcase}>
   <Image
    src="/stock/01-stock.jpg"
    alt="Stock Image"
    width="689"
    height="312"
    className={styles.showcase_image}
   />
   <div className={styles.showcase_content}>
    <h1>Empowering Leaders, Inspiring Change</h1>
    <Button.Group justifyContent="center">
     <Button href="/about" label="About me" />
     <Button href="/services" label="Services" />
    </Button.Group>
   </div>
  </div>
 );
};
export default Showcase;
