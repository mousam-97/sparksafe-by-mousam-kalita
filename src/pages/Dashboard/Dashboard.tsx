import React from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import Badge from "../../components/common/Badge/Badge";
import List, { ListItem } from "../../components/common/List/List";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { useUpgrades } from "../../context/UpgradesContext";
import Row, { Space } from "../../components/common/Grid/Grid";
import Card, { CardFooter, CardHeader } from "../../components/common/Card/Card";
import Text from "../../components/common/Text/Text";
import styles from "./Dashboard.module.css";
import DashboardUpgradablesDetailsModal from "./DashboardUpgradablesDetailsModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/common/Toast/Toast";

// simple helper to render a decorative left icon box
const IconBox = ({ emoji }: { emoji: string }) => (
	<div className={styles.iconBox}>
		<span aria-hidden>{emoji}</span>
	</div>
);

export default function Dashboard() {
	const { allUpgradeIds, upgradesById, progress, completedById, markComplete } = useUpgrades();
	const [openId, setOpenId] = useState<string | null>(null);
	const { showToast } = useToast();
	const navigate = useNavigate();

	function shopRecomendedProducts(upgradableId: string) {
		const u = upgradesById[upgradableId];
		const first = u?.recommendedProducts?.[0];
		const q = first ? encodeURIComponent(first) : "";
		navigate(q ? `/marketplace?q=${q}` : "/marketplace");
	}

	return (
		<Page>
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
								<Card muted={isDone}>
									<CardHeader>
										<Row align="center" justify="between" gap={3}>
											<Row align="center" gap={3}>
												<IconBox emoji={u.emoji ?? "🌿"} />
												<Text variant="subtitle">{u.title}</Text>
											</Row>
											<Badge variant="success">+{u.scoreGain}</Badge>
										</Row>
									</CardHeader>
									<Text variant="body">{u.description}</Text>
									<CardFooter>
										<Row gap={3} justify="end">
											{/* <Button
												variant={isDone ? "ghost" : "primary"}
												onClick={() => {
													if (!isDone) {
														markComplete(u.id);
														showToast("Marked as complete!", "success");
													}
												}}
												disabled={isDone}
												size="sm"
											>
												{isDone ? "Completed" : "Mark as complete"}
											</Button> */}

											<Button
												variant="accent"
												onClick={() => shopRecomendedProducts(u.id)}
												size="sm"
											>
												Shop
											</Button>
											<Button
												variant="secondary"
												onClick={() => setOpenId(u.id)}
												size="sm"
											>
												View Details
											</Button>
										</Row>
									</CardFooter>
								</Card>
							</ListItem>
						);
					})}
				</List>
				<DashboardUpgradablesDetailsModal
					open={!!openId}
					upgradable={openId ? upgradesById[openId] : undefined}
					isDone={openId ? !!completedById[openId] : false}
					onMarkComplete={(id) => {
						if (!completedById[id]) {
							markComplete(id);
							showToast("Marked as complete!", "success");
						}
					}}
					onClose={() => setOpenId(null)}
					shopRecomendedProducts={shopRecomendedProducts}
				/>
			</div>
		</Page>
	);
}
