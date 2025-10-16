import React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/layout/Page/Page";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import styles from "./Marketplace.module.css";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/common/Toast/Toast";
import MarketplaceFilters from "./MarketplaceFilters";
import Row, { Space } from "../../components/common/Grid/Grid";
import Text from "../../components/common/Text/Text";

export default function Marketplace() {
	const { productsById, allProductIds } = useProducts();
	const { addItem } = useCart();
	const { showToast } = useToast();

	function onAdd(productId: string) {
		addItem(productId, 1);
		showToast("Added to cart", "success");
	}

	return (
		<Page>
			<MarketplaceFilters productsById={productsById} allProductIds={allProductIds}>
				{(filteredIds) => (
					<div className={styles.grid}>
						{filteredIds.map((id) => {
							const p = productsById[id];
							const img =
								p.imageUrl ||
								"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=60";
							return (
								<Card key={id}>
									<Row
										columnDirection
										justify="between"
										style={{ height: "100%" }}
									>
										<Link
											to={`/product/${id}`}
											style={{ textDecoration: "none", color: "inherit" }}
										>
											<img className={styles.image} src={img} alt={p.name} />
											<Text variant="subtitle">{p.name}</Text>
										</Link>
										<Space vertical size={1} />
										<Row columnDirection>
											<Text muted boldness="semiBold">
												${p.price}
											</Text>
											<Space vertical size={1} />
											<Button fullWidth onClick={() => onAdd(id)}>
												Add to Cart
											</Button>
										</Row>
									</Row>
								</Card>
							);
						})}
					</div>
				)}
			</MarketplaceFilters>
		</Page>
	);
}
