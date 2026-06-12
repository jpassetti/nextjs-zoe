"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import OliveLeaf from "./OliveLeaf";
import OliveRoad from "./OliveRoad";
import OliveSpeechBubbles from "./OliveSpeechBubbles";

import styles from "./HomeV2.module.scss";

type Slide = {
  id: string;
  context: string;
  hook: string;
  bridge: string;
  pitch: string;
  ctaIntro: string;
  visual: "intro" | "tree" | "leaf" | "branch" | "road";
  color: string;
  shade: string;
};

type SvgPathNode = {
  id: string;
  d: string;
};

const SLIDE_ILLUSTRATION_COLOR = "#6E8F57";

const INTRO_BRANCH_FALLBACK_PATHS = [
  "M341.9,326.1c-24-1.5-34.9-25.1-31.5-49.1,3.5-24.1,16-45.3,34-61.5,9.8-9.1,20.6-15.9,33.5-19.3,10-2.5,19.7-1.9,29.4,2.2,15.9-17.9,36.9-29,59.6-35.1-41.8-7.3-81.6-10.3-122.8-9.6-16.6,2.5-31.1,8.1-45.8,15.6-12.1,6.2-21.8,14.8-31.6,24.7-22.5,62.9-73.8,110.4-140.5,121.9-2.1.4-4.1,0-5-1.3s-.7-3-.1-4.8c8.9-29.3,25.6-55.6,48-76.7,26.6-23.2,57.9-38.5,92.3-46.5,12.4-13.4,26.7-23.1,43.2-31.3-32.2,1.2-62.2,5.8-93.6,9.6-72.7,28.7-141.9,24.4-208.2-17.3C1,146.3,0,145.3,0,143.5s1.3-3.3,3.4-4.2c50.7-21,106.8-20.5,159.1-4.7,16.3,4.9,30.8,11.2,46.6,18,47.2-8,93.6-12.6,142.8-13.4-10.2-6-20.1-10.7-29.2-18.6-36.2-4.5-70.9-18.6-98.9-42.6-22.5-19.3-38.4-44.3-49.4-71.4-.7-1.6-.3-3.6.1-4.6S176.9,0,179.1,0c70,1.7,123.9,48.7,148.2,112.8,16.8,13.8,35.9,21.9,57.5,27,35.7,1.8,70.4,6.2,106,12.9l99.9,21.8,32.1,6.7c-10.2-9.3-19.4-17.6-28-27.7-62.2-23.1-110.2-73.3-127.4-137.3s-2.6-9.7-1.3-14.3c2.1-1.8,6.7-.2,9.6.9,64.4,23.9,108.4,78.8,126.1,144.4l20.7,20.6c11.4,9.4,24,18,38.7,21.1,24.3,5.2,48.1,6.8,72.6,7.8,3.8.2,5.9,4.9,5.6,7.6-.6,3.9-3.8,6.8-8.2,6.7-46.2-1.3-86.1-9.5-130.9-19.4l-93.1-20.8c-7.1-1.6-14,0-21,.3-27.4,1.7-52.6,13.2-71.5,32.6,11.1,11,13.6,29.4,10.8,44.3-5,26.7-20.8,50.6-43.2,66-12.1,8.3-26,13-40.3,12.2Z",
];

