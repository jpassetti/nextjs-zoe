import React from "react";
import classnames from "classnames/bind";
import Link from "next/link";
import styles from "./nav.module.scss";

// Bind classNames to styles
const cx = classnames.bind(styles);

// Define the types for the component props
interface NavProps {
 flexDirection?: "row" | "column"; // Allow for "row" or "column" as valid values for flexDirection
}

const Nav: React.FC<NavProps> = ({ flexDirection = "row" }) => {
 // Generate dynamic class names based on flexDirection
 const navListClasses = cx({
  nav__list: true,
  [`flex-direction--${flexDirection}`]: flexDirection,
 });

 return (
  <nav className={styles.nav}>
   <ul className={navListClasses}>
    <li>
     <Link href="/">Home</Link>
    </li>
    <li>
     <Link href="/about">About Me</Link>
    </li>
    <li>
     <Link href="/services">Services</Link>
    </li>
    <li>
     <Link href="/resources">Resources</Link>
    </li>
    <li>
     <Link href="/contact">Contact</Link>
    </li>
   </ul>
  </nav>
 );
};

export default Nav;
