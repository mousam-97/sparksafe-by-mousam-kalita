import React, { createContext, useContext, useMemo } from "react";
import productsData from "../data/products.json";
import type { Product, ProductMap } from "../types";

type ProductsContextValue = {
	productsById: ProductMap;
	allProductIds: string[];
	getById: (id: string) => Product | undefined;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

function mapJsonToProductMap(): { productsById: ProductMap; allProductIds: string[] } {
	const entries: [string, Product][] = productsData.map((p: any) => {
		const product: Product = {
			id: String(p.id),
			name: p.title ?? p.name ?? String(p.id),
			price: Number(p.price),
			imageUrl: p.image ?? p.imageUrl ?? "",
			description: p.description,
			reviewsCount: typeof p.reviews === "number" ? p.reviews : undefined,
		};
		return [product.id, product];
	});
	const productsById: ProductMap = Object.fromEntries(entries);
	const allProductIds = entries.map(([id]) => id);
	return { productsById, allProductIds };
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
	const { productsById, allProductIds } = useMemo(() => mapJsonToProductMap(), []);

	const value = useMemo<ProductsContextValue>(
		() => ({
			productsById,
			allProductIds,
			getById: (id: string) => productsById[id],
		}),
		[productsById, allProductIds]
	);

	return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
    return ctx;
}


