import React from "react";
import styles from "./cornhole_guy.module.css";

type Props = {
	durationMs?: number;
	loop?: boolean;
	hitHole?: boolean;
	className?: string;
};

export const CornholeThrow: React.FC<Props> = ({
	durationMs = 2000,
	loop = true,
	hitHole = false,
	className,
}) => {
	// Scene geometry (px)
	const start = { x: 68, y: 120 }; // thrower’s hand approx
	// Board top (parallelogram) — side-ish perspective
	const hole = { x: 285, y: 105 };

	// End location on top surface:
	const land = hitHole ? hole : { x: hole.x - 28, y: hole.y + 12 };

	// Nice lob control point (peak)
	const ctrl = { x: (start.x + land.x) / 2, y: 12 };

	// CSS motion path
	const path = `M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${land.x} ${land.y}`;

	// tiny slide direction along board (projected forward)
	const slide = hitHole ? { x: 10, y: -6 } : { x: 6, y: -3 };

	return (
		<div
			className={`${styles.wrap} ${className ?? ""}`}
			style={
				{
					"--dur": `${durationMs}ms`,
					"--path": `path("${path}")`,
					"--loop": loop ? "infinite" : "1",
					"--slide-x": `${slide.x}px`,
					"--slide-y": `${slide.y}px`,
				} as React.CSSProperties
			}
			aria-label="Cornhole throw animation"
			role="img"
		>
			{/* Thrower (simple figure) */}
			<div className={styles.guy} aria-hidden="true">
				<div className={styles.head} />
				<div className={styles.body} />
				<div className={styles.arm} />
			</div>
			{/* Bag (flies along path, then slides on board) */}
			<div className={styles.bag} />
			{/* Side-view board */}

			<svg className={styles.board} viewBox="0 0 255 255" aria-hidden="true">
				{/* Legs */}
				<path
					d="M210 120 L200 100"
					stroke="var(--board-edge)"
					strokeWidth="6"
					strokeLinecap="round"
				/>

				{/* Board top: wide near the guy (left), narrow far (right) */}
				{/* points are: bottom left, bottom right, top right, top left */}
				<polygon
					points="120,120 210,100 190,88 110,105"
					className={styles.boardTop}
				/>

				{/* Hole centered left-to-right on the board, closer to back edge */}
				<ellipse cx="175" cy="99" rx="8" ry="3" className={styles.hole} />
			</svg>
		</div>
	);
};
