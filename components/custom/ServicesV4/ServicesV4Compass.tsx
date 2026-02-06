"use client";

import { useMemo, useState } from "react";
import { useReducedMotion, motion, AnimatePresence, type Variants } from "framer-motion";

import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Icon from "@/components/html/Icon";
import Paragraph from "@/components/html/Paragraph";
import CompassMark from "@/components/brand/CompassMark";
import styles from "./servicesV4Compass.module.scss";

type ServiceSlug =
	| "leadership-coaching"
	| "leadership-jumpstart"
	| "leadership-decathlon"
	| "vital-orgscan";

type CompassOutcome = "clarity" | "momentum" | "alignment" | "diagnosis";

type CompassMode = "solo" | "team";

type Direction = "N" | "S" | "E" | "W";

type StepId = "intro" | "who" | "first" | "approach" | "result";

type AnswerKey = "start" | "solo" | "team" | CompassOutcome | "diagnose" | "act";

type Match = {
	slug: ServiceSlug;
	title: string;
	oneLiner: string;
	why: string[];
	bestFor: string[];
};

const ALL_OUTCOMES: { id: CompassOutcome; label: string; hint: string }[] = [
	{ id: "clarity", label: "Clarity", hint: "Get unstuck; see the path" },
	{ id: "momentum", label: "Momentum", hint: "Start fast; build traction" },
	{ id: "alignment", label: "Alignment", hint: "Build shared direction" },
	{ id: "diagnosis", label: "Diagnosis", hint: "Find root causes & patterns" },
];

const ALL_MODES: { id: CompassMode; label: string; hint: string }[] = [
	{ id: "solo", label: "Individual", hint: "1:1 leader support" },
	{ id: "team", label: "Team/Org", hint: "Groups, teams, org systems" },
];

const STEP_ORDER: Record<Exclude<StepId, "result">, StepId> = {
	intro: "who",
	who: "first",
	first: "approach",
	approach: "result",
};

function reverseDirection(direction: Direction): Direction {
	switch (direction) {
		case "N":
			return "S";
		case "S":
			return "N";
		case "E":
			return "W";
		case "W":
			return "E";
	}
}

function directionDelta(direction: Direction): { x: number; y: number } {
	const amount = 36;
	switch (direction) {
		case "N":
			return { x: 0, y: -amount };
		case "S":
			return { x: 0, y: amount };
		case "E":
			return { x: amount, y: 0 };
		case "W":
			return { x: -amount, y: 0 };
	}
}

function computeMatch(mode: CompassMode, outcomes: CompassOutcome[]): Match {
	const wantsDiagnosis = outcomes.includes("diagnosis");
	const wantsAlignment = outcomes.includes("alignment");
	const wantsMomentum = outcomes.includes("momentum");
	const wantsClarity = outcomes.includes("clarity");

	if (wantsDiagnosis) {
		return {
			slug: "vital-orgscan",
			title: "Vital OrgScan",
			oneLiner: "A fast, structured diagnosis of what’s really happening—and what to do next.",
			why: [
				"You want to see patterns and root causes (not just symptoms).",
				"You value data-backed clarity before changing strategy or structure.",
			],
			bestFor: ["Teams or orgs feeling ‘off’", "Change or growth moments", "Recurring friction"],
		};
	}

	if (mode === "solo") {
		return {
			slug: "leadership-coaching",
			title: "Leadership Coaching",
			oneLiner: "High-trust 1:1 coaching to deepen leadership capacity and decision-making.",
			why: [
				wantsClarity
					? "You want clearer decisions and steadier leadership presence."
					: "You want stronger leadership habits and better conversations.",
				"You prefer a tailored, human-centered pace."
			],
			bestFor: ["New or stretched leaders", "Complex decisions", "Confidence & communication"],
		};
	}

	if (wantsMomentum && !wantsAlignment) {
		return {
			slug: "leadership-jumpstart",
			title: "Leadership Jumpstart",
			oneLiner: "A short, focused engagement to create momentum and a clear next move.",
			why: [
				"You want progress quickly, with a crisp plan.",
				"You’re ready to act—just need the right sequence."
			],
			bestFor: ["Time-boxed challenges", "New initiatives", "Fast clarity + action"],
		};
	}

	if (wantsAlignment) {
		return {
			slug: "leadership-decathlon",
			title: "Leadership Decathlon",
			oneLiner: "A multi-skill leadership build for teams: alignment, execution, and resilience.",
			why: [
				"You need shared language and practices across a team.",
				"You want alignment that holds under pressure."
			],
			bestFor: ["Leadership teams", "Culture + execution", "Sustained skill building"],
		};
	}

	// Default: safe, team-oriented momentum+clarity blend
	return {
		slug: "leadership-jumpstart",
		title: "Leadership Jumpstart",
		oneLiner: "A short, focused engagement to create momentum and a clear next move.",
		why: [
			"You want a pragmatic plan and real movement.",
			"You’re looking for a strong starting point."
		],
		bestFor: ["Ambiguous starting points", "Quick traction", "Next-step planning"],
	};
}

