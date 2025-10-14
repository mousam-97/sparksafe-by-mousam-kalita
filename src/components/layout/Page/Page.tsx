import React from "react";
import styles from "./Page.module.css";
import Brand from "../../common/Brand/Brand";

type PageProps = {
	title?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
};

export default function Page({ title, actions, children }: PageProps) {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<Brand />
				{actions}
			</header>
			{title ? <div className={styles.title}>{title}</div> : null}
			{children}
		</div>
	);
}


