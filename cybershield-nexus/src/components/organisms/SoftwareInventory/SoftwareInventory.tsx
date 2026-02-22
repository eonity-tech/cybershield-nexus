import { useEffect, useState } from "react";
import {
	FaBoxOpen,
	FaBuilding,
	FaCheckCircle,
	FaExclamationTriangle,
	FaSkullCrossbones,
	FaChevronLeft,
	FaChevronRight,
	FaPlayCircle,
	FaStopCircle,
} from "react-icons/fa";
import Table from "../../atoms/Table/Table";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import Tooltip from "../../atoms/Tooltip/Tooltip";

import { getAllSoftwares } from "../../../services/software.service";
import type { Software } from "../../../models/Software";
import "./SoftwareInventory.scss";

const ITEMS_PER_PAGE = 25;

const SoftwareInventory = () => {
	const [softwares, setSoftwares] = useState<Software[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchSoftwares = async () => {
			try {
				setLoading(true);
				// Simulation de latence pour apprécier le Skeleton
				// await new Promise((resolve) => setTimeout(resolve, 1000));

				const data = await getAllSoftwares();
				setSoftwares(data);
			} catch (error) {
				console.error("Erreur SoftwareInventory:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchSoftwares();
	}, []);

	// Retour à la page 1 lors d'une nouvelle recherche
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	// --- FILTRAGE DE LA RECHERCHE ---
	const filteredSoftwares = softwares.filter((sw) => {
		if (!searchTerm) return true;
		const term = searchTerm.toLowerCase();
		return (
			sw.name?.toLowerCase().includes(term) ||
			sw.publisher?.toLowerCase().includes(term) ||
			sw.riskLevel?.toLowerCase().includes(term) ||
			sw.version?.toLowerCase().includes(term)
		);
	});

	// --- CALCULS ---
	const riskCount = filteredSoftwares.filter(
		(sw) => sw.riskLevel === "MODÉRÉ" || sw.riskLevel === "CRITIQUE",
	).length;

	// --- LOGIQUE DE PAGINATION ---
	const totalPages = Math.ceil(filteredSoftwares.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedSoftwares = filteredSoftwares.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	);

	// --- DÉFINITION DES COLONNES ---
	const columns = [
		{
			header: "Logiciel",
			key: "name",
			render: (sw: Software) => (
				<div className="table-cell-software">
					<FaBoxOpen className="icon-software" />
					<div className="software-info">
						<span className="software-name">{sw.name}</span>
						<span className="software-version">v{sw.version}</span>
					</div>
				</div>
			),
		},
		{
			header: "Éditeur",
			key: "publisher",
			render: (sw: Software) => (
				<div className="table-cell-publisher">
					<FaBuilding className="icon-publisher" />
					<span>{sw.publisher || "Inconnu"}</span>
				</div>
			),
		},
		{
			header: "État",
			key: "isRunning",
			render: (sw: Software) => (
				<div
					className={`running-status ${sw.isRunning ? "active" : "inactive"}`}>
					{sw.isRunning ? (
						<>
							<FaPlayCircle /> Actif
						</>
					) : (
						<>
							<FaStopCircle /> Arrêté
						</>
					)}
				</div>
			),
		},
		{
			header: "Score de Criticité",
			key: "criticalScore",
			render: (sw: Software) => (
				<div className="score-cell">
					<div className="score-bar-bg">
						<div
							className={`score-bar-fill ${sw.criticalScore > 50 ? "danger" : sw.criticalScore > 20 ? "warning" : "safe"}`}
							style={{ width: `${sw.criticalScore}%` }}></div>
					</div>
					<span className="score-value">{sw.criticalScore}/100</span>
				</div>
			),
		},
		{
			header: "Niveau de Risque",
			key: "riskLevel",
			render: (sw: Software) => {
				let statusClass = "safe";
				let Icon = FaCheckCircle;
				let label = "Sain";

				if (sw.riskLevel === "CRITIQUE") {
					statusClass = "critical";
					Icon = FaSkullCrossbones;
					label = "Critique";
				} else if (sw.riskLevel === "MODÉRÉ") {
					statusClass = "warning";
					Icon = FaExclamationTriangle;
					label = "Élevé";
				}

				return (
					<Tooltip content={sw.recommendation} position="left">
						<div className={`vuln-badge ${statusClass}`}>
							<Icon className="vuln-icon" />
							<span>{label}</span>
						</div>
					</Tooltip>
				);
			},
		},
	];

	if (loading) {
		return (
			<div className="software-inventory-container">
				<div className="title-header">
					<h3>Inventaire Logiciel</h3>
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
		<div className="software-inventory-container">
			<div className="title-header">
				<h3>
					<span className="title-description">Applications |</span>
					{filteredSoftwares.length} logiciels détectés
					{riskCount > 0 && (
						<span
							className="critical-counter-badge"
							title="Logiciels à risque détectés">
							{riskCount} à risque
							{riskCount > 1 ? "s" : ""}
						</span>
					)}
				</h3>

				<div className="search-wrapper">
					<SearchBar
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder="Rechercher par nom, éditeur ou statut..."
					/>
				</div>
			</div>

			<Table
				data={paginatedSoftwares}
				columns={columns}
				emptyMessage="Aucun logiciel ne correspond à votre recherche."
			/>

			{totalPages > 1 && (
				<div className="pagination-controls">
					<button
						className="page-btn"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => prev - 1)}>
						<FaChevronLeft /> Précédent
					</button>

					<span className="page-info">
						Page <strong>{currentPage}</strong> sur {totalPages}
					</span>

					<button
						className="page-btn"
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((prev) => prev + 1)}>
						Suivant <FaChevronRight />
					</button>
				</div>
			)}
		</div>
	);
};

export default SoftwareInventory;
