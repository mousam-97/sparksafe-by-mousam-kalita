import React from "react";
import { NavLink } from "react-router-dom";
import Row from "../../common/Grid/Grid";
import Brand from "../../common/Brand/Brand";
import Icon from "../../icons/Icon";
import styles from "./TopNav.module.css";
import cx from "classnames";

export default function TopNav() {
    const navItems: { label: string; to: string; end?: boolean; iconName: "dashboard" | "store" | "user" | "cart" }[] = [
        { label: "Dashboard", to: "/", end: true, iconName: "dashboard" },
        { label: "Store", to: "/marketplace", iconName: "store" },
        { label: "Profile", to: "/profile", iconName: "user" },
        { label: "Cart", to: "/cart", iconName: "cart" },
    ];

    return (
        <nav className={styles.bar} aria-label="Top navigation">
            <Row align="center" justify="between">
                <Brand />
				<Row align="center" gap={3} className={styles.links}>
                    {navItems.map(({ label, to, end, iconName }) => (
                        <NavLink key={to} to={to} end={!!end} className={({ isActive }) => cx(styles.item, { [styles.active]: isActive })}>
                            <Row align="center" gap={1}>
                                <Icon name={iconName} />
                                <span>{label}</span>
                            </Row>
                        </NavLink>
                    ))}
                </Row>
            </Row>
        </nav>
    );
}


