import React from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
	children: React.ReactNode;
	variant?: "default" | "success";
	className?: string;
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
	const classNames = [styles.badge, variant !== "default" ? styles[variant] : undefined, className]
		.filter(Boolean)
		.join(" ");
	return <span className={classNames}>{children}</span>;
}


