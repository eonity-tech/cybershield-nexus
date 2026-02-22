import React, { useState } from "react";
import type { ChartData } from "chart.js";
import Switch from "../../atoms/Switch/Switch";
import Chart from "../../atoms/Chart/Chart";
import "./SwitchDonut.scss";

export interface SwitchDonutProps {
	/** Titre affiché au-dessus du graphique */
	title: string;
	/** Label gauche du switch */
	leftLabel: string;
	/** Label droit du switch */
	rightLabel: string;
	/** Données Chart.js pour l'état de gauche (Trafic) */
	leftData: ChartData<"doughnut">;
	/** Données Chart.js pour l'état de droite (Appareils) */
	rightData: ChartData<"doughnut">;
	/** Hauteur du conteneur du graphique (défaut: 25vh) */
	height?: string | number;
}

const SwitchDonut: React.FC<SwitchDonutProps> = ({
	title,
	leftLabel,
	rightLabel,
	leftData,
	rightData,
	height = "25vh",
}) => {
	// false = leftData (Trafic), true = rightData (Appareils)
	const [isRightSelected, setIsRightSelected] = useState(false);

	const currentData = isRightSelected ? rightData : leftData;

	return (
		<div className="switch-donut-molecule">
			<div className="switch-donut-header">
				<h3 className="switch-donut-title">{title}</h3>
				<Switch
					checked={isRightSelected}
					onChange={setIsRightSelected}
					leftLabel={leftLabel}
					rightLabel={rightLabel}
				/>
			</div>

			<div className="switch-donut-body">
				<Chart
					type="doughnut"
					data={currentData}
					height={height}
					options={{
						cutout: "65%",
						plugins: {
							legend: {
								position: "right",
							},
						},
					}}
				/>
			</div>
		</div>
	);
};

export default SwitchDonut;
