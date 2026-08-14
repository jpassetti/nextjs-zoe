"use client";

import { type ReactNode, useEffect } from "react";
import { motion, stagger, useAnimate, useInView, useReducedMotion } from "framer-motion";
import styles from "./homepage-v10.module.scss";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

function useStaggeredReveal() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !scope.current) return;

    animate(
      Array.from(scope.current.children),
      { opacity: 1, y: 0 },
      reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.7,
            delay: stagger(0.12),
            ease: [0.22, 1, 0.36, 1],
          },
    );
  }, [animate, isInView, reduceMotion, scope]);

  return scope;
}

export function RevealSection({ children, className = "", id }: RevealProps) {
  const scope = useStaggeredReveal();

  return (
    <motion.section ref={scope} className={`${className} ${styles.revealRoot}`} id={id}>
      {children}
    </motion.section>
  );
}

export function RevealArticle({ children, className = "", id }: RevealProps) {
  const scope = useStaggeredReveal();

  return (
    <motion.article ref={scope} className={`${className} ${styles.revealRoot}`} id={id}>
      {children}
    </motion.article>
  );
}
