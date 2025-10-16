import React from "react";
import styles from "./Brand.module.css";

export default function Brand() {
	return (
		<div className={styles.wrap} aria-label="SparkSafe">
			<img className={styles.logo} src="/brand_logo.png" alt="SparkSafe logo" />
			<span className={styles.name}>SparkSafe</span>
		</div>
	);
}


