import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Row, { Space } from "../../components/common/Grid/Grid";
import Modal, { ModalFooter, ModalHeader } from "../../components/common/Modal/Modal";
import Text from "../../components/common/Text/Text";
import { Upgradable } from "../../types";

type Props = {
	open: boolean;
	upgradable?: Upgradable;
	onClose: () => void;
	onMarkComplete: (id: string) => void;
	isDone?: boolean;
};

export default function DashboardUpgradablesDetailsModal({
	open,
	upgradable,
	onClose,
	onMarkComplete,
	isDone,
}: Props) {
	if (!upgradable) return null;
	const u = upgradable;
	return (
		<Modal open={open} onClose={onClose}>
			<ModalHeader>
				<Text as="div" variant="title">
					{u.title}
				</Text>
			</ModalHeader>

			<Text>{u.details}</Text>
			<Space vertical size={3} />
			<Text variant="subtitle">Projected Resiliency Score Gain</Text>
			<Text>+{u.scoreGain}</Text>
			<Space vertical size={3} />
			<Text variant="subtitle">Estimated Cost / Difficulty</Text>
			<Row align="center" gap={3}>
				<Badge variant="success">Cost: {u.estimatedCost}</Badge>
				<Badge>Difficulty: {u.estimatedDifficulty}</Badge>
			</Row>

			<Space vertical size={3} />
			<ModalFooter>
				<Row gap={3} justify="end">
					<Button
						variant={isDone ? "ghost" : "primary"}
						disabled={isDone}
						onClick={() => onMarkComplete(u.id)}
						size="md"
					>
						{isDone ? "Completed" : "Mark as complete"}
					</Button>
				</Row>
				<Button variant="accent" onClick={() => {}} size="md">
					Shop Products
				</Button>
			</ModalFooter>
		</Modal>
	);
}
