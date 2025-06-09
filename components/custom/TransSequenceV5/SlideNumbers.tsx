import classnames from "classnames/bind";
import styles from "./transsequence.module.scss";

const cx = classnames.bind(styles);

interface SlideNumbersProps {
    totalSlides: number; // Total number of slides
    activeSlide: number; // Index of the currently active slide
}

const SlideNumbers: React.FC<SlideNumbersProps> = ({ totalSlides, activeSlide }) => {
    return <div className={styles.sequence__numbers}>
        <div className={styles.sequence__numbers__container}>
        <ul>
        {Array.from({ length: totalSlides || 3 }, (_, i) => {
            const sequenceNumberClasses = cx({
                sequence__number: true,
                active: activeSlide === i,
            });
            return <li key={i} className={sequenceNumberClasses} onClick={() => {
                // find slide--{$i} and slide to it
                const targetSlide = document.getElementById(`slide-${i}`);
                if (targetSlide) {
                    targetSlide.scrollIntoView({ behavior: "smooth" });
                }
            }
            }>
                {i + 1}
            </li>;
        })}
    </ul></div></div>
}
export default SlideNumbers;