import React, { useEffect } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children?: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		if (open) document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;
	return (
		<div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export function ModalHeader({ children }: { children?: React.ReactNode }) {
	return <div className={styles.header}>{children}</div>;
}

export function ModalFooter({ children }: { children?: React.ReactNode }) {
	return <div className={styles.footer}>{children}</div>;
}


