import type { ReactNode } from "react";
export type NavigationItem = {
	path: string;
	label: string;
	icon?: ReactNode;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category?: string; // optional; not always present in data
	description?: string;
	rating?: number;
	reviewsCount?: number;
};

export type ProductMap = Record<string, Product>;

export type PlanItem = {
	id: string;
	title: string;
	description: string;
	score: number;
};

export type Upgradable = {
	id: string;
	title: string; // from task
	description: string;
	details: string;
	scoreGain: number;
	emoji?: string;
	estimatedCost: "Low" | "Medium" | "High";
	estimatedDifficulty: "Easy" | "Medium" | "Hard";
};

export type UpgradableMap = Record<string, Upgradable>;

export type CartLineItem = {
	productId: string;
	quantity: number;
};

export type CartState = {
	// productId -> quantity
	items: Record<string, number>;
};

export type CartComputedItem = {
	product: Product;
	quantity: number;
	lineTotal: number;
};

export type CartTotals = {
	itemCount: number; // total quantity
	subtotal: number; // sum of price * quantity
};

export type CartContextValue = {
	state: CartState;
	computed: {
		items: CartComputedItem[];
		totals: CartTotals;
	};
	addItem: (productId: string, quantity?: number) => void;
	removeItem: (productId: string) => void;
	setQuantity: (productId: string, quantity: number) => void;
	clear: () => void;
};


