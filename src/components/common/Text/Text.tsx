import React from "react";
import styles from "./Text.module.css";
import cx from "classnames";

type TextVariant = "title" | "subtitle" | "body" | "caption";

type TextProps = {
	children?: React.ReactNode;
	variant?: TextVariant;
	muted?: boolean;
	align?: "left" | "center" | "right";
	boldness?: "normal" | "semiBold" | "bold";
	className?: string;
	as?: React.ElementType;
	cssStyle?: React.CSSProperties;
};

export default function Text({
	children,
	variant = "body",
	muted = false,
	align = "left",
	boldness,
	className,
	as = "p",
	cssStyle,
}: TextProps) {
	const Component = as as any;
	return (
		<Component
			className={cx(
				styles.base,
				styles[variant],
				{ [styles.muted]: muted, [styles.center]: align === "center" },
				boldness ? styles[boldness] : undefined,
				className
			)}
			style={cssStyle}
		>
			{children}
		</Component>
	);
}


