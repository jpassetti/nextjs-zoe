import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Image from "next/image";
import styles from "./showcase.module.scss";

const Showcase = () => {
 return (
  <div className={styles.showcase}>
   <Image
    src="/action/zoe-54.jpg"
    alt="Stock Image"
    width="689"
    height="312"
    className={styles.showcase_image}
   />
   <div className={styles.showcase_content}>
    <Heading level={1} color="white" marginBottom={2}>
     Empowering Leaders, Inspiring Change
    </Heading>
    <Button.Group justifyContent="center">
     <Button href="/transformation" label="My Transformation" type="primary" />
     <Button href="/services" label="Services" type="inverted-white" />
    </Button.Group>
   </div>
  </div>
 );
};
export default Showcase;