export default function ServicesV4Compass() {
	const prefersReducedMotion = useReducedMotion();
	const reducedMotion = Boolean(prefersReducedMotion);

	const [showIntroContent, setShowIntroContent] = useState<boolean>(reducedMotion);

	const [stepId, setStepId] = useState<StepId>("intro");
	const [mode, setMode] = useState<CompassMode>("solo");
	const [primaryOutcome, setPrimaryOutcome] = useState<CompassOutcome>("clarity");
	const [diagnoseFirst, setDiagnoseFirst] = useState<boolean>(false);

	const [navDirection, setNavDirection] = useState<Direction>("E");
	const [history, setHistory] = useState<Array<{ stepId: StepId; direction: Direction }>>(
		[]
	);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const mapEnabled = stepId !== "intro";

	const outcomes = useMemo<CompassOutcome[]>(() => {
		const base: CompassOutcome[] = [primaryOutcome];
		if (diagnoseFirst && !base.includes("diagnosis")) base.push("diagnosis");
		return base;
	}, [primaryOutcome, diagnoseFirst]);

	const match = useMemo(() => computeMatch(mode, outcomes), [mode, outcomes]);

	const cardVariants: Variants = {
		enter: (direction: Direction) => {
			const { x, y } = directionDelta(direction);
			return reducedMotion
				? { opacity: 0 }
				: { opacity: 0, x: x * -1, y: y * -1, filter: "blur(2px)" };
		},
		center: reducedMotion
			? { opacity: 1 }
			: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
		exit: (direction: Direction) => {
			const { x, y } = directionDelta(direction);
			return reducedMotion
				? { opacity: 0 }
				: { opacity: 0, x, y, filter: "blur(2px)" };
		},
	};

	function advance(nextStepId: StepId, direction: Direction, answer: AnswerKey) {
		setHistory((prev) => [...prev, { stepId, direction }]);
		setNavDirection(direction);
		setStepId(nextStepId);

		const delta = directionDelta(direction);
		setPosition((prev) => ({ x: prev.x + Math.sign(delta.x), y: prev.y + Math.sign(delta.y) }));

		if (stepId === "intro") {
			// No data capture here; intro is just a start screen.
			return;
		}

		if (stepId === "who") {
			if (answer === "solo" || answer === "team") setMode(answer);
		}

		if (stepId === "first") {
			if (answer === "clarity" || answer === "momentum" || answer === "alignment" || answer === "diagnosis") {
				setPrimaryOutcome(answer);
				setDiagnoseFirst(answer === "diagnosis");
			}
		}

		if (stepId === "approach") {
			if (answer === "diagnose") setDiagnoseFirst(true);
			if (answer === "act") setDiagnoseFirst(false);
		}
	}

	function goBack() {
		setHistory((prev) => {
			const last = prev[prev.length - 1];
			if (!last) return prev;

			const nextHistory = prev.slice(0, -1);
			const backDirection = reverseDirection(last.direction);
			setNavDirection(backDirection);
			setStepId(last.stepId);
			if (last.stepId === "intro") {
				setShowIntroContent(reducedMotion);
			}

			const delta = directionDelta(backDirection);
			setPosition((pos) => ({
				x: pos.x + Math.sign(delta.x),
				y: pos.y + Math.sign(delta.y),
			}));

			return nextHistory;
		});
	}

	const canGoBack = history.length > 0;
	const directionsVisible = stepId !== "intro";
	const controlsVisible = directionsVisible;

	return (
		<div className={styles.shell}>
			<AnimatePresence>
				{stepId === "intro" && !reducedMotion && !showIntroContent ? (
					<motion.div
						key="intro-overlay"
						className={styles.introOverlay}
						aria-hidden
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<motion.div
							className={styles.introOverlayIcon}
							animate={{ rotate: [0, 15, -15, 0] }}
							transition={{
								duration: 1.15,
								ease: "easeInOut",
								times: [0, 0.33, 0.66, 1],
							}}
							onAnimationComplete={() => setShowIntroContent(true)}
						>
							<CompassMark size={400} title="Loading" />
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>

			<AnimatePresence initial={false}>
				{directionsVisible ? (
					<motion.div
						key="viewport-frame"
						className={styles.viewportFrame}
						aria-hidden="true"
						initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
						animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
						exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
					>
						<motion.span
							className={styles.cardNorth}
							initial={reducedMotion ? false : { opacity: 0, y: -8 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut", delay: 0.06 }}
						>
							N
						</motion.span>
						<motion.span
							className={styles.cardEast}
							initial={reducedMotion ? false : { opacity: 0, x: 8 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
							transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut", delay: 0.14 }}
						>
							E
						</motion.span>
						<motion.span
							className={styles.cardSouth}
							initial={reducedMotion ? false : { opacity: 0, y: 8 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut", delay: 0.22 }}
						>
							S
						</motion.span>
						<motion.span
							className={styles.cardWest}
							initial={reducedMotion ? false : { opacity: 0, x: -8 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
							transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut", delay: 0.3 }}
						>
							W
						</motion.span>
					</motion.div>
				) : null}
			</AnimatePresence>

			<AnimatePresence initial={false}>
				{mapEnabled ? (
					<motion.div
						key="grid"
						className={styles.gridMask}
						aria-hidden
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
						animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
						exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
						transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
					>
						<motion.div
							className={styles.gridPaper}
							initial={
								reducedMotion
									? { opacity: 1 }
									: { opacity: 0, scale: 1.02, y: 10 }
							}
							animate={
								reducedMotion
									? { opacity: 1 }
									: {
										opacity: 1,
										scale: 1,
										x: position.x * -64,
										y: position.y * -64,
									}
							}
							transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
						>
							{/* CSS gradient grid paper */}
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>

			<div className={styles.inner}>
				<div className={styles.stage}>
					<div className={styles.stageCard}>
						<AnimatePresence mode="wait" initial={false} custom={navDirection}>
							<motion.div
								key={stepId}
								className={styles.stepCard}
								variants={cardVariants}
								custom={navDirection}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
							>
								{stepId === "intro" ? (
									<section
										className={`${styles.section} ${styles.introSection}`}
										aria-label="Begin Founder Compass"
									>
										<motion.div
											className={styles.introStack}
											initial="hidden"
											animate={showIntroContent || reducedMotion ? "show" : "hidden"}
											variants={{
												hidden: {},
												show: {
													transition: {
														delayChildren: reducedMotion ? 0 : 0.05,
														staggerChildren: reducedMotion ? 0 : 0.12,
													},
												},
											}}
										>
											<motion.div
												variants={{
													hidden: { opacity: 0, y: 8 },
													show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
												}}
												className={styles.introIconRow}
											>
												<CompassMark size={28} className={styles.introIcon} title="Compass" />
											</motion.div>

											<motion.div
												variants={{
													hidden: { opacity: 0, y: 8 },
													show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
												}}
											>
												<Heading level={2} marginBottom={1} textAlign="center">
													Begin your Founder Compass
												</Heading>
											</motion.div>

											<motion.div
												variants={{
													hidden: { opacity: 0, y: 8 },
													show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
												}}
											>
												<Paragraph marginBottom={2} textAlign="center">
													Scaling a startup brings predictable friction—strategy, leadership, alignment, and
													execution pressure. Zoe’s been through it and can help you navigate, but first we’ll
													get you pointed to the right package.
												</Paragraph>
											</motion.div>

											<motion.div
												variants={{
													hidden: { opacity: 0, y: 8 },
													show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
												}}
												className={styles.introActions}
											>
												<Button.Step
													label="Start the journey"
													variant="primary"
													clickHandler={() => {
														setShowIntroContent(true);
														advance(STEP_ORDER.intro, "E", "start");
													}}
												/>
											</motion.div>
										</motion.div>
									</section>
								) : null}

								{stepId === "who" ? (
									<section className={styles.section} aria-label="Who is this for?">
											<Heading level={2} marginBottom={1} textAlign="center">
											Who is this for?
										</Heading>
										<div className={styles.answerGrid} role="radiogroup" aria-label="Audience">
											{ALL_MODES.map((opt) => {
												const selected = opt.id === mode;
												const direction: Direction = opt.id === "solo" ? "N" : "S";
												return (
													<button
														key={opt.id}
														type="button"
														className={styles.answer}
														data-selected={selected ? "true" : "false"}
														role="radio"
														aria-checked={selected}
														onClick={() => advance(STEP_ORDER.who, direction, opt.id)}
													>
															<span className={styles.answerLabel}>{opt.label}</span>
															<span className={styles.answerDir}>{direction}</span>
															<span className={styles.answerHint}>{opt.hint}</span>
													</button>
												);
											})}
										</div>
									</section>
								) : null}

								{stepId === "first" ? (
									<section className={styles.section} aria-label="What do you want first?">
										<Heading level={2} marginBottom={1} textAlign="center">
											What do you want first?
										</Heading>
										<div className={styles.answerGrid} role="radiogroup" aria-label="Outcome">
											{([
												{ id: "clarity", dir: "E" },
												{ id: "momentum", dir: "W" },
											] as const).map((opt) => {
												const meta = ALL_OUTCOMES.find((o) => o.id === opt.id);
												const selected = primaryOutcome === opt.id;
												return (
													<button
														key={opt.id}
														type="button"
														className={styles.answer}
														data-selected={selected ? "true" : "false"}
														role="radio"
														aria-checked={selected}
														onClick={() => advance(STEP_ORDER.first, opt.dir, opt.id)}
													>
																<span className={styles.answerLabel}>{meta?.label ?? opt.id}</span>
																<span className={styles.answerDir}>{opt.dir}</span>
																<span className={styles.answerHint}>{meta?.hint}</span>
													</button>
												);
											})}
										</div>
										<Paragraph type="caption" className={styles.helper} textAlign="center">
											Want alignment or diagnosis instead? Choose below.
										</Paragraph>
										<div className={styles.answerGrid} role="radiogroup" aria-label="More outcomes">
											{([
												{ id: "alignment", dir: "N" },
												{ id: "diagnosis", dir: "S" },
											] as const).map((opt) => {
												const meta = ALL_OUTCOMES.find((o) => o.id === opt.id);
												const selected = primaryOutcome === opt.id;
												return (
													<button
														key={opt.id}
														type="button"
														className={styles.answer}
														data-selected={selected ? "true" : "false"}
														role="radio"
														aria-checked={selected}
														onClick={() => advance(STEP_ORDER.first, opt.dir, opt.id)}
													>
																<span className={styles.answerLabel}>{meta?.label ?? opt.id}</span>
																<span className={styles.answerDir}>{opt.dir}</span>
																<span className={styles.answerHint}>{meta?.hint}</span>
													</button>
												);
											})}
										</div>
									</section>
								) : null}

								{stepId === "approach" ? (
									<section className={styles.section} aria-label="How do you want to move?">
										<Heading level={2} marginBottom={1} textAlign="center">
											How do you want to move?
										</Heading>
										<div className={styles.answerGrid} role="radiogroup" aria-label="Approach">
											<button
												type="button"
												className={styles.answer}
												data-selected={diagnoseFirst ? "true" : "false"}
												role="radio"
												aria-checked={diagnoseFirst}
												onClick={() => advance(STEP_ORDER.approach, "S", "diagnose")}
											>
												<span className={styles.answerLabel}>Diagnose first</span>
												<span className={styles.answerDir}>S</span>
												<span className={styles.answerHint}>
													Get a grounded read before picking tactics.
												</span>
											</button>

											<button
												type="button"
												className={styles.answer}
												data-selected={!diagnoseFirst ? "true" : "false"}
												role="radio"
												aria-checked={!diagnoseFirst}
												onClick={() => advance(STEP_ORDER.approach, "N", "act")}
											>
												<span className={styles.answerLabel}>Act now</span>
												<span className={styles.answerDir}>N</span>
												<span className={styles.answerHint}>
													Build traction with a clear next move.
												</span>
											</button>
										</div>
									</section>
								) : null}

								{stepId === "result" ? (
									<section className={styles.section} aria-label="Your match">
										<Heading level={2} marginBottom={1} textAlign="center">
											Your match
										</Heading>
										<Paragraph type="caption" diminish textAlign="center" marginBottom={1}>
											Recommended package
										</Paragraph>
										<div className={styles.card}>
											<Heading level={2} marginBottom={0.5}>
												{match.title}
											</Heading>
											<Paragraph marginBottom={1}>{match.oneLiner}</Paragraph>

											<div className={styles.cardBlock}>
												<Heading level={5} label marginBottom={0.5}>
													Why this match
												</Heading>
												<ul className={styles.cardList}>
													{match.why.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
											</div>

											<div className={styles.cardCta}>
												<Button
													_type="button"
													linkType="internal"
													internalPage={{ slug: { current: `services-v3/${match.slug}` } }}
												>
													Open recommended page
												</Button>
												<Button
													_type="button"
													variant="secondary"
													linkType="internal"
													internalPage={{ slug: { current: "services-v3" } }}
												>
													Take the full questionnaire
												</Button>
											</div>
										</div>
									</section>
								) : null}
							</motion.div>
						</AnimatePresence>
					</div>

					<AnimatePresence>
						{controlsVisible ? (
							<motion.div
								key="stage-actions"
								className={styles.stageActions}
								initial={reducedMotion ? false : { opacity: 0, y: 10 }}
								animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
								exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
								transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut", delay: reducedMotion ? 0 : 0.35 }}
							>
								<button
									type="button"
									className={styles.back}
									onClick={goBack}
									disabled={!canGoBack}
									aria-label="Back"
								>
									<Icon name="previous" alt="Back" size="medium" />
								</button>
								<Button
									_type="button"
									variant="secondary"
									actionType="button"
									clickHandler={() => {
										setHistory([]);
										setStepId("intro");
										setShowIntroContent(reducedMotion);
										setNavDirection("E");
										setPosition({ x: 0, y: 0 });
										setMode("solo");
										setPrimaryOutcome("clarity");
										setDiagnoseFirst(false);
									}}
								>
									Restart
								</Button>
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
