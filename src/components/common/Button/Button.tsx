import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	fullWidth?: boolean;
};

export default function Button({
	variant = "primary",
	fullWidth = false,
	className,
	children,
	...rest
}: ButtonProps) {
	const classNames = [styles.button, styles[variant], fullWidth ? styles.fullWidth : undefined, className]
		.filter(Boolean)
		.join(" ");

	return (
		<button className={classNames} {...rest}>
			{children}
		</button>
	);
}


