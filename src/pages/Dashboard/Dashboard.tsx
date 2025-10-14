import React from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import Badge from "../../components/common/Badge/Badge";
import List from "../../components/common/List/List";
import ListItem from "../../components/common/ListItem/ListItem";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
	return (
		<Page title="My Wildfire Hardening Plan">
			<div>
				<div>Overall Progress</div>
				<div className={styles.progress}>
					<div className={styles.bar} />
				</div>
				<List>
					<ListItem
						title="Clear Defensible Space"
						footer={
							<div style={{ display: "flex", gap: 12 }}>
								<Button variant="secondary">Shop</Button>
								<Button>View Details</Button>
							</div>
						}
					>
						<p style={{ margin: 0 }}>
							Clear flammable vegetation and materials from around your home.
						</p>
						<Badge variant="success">+10</Badge>
					</ListItem>
				</List>
			</div>
		</Page>
	);
}


