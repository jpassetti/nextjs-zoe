import classNames from 'classnames/bind';

import styles from "./section.module.scss";

const cx = classNames.bind(styles);

interface SectionProps {
   children: React.ReactNode;
   backgroundColor?: string;
   textAlign?: "left" | "center";
   paddingTop?: "none" | "small" | "medium" | "large";
   paddingBottom?: "none" | "small" | "medium" | "large";
   marginTop?: "none" | "small" | "medium" | "large";
   marginBottom?: "none" | "small" | "medium" | "large";
}

const Section: React.FC<SectionProps> = ({
   children,
   backgroundColor = "white",
   textAlign,
   paddingTop = "small",
   paddingBottom = "small",
   marginTop = "none",
   marginBottom = "none",
}) => {


   const sectionClasses = cx({
      section: true,
      [`background-color--${backgroundColor}`]: backgroundColor,
      [`text-align--${textAlign}`]: textAlign,
      [`padding-top--${paddingTop}`]: paddingTop,
      [`padding-bottom--${paddingBottom}`]: paddingBottom,
      [`margin-top--${marginTop}`]: marginTop,
      [`margin-bottom--${marginBottom}`]: marginBottom,
   });

   return (
      <section
         className={sectionClasses}
      >
         {children}
      </section>
   );
};

export default Section;
