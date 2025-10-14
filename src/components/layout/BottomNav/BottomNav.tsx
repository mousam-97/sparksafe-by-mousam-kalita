import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";
import cx from "classnames";

export default function BottomNav() {
	return (
		<nav className={styles.bar} aria-label="Main">
			<NavLink
				to="/"
				end
				className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}
			>
				Dashboard
			</NavLink>
			<NavLink
				to="/marketplace"
				className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}
			>
				Marketplace
			</NavLink>
			<NavLink
				to="/profile"
				className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}
			>
				Profile
			</NavLink>
			<NavLink
				to="/cart"
				className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}
			>
				Cart
			</NavLink>
		</nav>
	);
}


