import { useEffect, useState } from "react";
import {
	FaNetworkWired,
	FaExclamationTriangle,
	FaCheckCircle,
	FaHdd,
	FaBoxOpen,
	FaInfoCircle,
	FaChevronLeft,
	FaChevronRight,
	FaSkullCrossbones,
	FaTags,
} from "react-icons/fa";
import Table from "../../atoms/Table/Table";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import Tooltip from "../../atoms/Tooltip/Tooltip";
import Chart from "../../atoms/Chart/Chart";
import { getAllTraffic } from "../../../services/network.service";
import type { NetworkTraffic } from "../../../models/NetworkTraffic";
import "./NetworkAnalyze.scss";

const ITEMS_PER_PAGE = 15;

const NetworkAnalyze = () => {
	const [trafficData, setTrafficData] = useState<NetworkTraffic[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// --- FETCH DATA ---
	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				setLoading(true);
				const data = await getAllTraffic();
				setTrafficData(data);
			} catch (error) {
				console.error("Erreur d'analyse réseau:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchAnalysis();
	}, []);

	// Reset de la page courante à 1 lors d'une nouvelle recherche
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	// --- CALCULS STATISTIQUES ---
	const totalMbNumber =
		trafficData.reduce((acc, curr) => acc + curr.currentUsage, 0) /
		1024 /
		1024;

	// --- DONNÉES DU GRAPHIQUE ---
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

	// Formatage des octets en MB ou GB
	const formatBytes = (bytes: number) => {
		if (bytes === 0) return "0 MB";
		const mb = bytes / 1000000;
		if (mb > 1000) return `${(mb / 1000).toFixed(2)} GB`;
		return `${mb.toFixed(2)} MB`;
	};

	// Formatage du Profil IA pour une meilleure lisibilité
	const formatTypePoste = (type: string) => {
		if (!type) return "INCONNU";
		return type.replace(/_/g, " ");
	};

	// --- FILTRAGE ET PAGINATION ---
	const filteredData = trafficData.filter((item) => {
		if (!searchTerm) return true;
		const term = searchTerm.toLowerCase();

		const softwares = item.detectedSoftwares || [];
		const profil = item.typePoste || "";

		return (
			item.hostname?.toLowerCase().includes(term) ||
			item.ipAddress?.toLowerCase().includes(term) ||
			profil.toLowerCase().includes(term) ||
			softwares.some((s) => s.toLowerCase().includes(term))
		);
	});

	const criticalCount = filteredData.filter((d) => d.statusCode === 1).length;

	const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
	const paginatedData = filteredData.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	// --- COLONNES DU TABLEAU ---
	const columns = [
		{
			header: "Machine",
			key: "hostname",
			render: (item: NetworkTraffic) => (
				<div className="net-machine-cell">
					<FaHdd className="net-icon" />
					<div>
						<div className="hostname">{item.hostname}</div>
						<div className="ip">{item.ipAddress}</div>
					</div>
				</div>
			),
		},
		{
			header: (
				<div className="box-info">
					<Tooltip
						content="Classification comportementale générée automatiquement par notre moteur d'IA (UEBA) en analysant les logiciels et le sens du trafic réseau."
						position="bottom"
						delay={200}>
						<span className="info-container">
							<FaInfoCircle className="info-icon" cursor="help" />
						</span>
					</Tooltip>
					Profil IA
				</div>
			),

			key: "typePoste",

			render: (item: NetworkTraffic) => (
				<div className="title-header">
					<span className="type-post">
						{formatTypePoste(item.typePoste)}
					</span>
				</div>
			),
		},
		{
			header: "Logiciels Détectés",
			key: "detectedSoftwares",
			render: (item: NetworkTraffic) => {
				const softwares = item.detectedSoftwares || [];
				return (
					<div className="softwares-cell">
						{softwares.length > 0 ? (
							softwares.map((soft, idx) => (
								<span key={idx} className="soft-badge">
									<FaBoxOpen /> {soft}
								</span>
							))
						) : (
							<span className="text-muted">
								Aucun logiciel majeur
							</span>
						)}
					</div>
				);
			},
		},
		{
			header: "Trafic Actuel",
			key: "currentUsage",
			render: (item: NetworkTraffic) => {
				let usageClass = "normal";
				if (item.currentUsage > 500_000_000) {
					usageClass = "high";
				} else if (item.currentUsage > 100_000_000) {
					usageClass = "warning";
				}

				return (
					<div className={`usage-cell ${usageClass}`}>
						<FaNetworkWired />
						<span>{formatBytes(item.currentUsage)}</span>
					</div>
				);
			},
		},
		{
			header: "Diagnostic",
			key: "statusCode",
			render: (item: NetworkTraffic) => {
				let statusClass = "healthy";
				let Icon = FaCheckCircle;
				let label = "Sain";

				if (item.statusCode === 1) {
					statusClass = "critical";
					Icon = FaSkullCrossbones;
					label = "Critique";
				} else if (item.statusCode === 2) {
					statusClass = "warning";
					Icon = FaExclamationTriangle;
					label = "Élevé";
				}

				return (
					<Tooltip content={item.message} position="left">
						<div className={`net-status-badge ${statusClass}`}>
							<Icon className="status-icon" />
							<span>{label}</span>
						</div>
					</Tooltip>
				);
			},
		},
	];

	if (loading) {
		return (
			<div className="network-analyze-container">
				<div
					className="chart-container line-chart"
					style={{ marginBottom: "2rem" }}>
					<Skeleton width="20vw" height="4vh" className="mb-4" />
					<Skeleton
						variant="rectangular"
						width="100%"
						height="25vh"
						style={{ borderRadius: "12px" }}
					/>
				</div>
				<div className="header-actions">
					<Skeleton
						width="20vw"
						height="4vh"
						style={{ borderRadius: "20px" }}
					/>
				</div>
				<Skeleton
					variant="rectangular"
					width="100%"
					height="40vh"
					style={{ borderRadius: "12px" }}
				/>
			</div>
		);
	}

	return (
		<div className="network-analyze-container">
			{/* GRAPHIQUE */}
			<div className="chart-container line-chart">
				<h3>Bande Passante (Dernière Heure)</h3>
				<Chart type="line" data={bandwidthChartData} height="25vh" />
			</div>

			{/* BARRE DE RECHERCHE */}
			<div className="header-actions">
				<div className="title-header">
					<h3>
						<span className="title-description">Trafic | </span>
						{filteredData.length} flux détectés{" "}
						{criticalCount > 0 && (
							<span
								className="critical-counter-badge"
								title="Flux réseau en état critique">
								( {criticalCount} critique
								{criticalCount > 1 ? "s" : ""} )
							</span>
						)}
					</h3>
					<div className="search-wrapper">
						<SearchBar
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Rechercher IP, Machine, Profil IA..."
						/>
					</div>
				</div>
			</div>

			{/* TABLEAU */}
			<Table
				data={paginatedData}
				columns={columns}
				emptyMessage="Aucun trafic détecté."
			/>

			{/* PAGINATION */}
			{totalPages > 1 && (
				<div className="pagination-controls">
					<button
						className="page-btn"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((p) => p - 1)}>
						<FaChevronLeft /> Précédent
					</button>
					<span className="page-info">
						Page <strong>{currentPage}</strong> sur {totalPages}
					</span>
					<button
						className="page-btn"
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((p) => p + 1)}>
						Suivant <FaChevronRight />
					</button>
				</div>
			)}
		</div>
	);
};

export default NetworkAnalyze;
