import React from "react";
import styles from "./ListItem.module.css";
import cx from "classnames";

type ListItemProps = {
	title?: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

export default function ListItem({ title, footer, children, className }: ListItemProps) {
	return (
		<div className={cx(styles.item, className)}>
			{title ? <div className={styles.title}>{title}</div> : null}
			<div className={styles.content}>{children}</div>
			{footer ? <div className={styles.footer}>{footer}</div> : null}
		</div>
	);
}


