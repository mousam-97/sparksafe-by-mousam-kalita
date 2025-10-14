import React from "react";
import styles from "./Card.module.css";
import cx from "classnames";

type CardProps = {
	title?: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

export default function Card({ title, footer, children, className }: CardProps) {
	return (
		<div className={cx(styles.card, className)}>
			{title ? <div className={styles.header}>{title}</div> : null}
			<div>{children}</div>
			{footer ? <div className={styles.footer}>{footer}</div> : null}
		</div>
	);
}


