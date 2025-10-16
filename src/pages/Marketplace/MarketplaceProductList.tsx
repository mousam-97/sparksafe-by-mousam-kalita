import React from "react";
import styles from "./MarketplaceProductList.module.css";
import MarketplaceProductItem from "./MarketplaceProductItem";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/common/Toast/Toast";

type Props = {
	ids: string[];
};

export default function MarketplaceProductList({ ids }: Props) {
	const { addItem } = useCart();
	const { showToast } = useToast();

	function onAdd(productId: string) {
		addItem(productId, 1);
		showToast("Added to cart", "success");
	}

 	return (
 		<div className={styles.grid}>
 			{ids.map((id) => (
 				<MarketplaceProductItem key={id} productId={id} onAdd={onAdd} />
 			))}
 		</div>
 	);
 }


