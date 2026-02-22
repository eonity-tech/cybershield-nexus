import { useEffect, useState } from "react";
import {
	FaServer,
	FaShieldAlt,
	FaNetworkWired,
	FaTimes,
	FaExclamationTriangle,
	FaSkullCrossbones,
	FaCheckCircle,
	FaHdd,
	FaUserShield,
} from "react-icons/fa";
import StatCard from "../../molecules/StatCard/StatCard";
import Table from "../../atoms/Table/Table";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Chart from "../../atoms/Chart/Chart";
import Tooltip from "../../atoms/Tooltip/Tooltip";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import { getAllTraffic } from "../../../services/network.service";
import { getAllDevices } from "../../../services/device.service";
import DeviceOverview from "../DeviceOverview/DeviceOverview";
import SecurityOverview from "../SecurityOverview/SecurityOverview";
import type { NetworkTraffic } from "../../../models/NetworkTraffic";
import type { Device } from "../../../models/Device";
import keycloak from "../../../services/auth/keycloak";
import "./DashboardOverview.scss";

// Type pour les sections déroulantes
type SectionType =
	| "devices"
	| "threats"
	| "bandwidth"
	| "vulnerabilities"
	| null;

const DashboardOverview = () => {
	const [trafficData, setTrafficData] = useState<NetworkTraffic[]>([]);
	const [devices, setDevices] = useState<Device[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeSection, setActiveSection] = useState<SectionType>(null);
	const [searchTerm, setSearchTerm] = useState("");

	// --- COLONNES ---
	const commonColumns = [
		{
			header: "Machine",
			key: "hostname",
			render: (item: any) => (
				<div className="table-machine-cell">
					<FaHdd className="machine-icon" />
					<span>{item.hostname}</span>
				</div>
			),
		},
		{ header: "IP Address", key: "ipAddress" },
		{
			header: "Statut",
			key: "status",
			render: (item: any) => {
				const isCritical =
					item.statusCode === 1 ||
					item.vulnerabilityLevel === "CRITICAL";
				const isWarning =
					item.statusCode === 2 || item.vulnerabilityLevel === "HIGH";

				let statusClass = "healthy";
				let Icon = FaCheckCircle;
				let label = "Sain";

				if (isCritical) {
					statusClass = "critical";
					Icon = FaSkullCrossbones;
					label = "Critique";
				} else if (isWarning) {
					statusClass = "warning";
					Icon = FaExclamationTriangle;
					label = "Élevé";
				}

				return (
					<Tooltip
						content={
							item.message ||
							item.securityRecommendation ||
							"R.A.S"
						}
						position="left"
						delay={100}>
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

	// --- FETCH DATA ---
	useEffect(() => {
		const fetchAllDashboardData = async () => {
			if (!keycloak.authenticated) return;
			try {
				setLoading(true);
				// On récupère les deux sources en parallèle pour plus de performance
				const [traffic, devicesList] = await Promise.all([
					getAllTraffic(),
					getAllDevices(),
				]);
				setTrafficData(traffic);
				setDevices(devicesList);
			} catch (error) {
				console.error("Erreur Dashboard Sync:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllDashboardData();
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

	const networkThreats = trafficData.filter(
		(t) => t.statusCode === 1 || t.statusCode === 2,
	);

	// Filtrage des devices vulnérables
	const vulnerableDevices = devices.filter(
		(d) =>
			d.vulnerabilityLevel === "CRITICAL" ||
			d.vulnerabilityLevel === "HIGH",
	);

	// --- FILTRAGE RECHERCHE ---
	const getFilteredData = () => {
		let baseData: any[] = [];

		if (activeSection === "bandwidth") baseData = trafficData;
		else if (activeSection === "threats") baseData = networkThreats;
		else if (activeSection === "vulnerabilities")
			baseData = vulnerableDevices;
		else baseData = devices;

		if (!searchTerm) return baseData;
		const lowerTerm = searchTerm.toLowerCase();
		return baseData.filter(
			(item) =>
				item.hostname?.toLowerCase().includes(lowerTerm) ||
				item.ipAddress?.toLowerCase().includes(lowerTerm),
		);
	};

	// --- CONFIG CHART ---
	const bandwidthChartData = {
		labels: ["-60m", "-50m", "-40m", "-30m", "-20m", "-10m", "Maintenant"],
		datasets: [
			{
				label: "Trafic Global (MB/s)",
				data: [150, 180, 160, 210, 200, 190, totalMbNumber],
				borderColor: "#3b82f6",
				backgroundColor: "rgba(59, 130, 246, 0.2)",
				fill: true,
				tension: 0.4,
			},
		],
	};

	// Pour les sections en chargement, on affiche des skeletons
	if (loading) {
		return (
			<div className="nexus-dashboard-overview">
				<div className="dashboard-charts-row">
					{[1, 2, 3].map((i) => (
						<div key={i} className="chart-container">
							<Skeleton
								width="20vw"
								height="4vh"
								className="mb-4"
							/>
							<Skeleton
								variant="rectangular"
								width="100%"
								height="25vh"
							/>
						</div>
					))}
				</div>
				<div className="stats-grid">
					{[1, 2, 3].map((i) => (
						<Skeleton
							key={i}
							variant="rectangular"
							width="100%"
							height="20vh"
						/>
					))}
				</div>
			</div>
		);
	}

	// Pour les sections actives, on affiche les données filtrées dans un tableau
	return (
		<div className="nexus-dashboard-overview">
			<div className="dashboard-charts-row">
				<div className="chart-container line-chart bar-chart">
					<h3>Bande Passante (Dernière Heure)</h3>
					<Chart
						type="line"
						data={bandwidthChartData}
						height="25vh"
					/>
				</div>
				<DeviceOverview />
				<SecurityOverview />
			</div>

			<div className="title-header">
				<h3>
					<span className="title-description">
						Points de Contrôle |{" "}
					</span>
					{devices.length} Équipements Répertoriés
				</h3>
			</div>

			<div className="stats-grid">
				{/* 1. Appareils (Inventaire complet) */}
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("devices")}>
					<StatCard
						label="Parc Informatique"
						value={devices.length.toString()}
						icon={<FaServer />}
						iconColor="blue"
						status="Total terminaux"
					/>
				</div>

				{/* 2. Menaces Réseau (UEBA / Anomalies de flux) */}
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("threats")}>
					<StatCard
						label="Anomalies Flux"
						value={networkThreats.length.toString()}
						icon={<FaShieldAlt />}
						iconColor={networkThreats.length > 0 ? "red" : "green"}
						status="Comportements"
					/>
				</div>

				{/* 3. Vulnérabilités (Nouveau : Menaces structurelles) */}
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("vulnerabilities")}>
					<StatCard
						label="Surface d'Attaque"
						value={vulnerableDevices.length.toString()}
						icon={<FaUserShield />}
						iconColor={
							vulnerableDevices.length > 0 ? "red" : "green"
						}
						status="Vulnérabilités OS"
					/>
				</div>

				{/* 4. Bande Passante */}
				<div
					className="clickable-card"
					onClick={() => handleToggleSection("bandwidth")}>
					<StatCard
						label="Bande Passante"
						value={`${totalMbNumber.toFixed(2)} MB`}
						icon={<FaNetworkWired />}
						iconColor="orange"
						status="Usage Réel"
					/>
				</div>
			</div>

			{/* DÉTAILS DEROULANTS */}
			{activeSection && (
				<div className={`details-dropdown ${activeSection}`}>
					<div className="dropdown-header">
						<h3>
							{activeSection === "devices" &&
								"Inventaire Complet du Parc"}
							{activeSection === "threats" &&
								"Anomalies Réseau Détectées"}
							{activeSection === "vulnerabilities" &&
								"Équipements à Risque Critique"}
							{activeSection === "bandwidth" &&
								"Consommation par Équipement"}
						</h3>
						<div className="search-wrapper">
							<SearchBar
								value={searchTerm}
								onChange={setSearchTerm}
							/>
							<button
								className="close-btn"
								onClick={() => handleToggleSection(null)}>
								<FaTimes />
							</button>
						</div>
					</div>
					<div className="dropdown-content">
						<Table
							data={getFilteredData()}
							columns={
								activeSection === "bandwidth"
									? bandwidthColumns
									: commonColumns
							}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardOverview;
