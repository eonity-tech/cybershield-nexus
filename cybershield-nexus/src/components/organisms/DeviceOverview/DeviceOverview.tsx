import { useEffect, useState } from "react";
import Chart from "../../atoms/Chart/Chart";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import { getAllDevices } from "../../../services/device.service";
import type { Device } from "../../../models/Device";
import "./DeviceOverview.scss";

const DeviceOverview = () => {
	const [devices, setDevices] = useState<Device[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
            try {
                // Simulation de latence pour voir les Skeletons
				// await new Promise(resolve => setTimeout(resolve, 2000));

				const data = await getAllDevices();
				setDevices(data);
			} catch (error) {
				console.error("Erreur DeviceOverview:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const getPortStats = () => {
		const portCounts: { [key: string]: number } = {};
		devices.forEach((device) => {
			if (device.openPorts) {
				const ports = device.openPorts.split(",").map((p) => p.trim());
				ports.forEach((port) => {
					if (port) portCounts[port] = (portCounts[port] || 0) + 1;
				});
			}
		});

		const sortedPorts = Object.entries(portCounts)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 5);

		return {
			labels: sortedPorts.map(([port]) => `Port ${port}`),
			datasets: [
				{
					label: "Appareils exposés",
					data: sortedPorts.map(([, count]) => count),
					backgroundColor: "#734dce",
					borderRadius: 6,
				},
			],
		};
	};

	// --- Skeleton Loading ---
	if (loading) {
		return (
			<div className="chart-container bar-chart">
				<Skeleton width="20vw" height="4vh" className="mb-4" />
				<Skeleton variant="rectangular" width="100%" height="25vh" />
			</div>
		);
	}

	return (
		<div className="chart-container bar-chart">
			<h3>Analyse des Ports Visés</h3>
			<Chart type="bar" data={getPortStats()} height="25vh" />
		</div>
	);
};

export default DeviceOverview;
