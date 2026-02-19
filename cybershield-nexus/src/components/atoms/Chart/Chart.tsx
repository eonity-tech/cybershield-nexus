import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip as ChartTooltip,
	Legend,
	Filler,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import "./Chart.scss";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	ChartTooltip,
	Legend,
	Filler,
);

export type ChartType = "line" | "bar" | "doughnut" | "pie";

interface ChartProps {
	type: ChartType;
	data: ChartData<ChartType>;
	options?: ChartOptions<ChartType>;
	height?: string | number;
}

const Chart = ({ type, data, options, height = "300px" }: ChartProps) => {
	const defaultOptions: ChartOptions<any> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					color: "#cbd5e1",
					font: { family: "'Inter', sans-serif" },
				},
				position: "bottom",
			},
			tooltip: {
				backgroundColor: "rgba(15, 23, 42, 0.9)",
				titleColor: "#f8fafc",
				bodyColor: "#cbd5e1",
				borderColor: "rgba(255, 255, 255, 0.1)",
				borderWidth: 1,
			},
		},
		scales:
			type !== "doughnut" && type !== "pie"
				? {
						x: {
							grid: { color: "rgba(255, 255, 255, 0.05)" },
							ticks: { color: "#94a3b8" },
						},
						y: {
							grid: { color: "rgba(255, 255, 255, 0.05)" },
							ticks: { color: "#94a3b8" },
						},
					}
				: undefined,
	};

	const mergedOptions = { ...defaultOptions, ...options };

	return (
		<div className="nexus-chart-container" style={{ height }}>
			{/* pour éviter les problèmes de type */}
			<ReactChart type={type} data={data} options={mergedOptions} />
		</div>
	);
};

export default Chart;
