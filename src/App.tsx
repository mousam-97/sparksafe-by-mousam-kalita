import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/Marketplace/Marketplace";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import BottomNav from "./components/layout/BottomNav/BottomNav";
import TopNav from "./components/layout/TopNav/TopNav";
import "./styles/globals.css";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
	return (
		<BrowserRouter>
			<TopNav />
			<ErrorBoundary>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/marketplace" element={<Marketplace />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ErrorBoundary>
			<BottomNav />
		</BrowserRouter>
	);
}
