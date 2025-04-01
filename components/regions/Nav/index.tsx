import React from "react";
import classnames from "classnames/bind";
import Link from "next/link";
import styles from "./nav.module.scss";

// Bind classNames to styles
const cx = classnames.bind(styles);

// Define the types for the component props
interface NavProps {
 closeHandler?: () => void; // Make closeHandler optional
 flexDirection?: "row" | "column"; // Allow for "row" or "column" as valid values for flexDirection
 size?: "small" | "medium" | "large"; // Allow for "small", "medium", or "large" as valid values for size
}

const navLinks = [
 { id: 1, url: "/", text: "Home" },
 { id: 2, url: "/about-me", text: "About Me" },
 { id: 3, url: "/services", text: "Services" },
 //{ id: 4, url: "/resources", text: "Resources" },
 { id: 5, url: "/contact", text: "Contact" },
];

const Nav: React.FC<NavProps> = ({
 closeHandler,
 flexDirection = "row",
 size,
}) => {
 // Generate dynamic class names based on flexDirection
 const navListClasses = cx({
  nav__list: true,
  [`flex-direction--${flexDirection}`]: flexDirection,
  [`size--${size}`]: size,
 });

 // If closeHandler exists, pass it to the links, otherwise, just render links normally
 const handleClick = () => {
  if (closeHandler) {
   closeHandler();
  }
 };

 return (
  <nav className={styles.nav}>
   <ul className={navListClasses}>
    {navLinks.map((link) => (
     <li key={link.id}>
      <Link href={link.url} onClick={handleClick}>
       {link.text}
      </Link>
     </li>
    ))}
   </ul>
  </nav>
 );
};

export default Nav;
