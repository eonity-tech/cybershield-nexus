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
import { getAllTraffic } from "../../../services/network.service";
import type { NetworkTraffic } from "../../../models/NetworkTraffic";
import "./DashboardOverview.scss";

type SectionType = "devices" | "threats" | "bandwidth" | null;

const DashboardOverview = () => {
	const [trafficData, setTrafficData] = useState<NetworkTraffic[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeSection, setActiveSection] = useState<SectionType>(null);

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
			render: (item: NetworkTraffic) => (
				<div
					className={`status-badge ${item.statusCode === 1 ? "critical" : "healthy"}`}>
					{item.statusCode === 1 ? (
						<FaExclamationTriangle className="status-icon" />
					) : (
						<FaCheckCircle className="status-icon" />
					)}
					<span>{item.statusCode === 1 ? "Critique" : "Sain"}</span>
				</div>
			),
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

	const toggleSection = (section: SectionType) => {
		setActiveSection(activeSection === section ? null : section);
	};

	const threats = trafficData.filter((t) => t.statusCode === 1);
	const totalMb = (
		trafficData.reduce((acc, curr) => acc + curr.currentUsage, 0) /
		1024 /
		1024
	).toFixed(2);

	if (loading)
		return <div className="loading-state">Analyse du réseau Nexus...</div>;

	return (
		<div className="nexus-dashboard-overview">
			<h2 className="section-title">État du Réseau</h2>

			{/* Grille de statistiques principales */}
			<div className="stats-grid">
				<div
					className="clickable-card"
					onClick={() => toggleSection("devices")}>
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
					onClick={() => toggleSection("threats")}>
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
					onClick={() => toggleSection("bandwidth")}>
					<StatCard
						label="Bande Passante"
						value={`${totalMb} MB`}
						icon={<FaNetworkWired />}
						iconColor="orange"
						status="Temps réel"
					/>
				</div>
			</div>

			{/* Zone de détails (Dropdown) qui apparaît au clic */}
			{activeSection && (
				<div className={`details-dropdown ${activeSection}`}>
					<div className="dropdown-header">
						<h3>
							{activeSection === "devices" &&
								"Inventaire des Appareils"}
							{activeSection === "threats" && "Menaces Actives"}
							{activeSection === "bandwidth" &&
								"Analyse du Trafic"}
						</h3>
						<button
							className="close-btn"
							onClick={() => setActiveSection(null)}>
							<FaTimes />
						</button>
					</div>

					<div className="dropdown-content">
						{activeSection === "devices" && (
							<Table data={trafficData} columns={commonColumns} />
						)}

						{activeSection === "threats" && (
							<Table
								data={threats}
								columns={commonColumns}
								emptyMessage="R.A.S : Aucune menace détectée sur le segment."
							/>
						)}

						{activeSection === "bandwidth" && (
							<Table
								data={[...trafficData].sort(
									(a, b) => b.currentUsage - a.currentUsage,
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
