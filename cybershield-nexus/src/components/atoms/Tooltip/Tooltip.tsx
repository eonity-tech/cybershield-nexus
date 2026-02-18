import React, { useState, useRef, useEffect } from "react";
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
	const tooltipRef = useRef<HTMLDivElement>(null);
	let timeout: NodeJS.Timeout;

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
		timeout = setTimeout(() => setActive(true), delay);
	};

	const hideTip = () => {
		if (showOnClick) return;
		clearTimeout(timeout);
		setActive(false);
	};

	const toggleTip = () => {
		if (showOnClick) setActive(!active);
	};

	return (
		<div
			ref={tooltipRef}
			className={`nexus-tooltip-wrapper ${showOnClick ? "clickable" : "helpable"}`}
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
			onClick={toggleTip}>
			{children}
			{active && (
				<div className={`nexus-tooltip-tip ${position}`}>{content}</div>
			)}
		</div>
	);
};

export default Tooltip;
