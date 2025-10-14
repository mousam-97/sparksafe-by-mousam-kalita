import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/Marketplace/Marketplace";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import BottomNav from "./components/layout/BottomNav/BottomNav";
import "./styles/globals.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/marketplace" element={<Marketplace />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
			<BottomNav />
		</BrowserRouter>
	);
}
