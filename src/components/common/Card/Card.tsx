import React from "react";
import styles from "./Card.module.css";
import cx from "classnames";

type CardProps = {
	children?: React.ReactNode;
	className?: string;
	muted?: boolean;
};

export default function Card({ children, className, muted = false }: CardProps) {
	return (
		<div className={cx(styles.card, { [styles.muted]: muted }, className)}>
			<div>{children}</div>
		</div>
	);
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
	return <div className={styles.header}>{children}</div>;
}

export function CardFooter({ children }: { children?: React.ReactNode }) {
	return <div className={styles.footer}>{children}</div>;
}
