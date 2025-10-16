import React from "react";
import Page from "../../components/layout/Page/Page";
import Card from "../../components/common/Card/Card";
import styles from "./Profile.module.css";
import Button from "../../components/common/Button/Button";
import Row from "../../components/common/Grid/Grid";
import Text from "../../components/common/Text/Text";

export default function Profile() {
	return (
		<Page>
			<div className={styles.list}>
				<Card>
					<Row align="center" gap={3}>
						<img
							src="https://api.dicebear.com/9.x/identicon/svg?seed=user"
							alt="avatar"
							width={48}
							height={48}
							style={{ borderRadius: 999 }}
						/>
						<div>
							<Text as="div" boldness="bold">
								Mousam Kalita
							</Text>
							<Text as="div" muted>
								user@example.com
							</Text>
						</div>
					</Row>
				</Card>
				<Card>
					<Row columnDirection gap={2}>
						<Text as="div" boldness="bold">
							Shipping Address
						</Text>
						<Text as="div" muted>
							123 Wildfire Rd, Safe City
						</Text>
						<Button variant="secondary">Edit</Button>
					</Row>
				</Card>
				<Card>
					<Row columnDirection gap={2}>
						<Text as="div" boldness="bold">
							Payment Methods
						</Text>
						<Text as="div" muted>
							Visa •••• 4242
						</Text>
						<Button variant="secondary">Manage</Button>
					</Row>
				</Card>
			</div>
		</Page>
	);
}
