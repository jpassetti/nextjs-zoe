"use client";
import { useState, Fragment } from "react";
import { useViewport } from "@/lib/context/ViewportContext"; // Adjust path if needed
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence from Framer Motion

import Button from "@/components/html/Button";
import Link from "next/link";
import MobileNav from "@/components/regions/MobileNav";
import Nav from "@/components/regions/Nav";
import Row from "@/components/layout/Row";
import Wordmark from "@/components/brand/Wordmark";

import styles from "./header.module.scss";

type HeaderProps = {
  variant?: "default" | "overlay";
};

const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  // Destructure isDesktop from the viewport context
  const { isLargeDesktop } = useViewport();

  // State for controlling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isOverlay = variant === "overlay";

  return (
    <Fragment>
      <header className={`${styles.header} ${isOverlay ? styles.header_overlay : ""}`}>
        <Link href="/">
          <Wordmark variant={isOverlay ? "whiteText" : "default"} />
        </Link>

        {isLargeDesktop && (
          <Row alignItems="center" gap={3} className={styles.header_desktop_nav}>
            <Nav tone={isOverlay ? "light" : "default"} />

            <Button
              _type="button"
              label="Schedule a consultation"
              variant="accent"
              size="medium"
              linkType="internal"
              actionType="button"
              internalPage={
                {
                  slug: {
                    current: "consultation",
                  },
                }
              }
            />
          </Row>
        )}

        {!isLargeDesktop && (
          <Button.UI
            iconProps={{ name: "menu" }}
            backgroundColor="accent"
            clickHandler={() => {
              setIsMenuOpen(true);
            }}
          />
        )}


      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav
            closeHandler={() => {
              setIsMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Header;
