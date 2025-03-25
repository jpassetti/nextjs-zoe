"use client";

import styles from "./loading.module.scss";

export default function Loading() {
 return (
  <div className={styles.loadingWrapper}>
   <div className={styles.spinner}></div>
  </div>
 );
}
