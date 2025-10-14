import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
	return (
		<nav className={styles.bar} aria-label="Main">
			<NavLink to="/" end className={({ isActive }) => [styles.item, isActive ? styles.active : undefined].filter(Boolean).join(" ")}>Dashboard</NavLink>
			<NavLink to="/marketplace" className={({ isActive }) => [styles.item, isActive ? styles.active : undefined].filter(Boolean).join(" ")}>Marketplace</NavLink>
			<NavLink to="/profile" className={({ isActive }) => [styles.item, isActive ? styles.active : undefined].filter(Boolean).join(" ")}>Profile</NavLink>
			<NavLink to="/cart" className={({ isActive }) => [styles.item, isActive ? styles.active : undefined].filter(Boolean).join(" ")}>Cart</NavLink>
		</nav>
	);
}


