import React from "react";

export type SvgIconName = "dashboard" | "store" | "user" | "cart" | "arrowLeft" | "search";

type BaseProps = { size?: number; className?: string };

export const svgIcons: Record<SvgIconName, (props?: BaseProps) => React.ReactNode> = {
	dashboard: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
		</svg>
	),
	store: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<path d="M3 7h18l-1.5 4.5a3 3 0 0 1-2.82 2H7.32A3 3 0 0 1 4.5 11.5L3 7z" />
			<path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
			<path d="M8 21v-6h8v6" />
		</svg>
	),
	user: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<circle cx="12" cy="8" r="4" />
			<path d="M4 21a8 8 0 0 1 16 0" />
		</svg>
	),
	cart: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<circle cx="9" cy="20" r="1.5" />
			<circle cx="18" cy="20" r="1.5" />
			<path d="M5 5h2l1 7h9l2-6H7" />
		</svg>
	),
	arrowLeft: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<polyline points="15 18 9 12 15 6" />
			<line x1="9" y1="12" x2="21" y2="12" />
		</svg>
	),
	search: ({ size = 24, className }: BaseProps = {}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			className={className}
		>
			<circle cx="11" cy="11" r="7" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
	),
};


