export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function localStorageGetItem<T>(key: string, defaultValue: T, storage: StorageLike = window.localStorage): T {
	try {
		const raw = storage.getItem(key);
		if (raw == null) return defaultValue;
		return JSON.parse(raw) as T;
	} catch {
		return defaultValue;
	}
}

export function localStorageSetItem<T>(key: string, value: T, storage: StorageLike = window.localStorage): void {
	try {
		storage.setItem(key, JSON.stringify(value));
	} catch {}
}

export function localStorageRemoveItem(key: string, storage: StorageLike = window.localStorage): void {
	try {
		storage.removeItem(key);
	} catch {}
}


