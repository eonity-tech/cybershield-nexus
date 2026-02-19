import { useEffect, useState } from "react";
import {
	FaServer,
	FaShieldAlt,
	FaNetworkWired,
	FaTimes,
	FaExclamationTriangle,
	FaCheckCircle,
	FaHdd,
} from "react-icons/fa";
import StatCard from "../../molecules/StatCard/StatCard";
import Table from "../../atoms/Table/Table";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Chart from "../../atoms/Chart/Chart";
import { getAllTraffic } from "../../../services/network.service";
import type { NetworkTraffic } from "../../../models/NetworkTraffic";
import Tooltip from "../../atoms/Tooltip/Tooltip";
import "./DashboardOverview.scss";

type SectionType = "devices" | "threats" | "bandwidth" | null;

const DashboardOverview = () => {
	const [trafficData, setTrafficData] = useState<NetworkTraffic[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeSection, setActiveSection] = useState<SectionType>(null);
	const [searchTerm, setSearchTerm] = useState("");

	// --- COLONNES ---
	const commonColumns = [
		{
			header: "Machine",
			key: "hostname",
			render: (item: NetworkTraffic) => (
				<div className="table-machine-cell">
					<FaHdd className="machine-icon" />
					<span>{item.hostname}</span>
				</div>
			),
		},
		{ header: "IP Address", key: "ipAddress" },
		{
			header: "Statut",
			key: "statusCode",
			render: (item: NetworkTraffic) => {
				let statusClass = "healthy";
				let Icon = FaCheckCircle;
				let label = "Sain";

				if (item.statusCode === 1) {
					statusClass = "critical";
					Icon = FaExclamationTriangle;
					label = "Critique";
				} else if (item.statusCode === 2) {
					statusClass = "warning";
					Icon = FaExclamationTriangle;
					label = "Attention";
				}

				return (
					<Tooltip content={item.message} position="left" delay={100}>
						<div className={`status-badge ${statusClass}`}>
							<Icon className="status-icon" />
							<span>{label}</span>
						</div>
					</Tooltip>
				);
			},
		},
	];

	const bandwidthColumns = [
		{ header: "Hostname", key: "hostname" },
		{
			header: "Usage",
			key: "currentUsage",
			render: (item: NetworkTraffic) => (
				<div className="usage-cell">
					<FaNetworkWired className="usage-icon" />
					<span>{`${(item.currentUsage / 1024 / 1024).toFixed(2)} MB`}</span>
				</div>
			),
		},
	];

	// --- FETCH ---
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllTraffic();
				setTrafficData(data);
			} catch (error) {
				console.error("Erreur fetch dashboard", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleToggleSection = (section: SectionType) => {
		setActiveSection(activeSection === section ? null : section);
		setSearchTerm("");
	};

	// --- LOGIQUE DE CALCULS ---
	const totalMbNumber =
		trafficData.reduce((acc, curr) => acc + curr.currentUsage, 0) /
		1024 /
		1024;

	const threats = trafficData.filter(
		(t) => t.statusCode === 1 || t.statusCode === 2,
	);
	const criticalCount = trafficData.filter((t) => t.statusCode === 1).length;
	const warningCount = trafficData.filter((t) => t.statusCode === 2).length;
	const healthyCount = trafficData.filter((t) => t.statusCode === 3).length;

	// --- FILTRAGE (Unique et complet) ---
	const getFilteredData = (dataToFilter: NetworkTraffic[]) => {
		if (!searchTerm) return dataToFilter;
		const lowerTerm = searchTerm.toLowerCase();
		return dataToFilter.filter((item) => {
			const statusText =
				item.statusCode === 1
					? "critique"
					: item.statusCode === 2
						? "attention"
						: "sain";

			return (
				item.hostname.toLowerCase().includes(lowerTerm) ||
				item.ipAddress.toLowerCase().includes(lowerTerm) ||
				statusText.includes(lowerTerm)
			);
		});
	};

	// --- DATA GRAPHIQUES ---
	const threatChartData = {
		labels: ["Sains", "Attention (High)", "Critiques"],
		datasets: [
			{
				data: [healthyCount, warningCount, criticalCount],
				backgroundColor: [
					"rgba(34, 197, 94, 0.8)",
					"rgba(245, 158, 11, 0.8)",
					"rgba(239, 68, 68, 0.8)",
				],
				borderColor: "#0f172a",
				borderWidth: 2,
			},
		],
	};

	const bandwidthChartData = {
		labels: ["-60m", "-50m", "-40m", "-30m", "-20m", "-10m", "Maintenant"],
		datasets: [
			{
				label: "Trafic Global (MB/s)",
				data: [150, 180, 160, 850, 200, 190, totalMbNumber],
				borderColor: "#3b82f6",
				backgroundColor: "rgba(59, 130, 246, 0.2)",
				fill: true,
				tension: 0.4,
			},
		],
	};

	if (loading)
		return <div className="loading-state">Analyse du réseau Nexus...</div>;

	return (
		<div className="nexus-dashboard-overview">
			<div className="dashboard-charts-row">
				<div className="chart-container line-chart">
					<h3>Bande Passante (Dernière Heure)</h3>
					<Chart
						type="line"
						data={bandwidthChartData}
						height="250px"
					/>
				</div>

				<div className="chart-container doughnut-chart">
					<h3>Répartition des Menaces</h3>
					<Chart
						type="doughnut"
						data={threatChartData}
						height="250px"
					/>
				</div>
			</div>

			<h2 className="section-title">Points de Contrôle</h2>

			<div className="stats-grid">
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("devices")}>
					<StatCard
						label="Appareils Connectés"
						value={trafficData.length.toString()}
						icon={<FaServer />}
						iconColor="blue"
						status="Opérationnel"
					/>
				</div>
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("threats")}>
					<StatCard
						label="Menaces Détectées"
						value={threats.length.toString()}
						icon={<FaShieldAlt />}
						iconColor={threats.length > 0 ? "red" : "green"}
						status={threats.length > 0 ? "Action Requise" : "R.A.S"}
					/>
				</div>
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("bandwidth")}>
					<StatCard
						label="Bande Passante"
						value={`${totalMbNumber.toFixed(2)} MB`}
						icon={<FaNetworkWired />}
						iconColor="orange"
						status="Temps réel"
					/>
				</div>
			</div>

			{activeSection && (
				<div className={`details-dropdown ${activeSection}`}>
					<div className="dropdown-header">
						<h3>
							{activeSection === "devices" &&
								"Inventaire des Appareils"}
							{activeSection === "threats" &&
								"Détail des Menaces Actives"}
							{activeSection === "bandwidth" &&
								"Analyse du Trafic par Machine"}
						</h3>

						<div className="dropdown-actions">
							<SearchBar
								value={searchTerm}
								onChange={setSearchTerm}
								placeholder="Rechercher..."
							/>
							<button
								className="close-btn"
								onClick={() => handleToggleSection(null)}>
								<FaTimes />
							</button>
						</div>
					</div>

					<div className="dropdown-content">
						{activeSection === "devices" && (
							<Table
								data={getFilteredData(trafficData)}
								columns={commonColumns}
							/>
						)}
						{activeSection === "threats" && (
							<Table
								data={getFilteredData(threats)}
								columns={commonColumns}
								emptyMessage="R.A.S : Aucune menace."
							/>
						)}
						{activeSection === "bandwidth" && (
							<Table
								data={getFilteredData(
									[...trafficData].sort(
										(a, b) =>
											b.currentUsage - a.currentUsage,
									),
								)}
								columns={bandwidthColumns}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardOverview;
