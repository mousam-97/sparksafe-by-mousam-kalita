import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import styles from "./Toast.module.css";

type Toast = { id: number; message: string; variant?: "success" | "default" };

type ToastContextValue = {
	showToast: (message: string, variant?: "success" | "default") => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = useCallback((message: string, variant: "success" | "default" = "default") => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, { id, message, variant }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 2500);
	}, []);

	const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className={styles.container} aria-live="polite" aria-atomic="true">
				{toasts.map((t) => (
					<div key={t.id} className={`${styles.toast} ${t.variant === "success" ? styles.success : ""}`}>
						{t.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}


