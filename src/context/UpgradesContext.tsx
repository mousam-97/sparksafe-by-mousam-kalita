import React, { createContext, useContext, useMemo, useCallback, useState } from "react";
import upgradesData from "../data/upgrades.json";
import type { Upgradable, UpgradableMap } from "../types";

type UpgradesContextValue = {
	upgradesById: UpgradableMap;
	allUpgradeIds: string[]; // sorted list used for rendering
	completedById: Record<string, boolean>;
	totalScore: number; // sum of all scoreGain
	progress: number; // 0-100
	toggleComplete: (id: string) => void;
	markComplete: (id: string) => void;
};

const UpgradesContext = createContext<UpgradesContextValue | undefined>(undefined);

// adapts upgrades.json into a map of Upgradable keyed by id
function mapJsonToUpgradablesMap(): { upgradesById: UpgradableMap; allUpgradeIds: string[] } {
	const entries: [string, Upgradable][] = upgradesData.map((u: any) => {
		const upgradable: Upgradable = {
			id: String(u.id),
			title: u.task,
			description: u.description,
			details: u.details,
			scoreGain: Number(u.resiliencyScoreGain),
			emoji: u.emoji,
			estimatedCost: u.estimatedCost,
			estimatedDifficulty: u.estimatedDifficulty,
			sortOrder: typeof u.sortOrder === "number" ? u.sortOrder : undefined,
		};
		return [upgradable.id, upgradable];
	});
	const upgradesById: UpgradableMap = Object.fromEntries(entries);
	const allUpgradeIds = entries.map(([id]) => id);
	return { upgradesById, allUpgradeIds };
}

export function UpgradesProvider({ children }: { children: React.ReactNode }) {
	const { upgradesById, allUpgradeIds } = useMemo(() => mapJsonToUpgradablesMap(), []);

	const [completedById, setCompletedById] = useState<Record<string, boolean>>({});

	const totalScore = useMemo(() => {
		return allUpgradeIds.reduce((sum, id) => sum + (upgradesById[id]?.scoreGain ?? 0), 0);
	}, [allUpgradeIds, upgradesById]);

	const completedScore = useMemo(() => {
		return Object.entries(completedById).reduce((sum, [id, done]) => {
			if (!done) return sum;
			const sg = upgradesById[id]?.scoreGain ?? 0;
			return sum + sg;
		}, 0);
	}, [completedById, upgradesById]);

	const progress = useMemo(() => {
		if (totalScore <= 0) return 0;
		return Math.min(100, Math.round((completedScore / totalScore) * 100));
	}, [completedScore, totalScore]);

	const toggleComplete = useCallback((id: string) => {
		setCompletedById((prev) => ({ ...prev, [id]: !prev[id] }));
	}, []);

	const markComplete = useCallback((id: string) => {
		setCompletedById((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
	}, []);

	// Provide a sorted list of IDs. Incomplete first; then by sortOrder asc; then by score desc.
	const sortedIds = useMemo(() => {
		const ids = [...allUpgradeIds];
		ids.sort((a, b) => {
			const aDone = !!completedById[a];
			const bDone = !!completedById[b];
			if (aDone !== bDone) return aDone ? 1 : -1; // incomplete first
			const aOrder = upgradesById[a]?.sortOrder ?? Number.MAX_SAFE_INTEGER;
			const bOrder = upgradesById[b]?.sortOrder ?? Number.MAX_SAFE_INTEGER;
			if (aOrder !== bOrder) return aOrder - bOrder;
			const aScore = upgradesById[a]?.scoreGain ?? 0;
			const bScore = upgradesById[b]?.scoreGain ?? 0;
			return bScore - aScore;
		});
		return ids;
	}, [allUpgradeIds, completedById, upgradesById]);

	const value = useMemo<UpgradesContextValue>(
		() => ({
			upgradesById,
			allUpgradeIds: sortedIds,
			completedById,
			totalScore,
			progress,
			toggleComplete,
			markComplete,
		}),
		[upgradesById, sortedIds, completedById, totalScore, progress, toggleComplete, markComplete]
	);
	return <UpgradesContext.Provider value={value}>{children}</UpgradesContext.Provider>;
}

export function useUpgrades() {
	const ctx = useContext(UpgradesContext);
	if (!ctx) throw new Error("useUpgrades must be used within UpgradesProvider");
	return ctx;
}
