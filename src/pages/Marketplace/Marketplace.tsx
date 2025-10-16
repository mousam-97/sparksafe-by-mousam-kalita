import React from "react";
import Page from "../../components/layout/Page/Page";
import { useProducts } from "../../context/ProductsContext";
import MarketplaceFilters from "./MarketplaceFilters";
import MarketplaceProductList from "./MarketplaceProductList";

export default function Marketplace() {
	const { productsById, allProductIds } = useProducts();

	return (
		<Page>
			<MarketplaceFilters productsById={productsById} allProductIds={allProductIds}>
				{(filteredIds) => <MarketplaceProductList ids={filteredIds} />}
			</MarketplaceFilters>
		</Page>
	);
}
