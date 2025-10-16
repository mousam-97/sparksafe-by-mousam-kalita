import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Icon from "../../components/icons/Icon";
import Text from "../../components/common/Text/Text";
import Row, { Space } from "../../components/common/Grid/Grid";
import stylesFilters from "./MarketplaceFilters.module.css";
import type { ProductMap } from "../../types";
import { formatCurrency } from "../../utils/CurrencyUtils";

type MarketplaceFiltersProps = {
	productsById: ProductMap;
	allProductIds: string[];
	children: (filteredIds: string[]) => React.ReactNode;
};

export default function MarketplaceFilters({
	productsById,
	allProductIds,
	children,
}: MarketplaceFiltersProps) {
	const [params, setParams] = useSearchParams();

	const [filtersOpen, setFiltersOpen] = useState(false);

	const search = params.get("q") ?? "";
	const priceMinStr = params.get("priceMin");
	const priceMaxStr = params.get("priceMax");
	const priceMin = priceMinStr ? Number(priceMinStr) : undefined;
	const priceMax = priceMaxStr ? Number(priceMaxStr) : undefined;
	const approval = params.get("approval") ?? ""; // approved | pending | rejected
	const brand = params.get("brand") ?? "";

	const [allMinPrice, allMaxPrice] = useMemo(() => {
		const prices = allProductIds
			.map((id) => productsById[id]?.price)
			.filter((v): v is number => typeof v === "number" && !Number.isNaN(v));
		if (!prices.length) return [0, 0] as const;
		return [Math.min(...prices), Math.max(...prices)] as const;
	}, [allProductIds, productsById]);

	const currentMin =
		typeof priceMin === "number" && !Number.isNaN(priceMin) ? priceMin : allMinPrice;
	const currentMax =
		typeof priceMax === "number" && !Number.isNaN(priceMax) ? priceMax : allMaxPrice;

	// Local draft state for filters (Apply to commit)
	const [draftSearch, setDraftSearch] = useState<string>(search);
	const [draftMin, setDraftMin] = useState<number>(currentMin);
	const [draftMax, setDraftMax] = useState<number>(currentMax);
	const [draftApproval, setDraftApproval] = useState<string>(approval);
	const [draftBrand, setDraftBrand] = useState<string>(brand);

	// Sync drafts when URL params change (external changes or initial mount)
	useEffect(() => {
		setDraftSearch(search);
	}, [search]);

	useEffect(() => {
		setDraftMin(currentMin);
	}, [currentMin]);
	useEffect(() => {
		setDraftMax(currentMax);
	}, [currentMax]);
	useEffect(() => {
		setDraftApproval(approval);
	}, [approval]);
	useEffect(() => {
		setDraftBrand(brand);
	}, [brand]);

	const setParam = (updates: Record<string, string | number | boolean | undefined>) => {
		const next = new URLSearchParams(params.toString());
		Object.entries(updates).forEach(([k, v]) => {
			if (v === undefined || v === null || v === "") {
				next.delete(k);
			} else {
				next.set(k, String(v));
			}
		});
		setParams(next, { replace: false });
	};

	const filteredIds = useMemo(() => {
		const ids = allProductIds.filter((id) => {
			const p = productsById[id];
			if (!p) return false;
			if (search) {
				const q = search.toLowerCase();
				const hay = `${p.name} ${p.description ?? ""}`.toLowerCase();
				if (!hay.includes(q)) return false;
			}
			if (typeof priceMin === "number" && !Number.isNaN(priceMin) && p.price < priceMin) {
				return false;
			}
			if (typeof priceMax === "number" && !Number.isNaN(priceMax) && p.price > priceMax) {
				return false;
			}
			if (approval) {
				if (p.approvalStatus !== approval) return false;
			}
			if (brand) {
				const pb = p.brand ? String(p.brand).toLowerCase() : "";
				if (!pb.includes(brand.toLowerCase())) return false;
			}
			return true;
		});
		return ids;
	}, [allProductIds, productsById, search, priceMin, priceMax, approval, brand]);

	return (
		<>
			<Row justify="between" gap={2}>
				<div className={stylesFilters.searchWrapper}>
					<input
						className={stylesFilters.searchInput}
						placeholder="Search for products"
						value={draftSearch}
						onChange={(e) => setDraftSearch(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setParam({ q: draftSearch || undefined });
							}
						}}
					/>
					<Button
						variant="secondary"
						className={stylesFilters.searchButton}
						aria-label="Search"
						onClick={() => setParam({ q: draftSearch || undefined })}
						type="button"
					>
						<Icon name="search" size={20} />
					</Button>
				</div>
				<Button
					variant="secondary"
					aria-label="Filters"
					onClick={() => setFiltersOpen((v) => !v)}
				>
					Filters
				</Button>
			</Row>

			{filtersOpen ? (
				<>
					<Space vertical size={1} />
					<Card>
						<div
							style={{
								// compute CSS vars for track fill
								// avoid divide-by-zero
								["--minPercent" as any]: `${
									((draftMin - allMinPrice) /
										Math.max(1, allMaxPrice - allMinPrice)) *
									100
								}%`,
								["--maxPercent" as any]: `${
									((draftMax - allMinPrice) /
										Math.max(1, allMaxPrice - allMinPrice)) *
									100
								}%`,
							}}
						>
							<Text as="div" boldness="bold">
								Price
							</Text>
							<Space vertical size={1} />
							<div className={stylesFilters.priceBadge}>
								{formatCurrency(draftMin)} – {formatCurrency(draftMax)}
								{draftMax >= allMaxPrice ? "+" : ""}
							</div>
							<div className={stylesFilters.rangeWrapper}>
								<div className={stylesFilters.rangeTrack} />
								<div className={stylesFilters.rangeFill} />
								<input
									className={stylesFilters.range}
									type="range"
									min={allMinPrice}
									max={draftMax}
									step={1}
									value={draftMin}
									onChange={(e) => {
										const next = Number(e.target.value);
										// Ensure min does not exceed current draftMax
										setDraftMin(Math.min(next, draftMax));
									}}
								/>
								<input
									className={stylesFilters.range}
									type="range"
									min={draftMin}
									max={allMaxPrice}
									step={1}
									value={draftMax}
									onChange={(e) => {
										const next = Number(e.target.value);
										// Ensure max is not below current draftMin
										setDraftMax(Math.max(next, draftMin));
									}}
								/>
							</div>
							<Space />
							<Row align="center">
								<Text as="span" boldness="bold">
									Approval:
								</Text>
								<Space size={1} />
								<select
									value={draftApproval}
									onChange={(e) => setDraftApproval(e.target.value)}
								>
									<option value="">Any</option>
									<option value="approved">Approved</option>
									<option value="pending">Pending</option>
									<option value="rejected">Rejected</option>
								</select>
							</Row>
							<Space vertical size={1} />
							<Row align="center">
								<Text as="span" boldness="bold">
									Brand:
								</Text>
								<Space size={1} />
								<input
									type="text"
									placeholder="Brand"
									value={draftBrand}
									onChange={(e) => setDraftBrand(e.target.value)}
								/>
							</Row>
							<Space />
							<Row justify="end">
								<Button
									variant="ghost"
									onClick={() => {
										const safeMin = Math.min(draftMin, draftMax);
										const safeMax = Math.max(draftMin, draftMax);
										setParam({
											priceMin: safeMin,
											priceMax: safeMax,
											approval: draftApproval || undefined,
											brand: draftBrand || undefined,
										});
										setFiltersOpen(false);
									}}
								>
									Apply
								</Button>
							</Row>
						</div>
					</Card>
				</>
			) : null}

			<Space vertical size={1} />
			{children(filteredIds)}
		</>
	);
}
