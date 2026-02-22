import React, { useEffect, useState } from "react";
import type { ChartData } from "chart.js";
import SwitchDonut from "../../molecules/SwitchDonut/SwitchDonut";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import { getAllTraffic } from "../../../services/network.service";
import { getAllDevices } from "../../../services/device.service";
import "./SecurityOverview.scss";

const SecurityOverview: React.FC = () => {
	const [networkData, setNetworkData] =
		useState<ChartData<"doughnut"> | null>(null);
	const [deviceData, setDeviceData] = useState<ChartData<"doughnut"> | null>(
		null,
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchThreatData = async () => {
			try {
				setLoading(true);
				const [traffic, devices] = await Promise.all([
					getAllTraffic(),
					getAllDevices(),
				]);

				let netSains = 0,
					netEleves = 0,
					netCritiques = 0;
				traffic.forEach((t: any) => {
					if (t.statusCode === 1) netCritiques++;
					else if (t.statusCode === 2) netEleves++;
					else netSains++;
				});

				let devSains = 0,
					devEleves = 0,
					devCritiques = 0;
				devices.forEach((d: any) => {
					if (d.vulnerabilityLevel === "CRITICAL") devCritiques++;
					else if (d.vulnerabilityLevel === "HIGH") devEleves++;
					else devSains++;
				});

				// 3. Préparation commune pour Chart.js
				const labels = ["Sains", "Élevé", "Critiques"];
				const backgroundColors = ["#22c55e", "#f59e0b", "#ef4444"];

				setNetworkData({
					labels,
					datasets: [
						{
							data: [netSains, netEleves, netCritiques],
							backgroundColor: backgroundColors,
							borderWidth: 0,
						},
					],
				});

				setDeviceData({
					labels,
					datasets: [
						{
							data: [devSains, devEleves, devCritiques],
							backgroundColor: backgroundColors,
							borderWidth: 0,
						},
					],
				});
			} catch (error) {
				console.error(
					"Erreur de chargement du widget de menaces :",
					error,
				);
			} finally {
				setLoading(false);
			}
		};

		fetchThreatData();
	}, []);

	if (loading || !networkData || !deviceData) {
		return (
			<div className="security-overview is-loading">
				<div className="widget-skeleton-header">
					<Skeleton width="200px" height="28px" />
					<Skeleton
						width="120px"
						height="32px"
						style={{ borderRadius: "20px" }}
					/>
				</div>
				<div className="widget-skeleton-body">
					<Skeleton variant="circular" width="220px" height="220px" />
				</div>
			</div>
		);
	}

	return (
		<div className="chart-container bar-chart">
			<SwitchDonut
				title="Répartition des Menaces"
				leftLabel="Trafic"
				rightLabel="Appareils"
				leftData={networkData}
				rightData={deviceData}
			/>
		</div>
	);
};

export default SecurityOverview;
