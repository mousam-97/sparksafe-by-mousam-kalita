import React from "react";
import styles from "./Badge.module.css";
import cx from "classnames";

type BadgeProps = {
	children: React.ReactNode;
	variant?: "default" | "success";
	className?: string;
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
	const classNames = cx(styles.badge, { [styles.success]: variant === "success" }, className);
	return <span className={classNames}>{children}</span>;
}


