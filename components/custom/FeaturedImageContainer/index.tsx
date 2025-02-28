import { ReactNode } from "react";
import styles from "./FeaturedImageContainer.module.scss";

interface FeaturedImageContainerProps {
 children: ReactNode;
}

const FeaturedImageContainer: React.FC<FeaturedImageContainerProps> = ({
 children,
}) => {
 return <div className={styles.featured_image_container}>{children}</div>;
};

export default FeaturedImageContainer;
