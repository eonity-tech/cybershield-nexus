import React, { useState, useRef, useEffect } from "react";
import "./Select.scss";

export interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	label?: string;
	placeholder?: string;
	options: Option[];
	isMulti?: boolean; // Active le mode "Chips"
	onChange?: (selected: string | string[]) => void;
}

const Select = ({
	label,
	placeholder = "Sélectionner...",
	options,
	isMulti = false,
	onChange,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	// Gestion du clic à l'extérieur pour fermer le menu
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Gestion de la sélection
	const handleSelect = (option: Option) => {
		if (isMulti) {
			// Mode Multi : On ajoute ou on enlève
			const alreadySelected = selectedOptions.find(
				(item) => item.value === option.value,
			);
			let newSelection;

			if (alreadySelected) {
				newSelection = selectedOptions.filter(
					(item) => item.value !== option.value,
				);
			} else {
				newSelection = [...selectedOptions, option];
			}

			setSelectedOptions(newSelection);
			if (onChange) onChange(newSelection.map((i) => i.value));
		} else {
			// Mode Simple : On remplace
			setSelectedOptions([option]);
			setIsOpen(false);
			if (onChange) onChange(option.value);
		}
	};

	// Suppression d'un chip via la petite croix
	const removeOption = (e: React.MouseEvent, value: string) => {
		e.stopPropagation(); // Empêche d'ouvrir/fermer le menu quand on clique sur la croix
		const newSelection = selectedOptions.filter(
			(item) => item.value !== value,
		);
		setSelectedOptions(newSelection);
		if (onChange) onChange(newSelection.map((i) => i.value));
	};

	return (
		<div className="nexus-select-container" ref={containerRef}>
			{label && <label className="nexus-label">{label}</label>}

			{/* La zone qui ressemble à un Input mais contient les Chips */}
			<div
				className={`nexus-select-input ${isOpen ? "active" : ""}`}
				onClick={() => setIsOpen(!isOpen)}>
				<div className="selected-content">
					{selectedOptions.length > 0 ? (
						isMulti ? (
							// Affichage des Chips
							<div className="chips-container">
								{selectedOptions.map((opt) => (
									<span
										key={opt.value}
										className="nexus-chip">
										{opt.label}
										<span
											className="chip-remove"
											onClick={(e) =>
												removeOption(e, opt.value)
											}>
											×
										</span>
									</span>
								))}
							</div>
						) : (
							// Affichage simple
							<span className="single-value">
								{selectedOptions[0].label}
							</span>
						)
					) : (
						<span className="placeholder">{placeholder}</span>
					)}
				</div>

				<div className="arrow-icon">▼</div>
			</div>

			{/* Le menu déroulant */}
			{isOpen && (
				<ul className="nexus-options-list">
					{options.map((option) => {
						const isSelected = selectedOptions.some(
							(s) => s.value === option.value,
						);
						return (
							<li
								key={option.value}
								className={`nexus-option ${isSelected ? "selected" : ""}`}
								onClick={() => handleSelect(option)}>
								{option.label}
								{isSelected && (
									<span className="check-icon">✓</span>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Select;
