import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Row, { Space } from "../../components/common/Grid/Grid";
import Text from "../../components/common/Text/Text";
import { useProducts } from "../../context/ProductsContext";
import styles from "./MarketplaceProductItem.module.css";
import { formatCurrency } from "../../utils/CurrencyUtils";

type Props = {
	productId: string;
	onAdd: (productId: string) => void;
};

export default function MarketplaceProductItem({ productId, onAdd }: Props) {
	const { productsById } = useProducts();
	const product = productsById[productId];
	if (!product) return null;

	const imageSrc =
		product.imageUrl ||
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=60";

	return (
		<Card>
			<Row columnDirection justify="between" style={{ height: "100%" }}>
				<Link
					to={`/product/${productId}`}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<img
						className={styles.image}
						src={imageSrc}
						alt={product.name}
						loading="lazy"
					/>
					<Text textSize={4} boldness="semiBold">
						{product.name}
					</Text>
				</Link>
				<Space vertical size={1} />
				<Row columnDirection>
					<Text muted boldness="semiBold">
						{formatCurrency(product.price, { maximumFractionDigits: 2 })}
					</Text>
					<Space vertical size={1} />
					<Button fullWidth onClick={() => onAdd(productId)}>
						Add to Cart
					</Button>
				</Row>
			</Row>
		</Card>
	);
}
