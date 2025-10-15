import React, { createContext, useContext, useMemo } from "react";
import upgradesData from "../data/upgrades.json";
import type { Upgradable, UpgradableMap } from "../types";

type UpgradesContextValue = {
	upgradesById: UpgradableMap;
	allUpgradeIds: string[];
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
			estimatedCost: u.estimatedCost,
			estimatedDifficulty: u.estimatedDifficulty,
		};
		return [upgradable.id, upgradable];
	});
	const upgradesById: UpgradableMap = Object.fromEntries(entries);
	const allUpgradeIds = entries.map(([id]) => id);
	return { upgradesById, allUpgradeIds };
}

export function UpgradesProvider({ children }: { children: React.ReactNode }) {
	const { upgradesById, allUpgradeIds } = useMemo(() => mapJsonToUpgradablesMap(), []);

	const value = useMemo<UpgradesContextValue>(() => ({ upgradesById, allUpgradeIds }), [upgradesById, allUpgradeIds]);
	return <UpgradesContext.Provider value={value}>{children}</UpgradesContext.Provider>;
}

export function useUpgrades() {
	const ctx = useContext(UpgradesContext);
	if (!ctx) throw new Error("useUpgrades must be used within UpgradesProvider");
	return ctx;
}
