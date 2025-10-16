import React from "react";
import styles from "./Page.module.css";
import Brand from "../../common/Brand/Brand";

type PageProps = {
	actions?: React.ReactNode;
	children?: React.ReactNode;
};

export default function Page({ actions, children }: PageProps) {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<Brand />
				{actions}
			</header>
			{children}
		</div>
	);
}
