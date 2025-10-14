import React from "react";
import Page from "../../components/layout/Page/Page";
import Card from "../../components/common/Card/Card";
import styles from "./Profile.module.css";

export default function Profile() {
	return (
		<Page title="Profile">
			<div className={styles.list}>
				<Card title="Account">
					<div>Email: user@example.com</div>
				</Card>
				<Card title="Address">
					<div>123 Wildfire Rd, Safe City</div>
				</Card>
			</div>
		</Page>
	);
}


