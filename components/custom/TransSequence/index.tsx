"use client";

import { useState, Fragment } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/html/Button";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import styles from "./transsequence.module.scss";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import OliveBranch from "@/components/brand/OliveBranch";

const slides = [
 {
  title: "My Story",
  subheadline: null,
  content:
   "I started my career as an entrepreneur immersed in the technical and creative aspects of startup culture and scaling challenges. Today, I leverage my track record of hands-on and strategic experience to provide organizations with mentorship and consulting, empowering sustainable and long-term success for companies navigating growth.",
  cta: null,
 },
 {
  title:
   "From Marketer and Tech Entrepreneur to Software and Community Builder",
  subheadline:
   "Discovering the Intersection between Creative Vision and Technical Execution",
  content:
   "As a marketer working in startup environments, I witnessed misalignment in strategic direction across teams. The disconnect between creative vision and technical execution hindered the success of new product launches. Driven by curiosity about this intersection, I immersed myself in the engineering community through software boot camps, developing empathy for engineers building complex software and empowering other women to learn, build, connect, and thrive in a male-dominated field.",
  cta: null,
 },
 {
  title: "Co-founding, Leading, and Selling a Women-Owned Software Agency",
  subheadline: "Navigating Growth, Culture, and Hard Decisions ",
  content:
   "Later, with a my combined  understanding of marketing, tech teams, and community, I co-founded and scaled a software agency, Upstate Interactive. Amid managing the complexities of bootstrapping, business partnerships, and building an inclusive culture, Upstate Interactive went from four partners to more than 25 team members in 6 years. This steady growth caught the eye of a VC-backed cryptocurrency startup, Foundry.\n The decision to be acquired was no easy feat, but it marked a milestone of strategic pivots and resilient leadership through uncertainty. All team members had the opportunity and guidance to join Foundry, a company seeing a 43% increase in headcount — and more than 90% of the team chose to transition to the fast-paced, rapidly growing organization. \n Simultaneously helping the Upstate Interactive team get settled while leading a new product development department was a lot to juggle, but showed me the importance of having courage and taking responsibility.",
  cta: null,
 },
 {
  title:
   "Strengthening Leadership and Supporting the Next Generation of Innovators",
  subheadline:
   "Sharing Lessons and Inspiring Harmonious Connections within Human Systems",
  content:
   "Fast forward to today. After experiencing a few years of team restructuring and rapid scaling in a volatile market, I developed a deep interest in guiding teams through stable growth, leadership development, and organizational change. I’ve learned that investing in leadership and optimizing human systems enhances performance and mitigates risk amid transitions like growth, acquisitions, team restructuring, and changes in strategic direction.\n This inspired me to start my own independent consulting company, Transform with Irini, where I uphold the values of decentralization, trust, and data privacy shaped by my career in tech and crypto. I also work alongside Grinnell Leadership, a behavioral sciences company that specializes in organizational development. We help leaders of growth-oriented companies ease and speed positive change.",
 },
 {
  title: "Let's connect",
  subheadline: "Schedule a consultation to discuss your transformation.",
  content: null,
  cta: {
   label: "Schedule a Consultation",
   href: "/contact",
  },
 },
];

const TransSequence = () => {
 const [currentSlide, setCurrentSlide] = useState(0);
 const animationVariants = [
  {
   scale: 5,
   rotate: 30,
   x: -100,
   y: 0,
   opacity: 0.15,
   transition: { duration: 1 },
  },
  {
   scale: 7,
   rotate: 40,
   x: 400,
   y: 100,
   opacity: 0.15,
   transition: { duration: 1 },
  },
  {
   scale: 7,
   rotate: 60,
   x: 100,
   y: 150,
   opacity: 0.15,
   transition: { duration: 1 },
  },
  {
   scale: 7,
   rotate: -30,
   x: -500,
   y: 150,
   opacity: 0.15,
   transition: { duration: 1 },
  },
  {
   scale: 5,
   rotate: 25,
   x: -100,
   y: 0,
   opacity: 0.15,
   transition: { duration: 1 },
  },
 ];

 return (
  <div className={styles.sequence__container}>
   <div className={styles.sequence__background}>
    <motion.div
     initial={animationVariants[0]}
     animate={animationVariants[currentSlide]}
    >
     <OliveBranch fill="primary" />
    </motion.div>
   </div>
   <AnimatePresence>
    <Container
     width="full"
     height="full"
     alignItems="center"
     justifyContent="center"
    >
     <Row alignItems="stretch" justifyContent="center" height="full">
      <Col sm={2} textAlign="right" paddingTop={4}>
       {currentSlide > 0 && (
        <Fragment>
         <Button.Group justifyContent="flex-end" marginBottom={2}>
          <Button.UI
           type="previous"
           clickHandler={() => {
            setCurrentSlide(currentSlide - 1);
           }}
          />
         </Button.Group>
         <Heading level={4}>{slides[currentSlide - 1].title}</Heading>
        </Fragment>
       )}
      </Col>
      <Col sm={1} verticalLine={true}></Col>
      <Col sm={6} paddingTop={4}>
       {slides[currentSlide].title && (
        <motion.div
         initial={{ opacity: 0, x: -30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.5 }}
         exit={{ opacity: 0, x: 30, transition: { duration: 0.5 } }}
         key={`title-${currentSlide}`}
        >
         <Heading level={1} marginBottom={2} color="primary">
          {slides[currentSlide].title}
         </Heading>
        </motion.div>
       )}
       {slides[currentSlide].subheadline && (
        <motion.div
         initial={{ opacity: 0, x: -30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.6 }}
         exit={{ opacity: 0, x: 30, transition: { duration: 0.5 } }}
         key={`subheadline-${currentSlide}`}
        >
         <Heading level={3} marginBottom={2}>
          {slides[currentSlide].subheadline}
         </Heading>
        </motion.div>
       )}
       {slides[currentSlide].content && (
        <motion.div
         initial={{ opacity: 0, x: -30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.7 }}
         exit={{ opacity: 0, x: 30, transition: { duration: 0.5 } }}
         key={`content-${currentSlide}`}
        >
         <Paragraph>{slides[currentSlide].content}</Paragraph>
        </motion.div>
       )}
       {slides[currentSlide].cta && (
        <motion.div
         initial={{ opacity: 0, x: -30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.8 }}
         exit={{ opacity: 0, x: 30, transition: { duration: 0.5 } }}
         key={`cta-${currentSlide}`}
        >
         <Button
          type="primary"
          label={slides[currentSlide].cta.label}
          href={slides[currentSlide].cta.href}
         />
        </motion.div>
       )}
      </Col>
      <Col sm={1} verticalLine={true}></Col>
      <Col sm={2} paddingTop={4}>
       {currentSlide < slides.length - 1 && (
        <Fragment>
         <Button.Group marginBottom={2}>
          <Button.UI
           type="next"
           clickHandler={() => {
            setCurrentSlide(currentSlide + 1);
           }}
          />
         </Button.Group>
         <Heading level={4}>{slides[currentSlide + 1].title}</Heading>
        </Fragment>
       )}
      </Col>
     </Row>
    </Container>
   </AnimatePresence>
  </div>
 );
};
export default TransSequence;
