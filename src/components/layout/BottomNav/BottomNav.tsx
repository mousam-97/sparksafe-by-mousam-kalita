import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";
import cx from "classnames";
import Icon from "../../icons/Icon";
import { navItems } from "../navItems";
import { useCart } from "../../../context/CartContext";

export default function BottomNav() {
	const { computed } = useCart();
	const uniqueCount = computed.items.length;
	return (
		<nav className={styles.bar} aria-label="Main navigation">
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
					{iconName === "cart" && uniqueCount > 0 ? (
						<span
							className={styles.cartBadge}
							aria-label={`Cart has ${uniqueCount} items`}
						>
							{uniqueCount}
						</span>
					) : null}
				</NavLink>
			))}
		</nav>
	);
}
