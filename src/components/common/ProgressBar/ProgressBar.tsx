import React from "react";
import styles from "./ProgressBar.module.css";
import cx from "classnames";

type ProgressBarProps = {
	value: number; // 0-100
	label?: string;
	className?: string;
};

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
	const clamped = Math.max(0, Math.min(100, value));
	return (
		<div>
			<div className={cx(styles.root, className)}>
				<div className={styles.bar} style={{ width: `${clamped}%` }} />
			</div>
			{label && (
				<div className={styles.label}>{label}</div>
			)}
		</div>
	);
}


