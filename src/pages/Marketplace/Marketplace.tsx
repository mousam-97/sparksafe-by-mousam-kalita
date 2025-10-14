import React from "react";
import Page from "../../components/layout/Page/Page";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { Product } from "../../types";
import styles from "./Marketplace.module.css";

const MOCK_PRODUCTS: Product[] = [
	{ id: "1", name: "Fire-Resistant Vent", price: 45, imageUrl: "/logo192.png", category: "Vents" },
	{ id: "2", name: "Gutter Guard", price: 25, imageUrl: "/logo192.png", category: "Roof" },
	{ id: "3", name: "Fire-Resistant Siding", price: 300, imageUrl: "/logo192.png", category: "Siding" },
	{ id: "4", name: "Dual-Pane Window", price: 500, imageUrl: "/logo192.png", category: "Windows" }
];

export default function Marketplace() {
	return (
		<Page title="Marketplace">
			<div className={styles.grid}>
				{MOCK_PRODUCTS.map(p => (
					<Card key={p.id}>
						<div className={styles.product}>
							<img className={styles.image} src={p.imageUrl} alt={p.name} />
							<div style={{ fontWeight: 600 }}>{p.name}</div>
							<div style={{ color: "var(--color-text-muted)" }}>${p.price}</div>
							<Button>Add to Cart</Button>
						</div>
					</Card>
				))}
			</div>
		</Page>
	);
}


