import React from "react";
import styles from "./Button.module.css";
import cx from "classnames";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
};

export default function Button({
	variant = "primary",
	size = "md",
	fullWidth = false,
	className,
	children,
	...rest
}: ButtonProps) {
	const classNames = cx(
		styles.button,
		styles[variant],
		styles[size],
		{ [styles.fullWidth]: fullWidth },
		className
	);

	return (
		<button className={classNames} {...rest}>
			{children}
		</button>
	);
}


