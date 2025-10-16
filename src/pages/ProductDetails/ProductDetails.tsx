import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/common/Button/Button";
import styles from "./ProductDetails.module.css";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/common/Toast/Toast";
import Row, { Space } from "../../components/common/Grid/Grid";
import Text from "../../components/common/Text/Text";
import List, { ListItem } from "../../components/common/List/List";
import Icon from "../../components/icons/Icon";
import Badge from "../../components/common/Badge/Badge";
import { formatCurrency } from "../../utils/CurrencyUtils";

export default function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { getById } = useProducts();
	const { addItem, setQuantity, state } = useCart();
	const { showToast } = useToast();
	const product = useMemo(() => (id ? getById(id) : undefined), [id, getById]);

	if (!product) {
		// If product not found, navigate back to marketplace
		return (
			<Page>
				<Row style={{ paddingTop: 24 }}>
					<Text muted as="div">
						Product not found.
					</Text>
				</Row>
				<Row style={{ height: 12 }} />
				<Button onClick={() => navigate(-1)}>Go Back</Button>
			</Page>
		);
	}

	const p = product as NonNullable<typeof product>;
	const qty = state.items[p.id] ?? 0;
	const hero =
		p.imageUrl || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=60";

	function addToCart() {
		addItem(p.id, 1);
		showToast("Added to cart", "success");
	}

	return (
		<Page>
			<Button variant="secondary" onClick={() => navigate(-1)} size="sm">
				<Icon name="arrowLeft" />
			</Button>

			<img className={styles.image} src={hero} alt={p.name} />
			<Row columnDirection gap={1}>
				<Text as="h2" textSize={5} boldness="bold">
					{p.name}
				</Text>
				{p.reviewsCount ? (
					<Text muted as="p">
						({p.reviewsCount} reviews)
					</Text>
				) : null}
			</Row>
			<Space vertical size={1} />
			<Row align="center" justify="between">
				<Text as="strong" textSize={5} boldness="bold">
					{formatCurrency(p.price, { maximumFractionDigits: 2 })}
				</Text>
				{qty === 0 ? (
					<Button onClick={addToCart}>Add to Cart</Button>
				) : (
					<Row align="center" gap={2}>
						<Button
							variant="secondary"
							onClick={() => setQuantity(p.id, Math.max(0, qty - 1))}
						>
							-
						</Button>
						<Text
							as="div"
							align="center"
							cssStyle={{ minWidth: 20, textAlign: "center" }}
						>
							{qty}
						</Text>
						<Button variant="secondary" onClick={() => setQuantity(p.id, qty + 1)}>
							+
						</Button>
					</Row>
				)}
			</Row>
			<Space vertical size={1} />

			<div className={styles.section}>
				<div className={styles.sectionHeader}>
					<Text as="strong">Description</Text>
				</div>
				<Text muted as="div">
					{p.description ?? "High-quality home-hardening product."}
				</Text>
			</div>

			<div className={styles.section}>
				<div className={styles.sectionHeader}>
					<Text as="strong">Specifications</Text>
				</div>
				<List>
					<ListItem>
						<Text muted as="div">
							Approval status:{" "}
							<Badge
								variant={p.approvalStatus === "approved" ? "success" : "default"}
							>
								{p.approvalStatus
									? p.approvalStatus.charAt(0).toUpperCase() +
									  p.approvalStatus.slice(1)
									: "Unknown"}
							</Badge>
						</Text>
					</ListItem>
					<ListItem>
						<Text muted as="div">
							Category: {p.category ?? "General"}
						</Text>
					</ListItem>
					<ListItem>
						<Text muted as="div">
							Ships in 2–4 days
						</Text>
					</ListItem>
					<ListItem>
						<Text muted as="div">
							30-day returns
						</Text>
					</ListItem>
				</List>
			</div>
		</Page>
	);
}
