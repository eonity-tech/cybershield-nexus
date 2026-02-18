import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import "./Modal.scss";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	size?: "small" | "medium" | "large";
}

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	size = "medium",
}: ModalProps) => {
	// Empêcher le scroll du body quand la modal est ouverte
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="nexus-modal-overlay" onClick={onClose}>
			<div
				className={`nexus-modal-container ${size}`}
				onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans la modal
			>
				<header className="modal-header">
					<h2>{title}</h2>
					<button className="close-btn" onClick={onClose}>
						<FaTimes />
					</button>
				</header>

				<main className="modal-content">{children}</main>

				{footer && <footer className="modal-footer">{footer}</footer>}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
