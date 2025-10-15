import React from "react";
import { ProductsProvider } from "./ProductsContext";
import { UpgradesProvider } from "./UpgradesContext";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "../components/common/Toast/Toast";

export default function DataProvider({ children }: { children: React.ReactNode }) {
    return (
		<ProductsProvider>
			<UpgradesProvider>
				<CartProvider>
					<ToastProvider>{children}</ToastProvider>
				</CartProvider>
			</UpgradesProvider>
		</ProductsProvider>
	);
}


