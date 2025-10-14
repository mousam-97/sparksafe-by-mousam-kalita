import React from "react";
import styles from "./Brand.module.css";

export default function Brand() {
	return (
		<div className={styles.wrap} aria-label="SparkSafe">
			<span className={styles.logo} aria-hidden>
				{/* Simple fire glyph */}
				<span style={{ color: "var(--color-danger)" }}>🔥</span>
			</span>
			<span className={styles.name}>SparkSafe</span>
		</div>
	);
}


