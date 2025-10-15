import React from "react";
import { ProductsProvider } from "./ProductsContext";
import { UpgradesProvider } from "./UpgradesContext";
import { CartProvider } from "./CartContext";

export default function DataProvider({ children }: { children: React.ReactNode }) {
    return (
        <ProductsProvider>
            <UpgradesProvider>
                <CartProvider>{children}</CartProvider>
            </UpgradesProvider>
        </ProductsProvider>
    );
}


