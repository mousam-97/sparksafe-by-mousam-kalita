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


