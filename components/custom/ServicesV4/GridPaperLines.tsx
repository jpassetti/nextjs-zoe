import React, { useMemo } from "react";
import { motion, type Variants } from "framer-motion";

type GridPaperLinesProps = {
	reducedMotion?: boolean;
};

const lineVariants: Variants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: { duration: 0.22, ease: "easeOut" },
	},
};

const groupVariants: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.008,
		},
	},
};

export default function GridPaperLines({ reducedMotion = false }: GridPaperLinesProps) {
	const viewBoxSize = 1024;
	const step = 32;

	const verticalXs = useMemo(() => {
		const xs: number[] = [];
		for (let x = 0; x <= viewBoxSize; x += step) xs.push(x);
		return xs;
	}, []);

	const horizontalYs = useMemo(() => {
		const ys: number[] = [];
		for (let y = 0; y <= viewBoxSize; y += step) ys.push(y);
		return ys;
	}, []);

	if (reducedMotion) {
		return (
			<svg
				className="gridSvg"
				viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
				preserveAspectRatio="none"
			>
				{verticalXs.map((x) => (
					<line
						key={`v-${x}`}
						x1={x}
						y1={0}
						x2={x}
						y2={viewBoxSize}
						stroke="var(--grid-line)"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						opacity={1}
					/>
				))}
				{horizontalYs.map((y) => (
					<line
						key={`h-${y}`}
						x1={0}
						y1={y}
						x2={viewBoxSize}
						y2={y}
						stroke="var(--grid-line)"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						opacity={1}
					/>
				))}
			</svg>
		);
	}

	return (
		<motion.svg
			className="gridSvg"
			viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
			preserveAspectRatio="none"
			initial="hidden"
			animate="show"
		>
			<motion.g variants={groupVariants}>
				{verticalXs.map((x) => (
					<motion.line
						key={`v-${x}`}
						x1={x}
						y1={0}
						x2={x}
						y2={viewBoxSize}
						stroke="var(--grid-line)"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						variants={lineVariants}
					/>
				))}
			</motion.g>

			<motion.g
				variants={{
					hidden: {},
					show: { transition: { staggerChildren: 0.008, delayChildren: 0.08 } },
				}}
			>
				{horizontalYs.map((y) => (
					<motion.line
						key={`h-${y}`}
						x1={0}
						y1={y}
						x2={viewBoxSize}
						y2={y}
						stroke="var(--grid-line)"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						variants={lineVariants}
					/>
				))}
			</motion.g>
		</motion.svg>
	);
}
