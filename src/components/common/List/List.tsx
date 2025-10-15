import React from "react";
import styles from "./List.module.css";
import cx from "classnames";

type ListProps = {
	children?: React.ReactNode;
	className?: string;
};

export default function List({ children, className }: ListProps) {
	return <div className={cx(styles.list, className)}>{children}</div>;
}

type ListItemProps = {
	children?: React.ReactNode;
	className?: string;
};

export function ListItem({ children, className }: ListItemProps) {
	return (
		<div className={cx(styles.item, className)}>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
