import React from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
	return (
		<Page title="Product Details">
			<img className={styles.image} src="/logo512.png" alt="Product" />
			<h2 style={{ marginBottom: 4 }}>Fire-Resistant Vent</h2>
			<div style={{ color: "var(--color-text-muted)" }}>(123 reviews)</div>
			<div className={styles.priceRow}>
				<strong style={{ fontSize: 28 }}>$45.00</strong>
				<div style={{ display: "flex", gap: 8 }}>
					<Button variant="secondary">-</Button>
					<div style={{ alignSelf: "center" }}>1</div>
					<Button variant="secondary">+</Button>
				</div>
			</div>
			<Button fullWidth>Add to Cart</Button>
		</Page>
	);
}


