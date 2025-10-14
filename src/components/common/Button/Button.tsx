import React from "react";
import styles from "./Button.module.css";
import cx from "classnames";

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
	const classNames = cx(
		styles.button,
		styles[variant],
		{ [styles.fullWidth]: fullWidth },
		className
	);

	return (
		<button className={classNames} {...rest}>
			{children}
		</button>
	);
}


