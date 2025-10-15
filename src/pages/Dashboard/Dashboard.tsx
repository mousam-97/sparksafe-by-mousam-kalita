import React from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import Badge from "../../components/common/Badge/Badge";
import List, { ListItem } from "../../components/common/List/List";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { useUpgrades } from "../../context/UpgradesContext";
import Row, { Space } from "../../components/common/Grid/Grid";
import Card from "../../components/common/Card/Card";
import Text from "../../components/common/Text/Text";
import styles from "./Dashboard.module.css";

// simple helper to render a decorative left icon box
const IconBox = ({ emoji }: { emoji: string }) => (
	<div className={styles.iconBox}>
		<span aria-hidden>{emoji}</span>
	</div>
);

export default function Dashboard() {
	const { allUpgradeIds, upgradesById, progress, completedById, markComplete } = useUpgrades();

	return (
		<Page title="My Wildfire Hardening Plan">
			<div>
				<Text variant="subtitle" className={styles.sectionTitle}>
					Overall Progress
				</Text>
				<Space vertical size={2} />
				<ProgressBar
					value={progress}
					label={`You're ${progress}% of the way to a safer home!`}
				/>

				<Space vertical size={2} />
				<List>
					{allUpgradeIds.map((id) => {
						const u = upgradesById[id];
						const isDone = !!completedById[id];
						return (
							<ListItem key={u.id}>
								<Card
									title={
										<Row align="center" justify="between" gap={3}>
											<Row align="center" gap={3}>
												<IconBox emoji={u.emoji ?? "🌿"} />
												<Text as="div" variant="title">
													{u.title}
												</Text>
											</Row>
											<Badge variant="success">+{u.scoreGain}</Badge>
										</Row>
									}
									footer={
										<Row gap={3} justify="end">
											<Button variant="secondary">View Details</Button>
											<Button
												variant={isDone ? "ghost" : "primary"}
												onClick={() => markComplete(u.id)}
												disabled={isDone}
											>
												{isDone ? "Completed" : "Mark as complete"}
											</Button>
										</Row>
									}
								>
									<Text className={styles.description}>{u.description}</Text>
								</Card>
							</ListItem>
						);
					})}
				</List>
			</div>
		</Page>
	);
}
