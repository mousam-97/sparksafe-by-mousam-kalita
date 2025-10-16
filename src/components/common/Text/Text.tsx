import React from "react";
import styles from "./Text.module.css";
import cx from "classnames";

type TextProps = {
	children?: React.ReactNode;
	textSize?: 1 | 2 | 3 | 4 | 5; // size1..size5 maps to xs..xl
	muted?: boolean;
	align?: "left" | "center" | "right";
	boldness?: "normal" | "semiBold" | "bold";
	className?: string;
	as?: React.ElementType;
	cssStyle?: React.CSSProperties;
};

export default function Text({
	children,
	textSize = 3,
	muted = false,
	align = "left",
	boldness,
	className,
	as = "p",
	cssStyle,
}: TextProps) {
	const Component = as as any;
	const sizeClass = styles[`size${textSize}` as keyof typeof styles] as string | undefined;
	return (
		<Component
			className={cx(
				styles.base,
				sizeClass,
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


