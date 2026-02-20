import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.scss";

interface TooltipProps {
	content: string;
	children: React.ReactNode;
	position?: "top" | "bottom" | "left" | "right";
	delay?: number;
	showOnClick?: boolean;
}

const Tooltip = ({
	content,
	children,
	position = "top",
	delay = 200,
	showOnClick = false,
}: TooltipProps) => {
	const [active, setActive] = useState(false);
	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	const tooltipRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	// 1. Calcul des coordonnées isolé dans un useCallback pour l'utiliser partout
	const updateCoords = useCallback(() => {
		if (tooltipRef.current) {
			const rect = tooltipRef.current.getBoundingClientRect();
			setCoords({
				top: rect.top + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
				height: rect.height,
			});
		}
	}, []);

	// 2. Écoute du scroll et resize pour recalculer la position en temps réel
	useEffect(() => {
		if (active) {
			window.addEventListener("scroll", updateCoords, true);
			window.addEventListener("resize", updateCoords);
			return () => {
				window.removeEventListener("scroll", updateCoords, true);
				window.removeEventListener("resize", updateCoords);
			};
		}
	}, [active, updateCoords]);

	// 3. Cleanup du timeout si le composant est démonté (évite les fuites de mémoire)
	useEffect(() => {
		return () => clearTimeout(timeoutRef.current);
	}, []);

	// Gestion de l'extérieur du composant
	useEffect(() => {
		if (!showOnClick) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node)
			) {
				setActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [showOnClick]);

	const showTip = () => {
		if (showOnClick) return;
		timeoutRef.current = setTimeout(() => {
			updateCoords();
			setActive(true);
		}, delay);
	};

	const hideTip = () => {
		if (showOnClick) return;
		clearTimeout(timeoutRef.current);
		setActive(false);
	};

	const toggleTip = () => {
		if (showOnClick) {
			if (!active) updateCoords();
			setActive(!active);
		}
	};

	// Calcul du style du tooltip en fonction de la position et des coordonnées
	const getPortalStyle = (): React.CSSProperties => {
		const gap = 8;
		const { top, left, width, height } = coords;

		const positionMap = {
			top: {
				top: top - gap,
				left: left + width / 2,
				transform: "translate(-50%, -100%)",
			},
			bottom: {
				top: top + height + gap,
				left: left + width / 2,
				transform: "translate(-50%, 0)",
			},
			left: {
				top: top + height / 2,
				left: left - gap,
				transform: "translate(-100%, -50%)",
			},
			right: {
				top: top + height / 2,
				left: left + width + gap,
				transform: "translate(0, -50%)",
			},
		};

		return {
			position: "absolute",
			zIndex: 999999,
			...positionMap[position],
		};
	};

	return (
		<>
			<div
				ref={tooltipRef}
				className={`nexus-tooltip-wrapper ${showOnClick ? "clickable" : "helpable"}`}
				onMouseEnter={showTip}
				onMouseLeave={hideTip}
				onClick={toggleTip}
				onFocus={showTip}
				onBlur={hideTip}
				style={{ display: "inline-flex", alignItems: "center" }}>
				{children}
			</div>

			{active &&
				createPortal(
					<div
						role="tooltip" /* Accessibilité */
						className={`nexus-tooltip-tip ${position}`}
						style={getPortalStyle()}>
						{content}
					</div>,
					document.body,
				)}
		</>
	);
};

export default Tooltip;
