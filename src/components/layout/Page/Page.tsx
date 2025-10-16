import React from "react";
import styles from "./Page.module.css";

type PageProps = {
	actions?: React.ReactNode;
	children?: React.ReactNode;
};

export default function Page({ actions, children }: PageProps) {
	return <div className={styles.wrapper}>{children}</div>;
}
