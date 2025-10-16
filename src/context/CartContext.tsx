import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { CartContextValue, CartState, Product } from "../types";
import { useProducts } from "./ProductsContext";
import { localStorageGetItem, localStorageSetItem } from "../utils/StorageUtils";

type CartAction =
	| { type: "ADD_ITEM"; productId: string; quantity: number }
	| { type: "REMOVE_ITEM"; productId: string }
	| { type: "SET_QTY"; productId: string; quantity: number }
	| { type: "CLEAR" }
	| { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "sparksafe_cart_v1";

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "HYDRATE":
			return action.state;
		case "ADD_ITEM": {
			const currentQty = state.items[action.productId] ?? 0;
			const nextQty = Math.max(0, currentQty + action.quantity);
			const nextItems = { ...state.items };
			if (nextQty === 0) {
				delete nextItems[action.productId];
			} else {
				nextItems[action.productId] = nextQty;
			}
			return { items: nextItems };
		}
		case "REMOVE_ITEM": {
			const nextItems = { ...state.items };
			delete nextItems[action.productId];
			return { items: nextItems };
		}
		case "SET_QTY": {
			const quantity = Math.max(0, action.quantity);
			const nextItems = { ...state.items };
			if (quantity === 0) {
				delete nextItems[action.productId];
			} else {
				nextItems[action.productId] = quantity;
			}
			return { items: nextItems };
		}
		case "CLEAR":
			return { items: {} };
		default:
			return state;
	}
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, { items: {} });
	const { productsById } = useProducts();

	// Hydrate from storage once
	useEffect(() => {
		const persisted = localStorageGetItem<CartState | undefined>(STORAGE_KEY, undefined);
		if (
			persisted &&
			persisted.items &&
			typeof persisted.items === "object" &&
			!Array.isArray(persisted.items)
		) {
			dispatch({
				type: "HYDRATE",
				state: { items: persisted.items as Record<string, number> },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Persist to storage
	useEffect(() => {
		localStorageSetItem<CartState>(STORAGE_KEY, state);
	}, [state]);

	const computed = useMemo(() => {
		const itemsDetailed = Object.entries(state.items)
			.map(([productId, quantity]) => {
				const product = (productsById as Record<string, Product>)[productId];
				if (!product) return undefined;
				const lineTotal = product.price * quantity;
				return { product, quantity, lineTotal };
			})
			.filter(Boolean) as { product: Product; quantity: number; lineTotal: number }[];

		const totals = itemsDetailed.reduce(
			(acc, li) => {
				acc.itemCount += li.quantity;
				acc.subtotal += li.lineTotal;
				return acc;
			},
			{ itemCount: 0, subtotal: 0 }
		);

		return { items: itemsDetailed, totals };
	}, [productsById, state.items]);

	const value = useMemo<CartContextValue>(
		() => ({
			state,
			computed,
			addItem: (productId: string, quantity = 1) =>
				dispatch({ type: "ADD_ITEM", productId, quantity }),
			removeItem: (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
			setQuantity: (productId: string, quantity: number) =>
				dispatch({ type: "SET_QTY", productId, quantity }),
			clear: () => dispatch({ type: "CLEAR" }),
		}),
		[state, computed]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
