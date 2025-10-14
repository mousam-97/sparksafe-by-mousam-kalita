import type { ReactNode } from "react";
export type NavigationItem = {
	path: string;
	label: string;
	icon?: ReactNode;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
	rating?: number;
	reviewsCount?: number;
};

export type PlanItem = {
	id: string;
	title: string;
	description: string;
	score: number;
};