const INTRO_LINK_FALLBACK_PATHS = [
  "M1180.8,201.3c9.4-5.2,19.1-6.1,29.2-4,10.2,2.4,19,7.1,27.5,13.3,27,20.8,48.9,63.5,34.2,94.7-6.9,14.6-20.7,21.9-36.7,20.7-12.9-.9-23.9-6-34.5-13.8-29.4-24.1-51-72.2-27.1-104.8-13.5-11.6-29.2-17.5-46.1-20.2s-24.2-.8-36.6,1.9l-65.8,14.3c-35.3,6.3-70,8.7-105.7,7.2-4.6-.2-8.1-1.9-8.6-6.5s2.8-7.9,7.7-7.8c23.1.4,45.9,1.5,68.9-2.3,13.4-2.2,25.1-10.4,35-18.9l17.2-18.2c12.1-66,51.5-124.8,114.6-149.9,1.5-.6,3-.8,3.8-.3,1.3.8,1.9,2.3,1.7,4.2-6.1,68-49.6,126.5-112.7,152.9l-25.5,25.4,55-11,75.6-17.5,65-12c19.1-3.5,35.3-13.9,49.7-26.3,19.9-63.9,67.3-113.5,135.4-120.4s3.6,0,4.6.8,1.6,3,1,5c-19.4,63.9-70.5,109.2-135.8,122.3l-20.4,15.4c33.5-2.1,65.1-3,97.7-1.5l57.1,4.5,37.2-18.3c45.4-20,95.2-25.5,143.9-15.4,13.9,2.9,26.4,6.9,39,13s1.8,2.3,1.6,3.4-.7,2.2-2.3,3.2c-65.2,42.1-141.5,51.4-215.5,27.4s-6.9-2.2-11.1-1.5l-82.8-3.5c15.6,7.1,29.4,16,42.2,27.6,25.5,3.4,48.9,11.9,70.7,25.4,33.4,20.1,58.7,50.8,72.5,87.1s.9,7.4-1.4,8c-42.5-2.9-86.2-25.9-113.8-58.6s-25-34.6-33.3-54.6l-21.9-16.3c-16.3-10-33.9-15.6-53.3-17.6-47.5,2.3-94.1,8.9-139.7,20.5,16.6,4.9,29.9,11.5,42.5,22.7Z",
];

const INTRO_SNAP_FALLBACK_PATHS = [
  "M829.3,159.1c0,2.2-2.7,2.6-3.8,2.7s-4.1-.2-4.1-2v-35.5c0-2.2,3.5-3,4.8-2.6,2,.6,3.5,2.6,3.5,5.3l-.3,32.1Z",
  "M788.7,170.9c2.1,2.1.8,5-1,6.1s-4,.3-6-1.6l-16.8-16.2c-1.9-1.9-2.5-4.4-.6-6.4s4.4-1.8,6.6.4l17.8,17.7Z",
  "M869,175.4c-2.2,2.1-4.7,2.6-6.4,1.4-2.6-2-2-5,.2-7l17.2-16.8c1.8-1.8,4.1-2,5.9-.4s2.1,4-.1,6.2l-16.8,16.7Z",
];

const BRANCH_FALLBACK_PATHS = [
  "M46.6,38.3c-3.3,0-6.5-3-7.6-7.2-1.2-4.8.9-9.4,4.6-10.3,3.7-.9,7.7,2.2,8.9,7s-.9,9.4-4.6,10.3c-.4,0-.9.2-1.3.2Z",
];

const slides: Slide[] = [
  {
    id: "orgscan",
    context: "When executives need a clear measure of leadership effectiveness.",
    hook:
      "Engagement is slipping and no one can explain why. The executive team is working hard but something between intentions and employee experience keeps breaking down.",
    bridge:
      "The Vital Organizational Scan is a structured listening process that surfaces what employees are actually experiencing.",
    pitch:
      "It gathers candid anonymous feedback, then turns that signal into a clear executive action plan.",
    ctaIntro: "Start with a discovery conversation to decide whether this is the right intervention.",
    visual: "intro",
    color: SLIDE_ILLUSTRATION_COLOR,
    shade: "#DDEBCB",
  },
  {
    id: "jumpstart",
    context: "When leaders need to accelerate self-awareness in a new role.",
    hook:
      "At a certain level, feedback stops and support thins out. Leaders are expected to figure it out on their own while stakes rise.",
    bridge: "In role transitions, isolation amplifies blind spots right when clarity is most critical.",
    pitch:
      "Leadership JumpStart is a focused four-day cohort built around real leadership challenges and immediate application.",
    ctaIntro: "Book a short conversation to find the fastest path to traction.",
    visual: "tree",
    color: SLIDE_ILLUSTRATION_COLOR,
    shade: "#E8E2C8",
  },
  {
    id: "decathlon",
    context: "When executives need to strengthen middle management and align the organization.",
    hook:
      "The senior team is strong, but the bench is thin. Emerging managers are stretched without real support and culture starts to fragment.",
    bridge: "Without deliberate leader development, growth exposes capability gaps and culture begins to fracture.",
    pitch:
      "Leadership Decathlon is a year-long program that develops emerging leaders while keeping executives engaged and aligned to strategy.",
    ctaIntro: "Start with a conversation on how to strengthen your leadership bench.",
    visual: "leaf",
    color: SLIDE_ILLUSTRATION_COLOR,
    shade: "#CAE7E1",
  },
  {
    id: "coaching",
    context: "When leaders need objective accountability to achieve specific goals.",
    hook:
      "The most pivotal moments in a leader's career rarely come with a roadmap. The right thought partner changes everything.",
    bridge: "When pressure is high and visibility is higher, reflection without accountability is not enough.",
    pitch:
      "A confidential coaching process, from deep assessment and 360 feedback to a focused plan tied to organizational impact.",
    ctaIntro: "If this feels familiar, begin with a discovery conversation about your next move.",
    visual: "road",
    color: SLIDE_ILLUSTRATION_COLOR,
    shade: "#F0DACE",
  },
];

