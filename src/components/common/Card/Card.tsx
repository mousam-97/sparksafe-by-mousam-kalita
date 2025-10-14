import React from "react";
import styles from "./Card.module.css";

type CardProps = {
	title?: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

export default function Card({ title, footer, children, className }: CardProps) {
	return (
		<div className={[styles.card, className].filter(Boolean).join(" ")}> 
			{title ? <div className={styles.header}>{title}</div> : null}
			<div>{children}</div>
			{footer ? <div className={styles.footer}>{footer}</div> : null}
		</div>
	);
}


