import type { SvgIconName } from "../../components/icons/svg-icons";

export type NavItem = {
    label: string;
    to: string;
    end?: boolean;
    iconName: Extract<SvgIconName, "dashboard" | "store" | "user" | "cart">;
};

export const navItems: NavItem[] = [
    { label: "Dashboard", to: "/", end: true, iconName: "dashboard" },
    { label: "Store", to: "/marketplace", iconName: "store" },
    { label: "Profile", to: "/profile", iconName: "user" },
    { label: "Cart", to: "/cart", iconName: "cart" },
];


