import React from "react";
import styles from "./Page.module.css";

type PageProps = {
	title?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
};

export default function Page({ title, actions, children }: PageProps) {
	return (
		<div className={styles.wrapper}>
			{title || actions ? (
				<header className={styles.header}>
					{title ? <div className={styles.title}>{title}</div> : <div />}
					{actions}
				</header>
			) : null}
			{children}
		</div>
	);
}


