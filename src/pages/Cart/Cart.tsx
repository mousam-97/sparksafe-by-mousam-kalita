import React from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import styles from "./Cart.module.css";

export default function Cart() {
	return (
		<Page title="Cart">
			<div className={styles.list}>
				<div className={styles.row}>
					<div>Fire-Resistant Vent</div>
					<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
						<div>$45</div>
						<Button variant="secondary">Remove</Button>
					</div>
				</div>
			</div>
			<div style={{ height: 16 }} />
			<Button fullWidth>Checkout</Button>
		</Page>
	);
}