function loadSvgPathNodes(url: string) {
  return fetch(url)
    .then((response) => (response.ok ? response.text() : ""))
    .then((svgText) => {
      if (!svgText) {
        return [] as SvgPathNode[];
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");
      return Array.from(doc.querySelectorAll("path"))
        .map((pathEl) => ({
          id: pathEl.getAttribute("id") || "",
          d: pathEl.getAttribute("d") || "",
        }))
        .filter((node) => node.id && node.d);
    })
    .catch(() => [] as SvgPathNode[]);
}

export default function HomeV2() {
  const introSectionRef = useRef<HTMLElement | null>(null);
  const [introShapeNodes, setIntroShapeNodes] = useState<SvgPathNode[]>([]);
  const [oliveShapePaths, setOliveShapePaths] = useState<string[]>([]);
  const introSectionInView = useInView(introSectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      loadSvgPathNodes("/experiments/olive-branch-broken-link.svg"),
      loadSvgPathNodes("/brand/olive-branch-homev2.svg"),
    ]).then(([introNodes, branchPaths]) => {
      if (!isMounted) {
        return;
      }

      if (introNodes.length > 0) {
        setIntroShapeNodes(introNodes);
      }

      if (branchPaths.length > 0) {
        setOliveShapePaths(branchPaths.map((node) => node.d));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const introLeftBranchPath = introShapeNodes.find((node) => node.id === "left-branch")?.d || INTRO_BRANCH_FALLBACK_PATHS[0];
  const introRightBranchPath = introShapeNodes.find((node) => node.id === "right-branch")?.d || INTRO_LINK_FALLBACK_PATHS[0];
  const introBrokenLinkPath = introShapeNodes.find((node) => node.id === "broken-link")?.d || INTRO_SNAP_FALLBACK_PATHS.join(" ");
  const branchPaths = oliveShapePaths.length > 0 ? oliveShapePaths : BRANCH_FALLBACK_PATHS;

  const introSvgVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0.26,
      },
    },
  };

  const introLeftBranchVariants: Variants = {
    hidden: { opacity: 0, x: -34, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const introRightBranchVariants: Variants = {
    hidden: { opacity: 0, x: 34, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const introBrokenLinkVariants: Variants = {
    hidden: { opacity: 0, x: 0, y: 32 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut", delay: 0.5 },
    },
  };

  return (
    <section className={styles.homeV2}>
      <motion.section
        ref={introSectionRef}
        className={styles.intro}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className={styles.introCard}>
          <div className={styles.introBrand}>
            <Image
              src="/brand/olive-branch.svg"
              alt="Olive branch"
              width={89.3}
              height={113.1}
              className={styles.introBrandMark}
              priority
            />
            <Image
              src="/brand/wordmark-only.svg"
              alt="Transform with Irini"
              width={565.7}
              height={42.4}
              className={styles.introWordmark}
              priority
            />
          </div>
          <Paragraph className={styles.introCopy} marginTop={0} marginBottom={0}>
            Explore leadership interventions for teams navigating change, drift, and growth. Scroll down to begin with the first story.
          </Paragraph>
          <Paragraph className={styles.introHint} marginTop={0} marginBottom={0}>
            Scroll down
          </Paragraph>
        </div>
      </motion.section>

      <div className={styles.verticalSlides}>
        {slides.map((slide) => {
          const articleStyle = {
            ["--slide-accent" as string]: slide.color,
            ["--slide-shade" as string]: slide.shade,
          } as CSSProperties;

          return (
            <motion.article
              key={slide.id}
              className={`${styles.slide} ${slide.visual === "intro" ? styles.slideIntro : ""}`}
              style={articleStyle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div
                className={`${styles.slideVisual} ${
                  slide.visual === "intro"
                    ? styles.slideVisualIntro
                    : slide.visual === "tree"
                      ? styles.slideVisualTree
                      : slide.visual === "leaf"
                        ? styles.slideVisualLeaf
                      : slide.visual === "road"
                        ? styles.slideVisualRoad
                        : styles.slideVisualBranch
                }`}
                aria-hidden="true"
              >
                {slide.visual === "intro" ? (
                  <motion.svg
                    viewBox="0 0 1627.8 326.3"
                    className={`${styles.oliveSvg} ${styles.oliveSvgIntro}`}
                    variants={introSvgVariants}
                    initial="hidden"
                    animate={introSectionInView ? "visible" : "hidden"}
                  >
                    <motion.path
                      d={introLeftBranchPath}
                      fill={slide.color}
                      stroke="none"
                      variants={introLeftBranchVariants}
                    />
                    <motion.path
                      d={introRightBranchPath}
                      fill={slide.color}
                      stroke="none"
                      variants={introRightBranchVariants}
                    />
                    <motion.path
                      d={introBrokenLinkPath}
                      fill={slide.color}
                      stroke="none"
                      variants={introBrokenLinkVariants}
                    />
                  </motion.svg>
                ) : slide.visual === "tree" ? (
                  <OliveSpeechBubbles color={SLIDE_ILLUSTRATION_COLOR} className={styles.treeSvg} />
                ) : slide.visual === "leaf" ? (
                  <OliveLeaf color={SLIDE_ILLUSTRATION_COLOR} className={styles.leafSvg} />
                ) : slide.visual === "road" ? (
                  <OliveRoad color={SLIDE_ILLUSTRATION_COLOR} className={styles.roadSvg} />
                ) : (
                  <motion.svg viewBox="0 0 89.3 113.1" className={styles.oliveSvg}>
                    <motion.g initial={false} animate={{ x: 0, y: 0, scale: 1 }}>
                      {branchPaths.map((d, index) => (
                        <motion.path
                          key={`brand-olive-path-${slide.id}-${index}`}
                          d={d}
                          fill={slide.color}
                          stroke="none"
                          animate={{ opacity: 1, fill: slide.color }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      ))}
                    </motion.g>
                  </motion.svg>
                )}
              </div>

              <div className={styles.slideBody}>
                <Heading level={1} marginTop={0} marginBottom={0} textAlign="center" className={styles.title}>
                  {slide.hook}
                </Heading>

                <div className={styles.narrative}>
                  <Paragraph className={styles.bridge} marginTop={0} marginBottom={0}>
                    {slide.bridge}
                  </Paragraph>
                  <Paragraph className={styles.pitch} marginTop={0} marginBottom={0}>
                    {slide.pitch}
                  </Paragraph>
                </div>

                <Paragraph className={styles.ctaIntro} marginTop={0} marginBottom={0}>
                  {slide.ctaIntro}
                </Paragraph>

                <div className={styles.ctaRow}>
                  <Button
                    _type="button"
                    label="Schedule a discovery conversation"
                    linkType="internal"
                    internalPage={{ slug: { current: "consultation" } }}
                    variant="primary"
                    size="medium"
                  />
                  <Button
                    _type="button"
                    label="About Irini"
                    linkType="internal"
                    internalPage={{ slug: { current: "about" } }}
                    variant="inverted"
                    size="medium"
                  />
                </div>

                <Paragraph className={styles.grinnell} marginTop={0} marginBottom={0}>
                  Irini is certified in the Grinnell Leadership System.
                </Paragraph>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
