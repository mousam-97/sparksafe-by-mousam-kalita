import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";
import cx from "classnames";
import Icon from "../../icons/Icon";

export default function BottomNav() {
	const navItems: {
		label: string;
		to: string;
		end?: boolean;
		iconName: "dashboard" | "store" | "user" | "cart";
	}[] = [
		{ label: "Dashboard", to: "/", end: true, iconName: "dashboard" },
		{ label: "Store", to: "/marketplace", iconName: "store" },
		{ label: "Profile", to: "/profile", iconName: "user" },
		{ label: "Cart", to: "/cart", iconName: "cart" },
	];

	return (
		<nav className={styles.bar} aria-label="Main">
			{navItems.map(({ label, to, end, iconName }) => (
				<NavLink
					key={to}
					to={to}
					end={!!end}
					className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}
				>
					<span aria-hidden>
						<Icon name={iconName} />
					</span>
					<span>{label}</span>
				</NavLink>
			))}
		</nav>
	);
}
