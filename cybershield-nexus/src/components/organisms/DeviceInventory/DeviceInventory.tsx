import { useEffect, useState } from "react";
import {
	FaServer,
	FaDesktop,
	FaWindows,
	FaLinux,
	FaCheckCircle,
	FaExclamationTriangle,
	FaSkullCrossbones,
	FaChevronLeft,
	FaChevronRight,
	FaBan,
	FaUnlock,
	FaInfoCircle,
} from "react-icons/fa";
import Table from "../../atoms/Table/Table";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import Tooltip from "../../atoms/Tooltip/Tooltip";
import Button from "../../atoms/Button/Button";
import Modal from "../../atoms/Modal/Modal";

import {
	getAllDevices,
	blockDevice,
	unblockDevice,
} from "../../../services/device.service";
import type { Device } from "../../../models/Device";
import "./DeviceInventory.scss";

const ITEMS_PER_PAGE = 25;

const DeviceInventory = () => {
	const [devices, setDevices] = useState<Device[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// --- ÉTATS POUR LA MODALE D'ACTION ---
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [deviceToProcess, setDeviceToProcess] = useState<Device | null>(null);
	const [actionType, setActionType] = useState<"block" | "unblock">("block");
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				setLoading(true);
				// Simulation de latence pour apprécier le Skeleton
				// await new Promise((resolve) => setTimeout(resolve, 1000));

				const data = await getAllDevices();
				setDevices(data);
			} catch (error) {
				console.error("Erreur DeviceInventory:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchDevices();
	}, []);

	// Retour à la page 1 lors d'une nouvelle recherche
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	// --- GESTION DES ACTIONS (BLOQUER / DÉBLOQUER) ---
	const handleOpenModal = (device: Device, type: "block" | "unblock") => {
		setDeviceToProcess(device);
		setActionType(type);
		setIsModalOpen(true);
	};

	const handleConfirmAction = async () => {
		if (!deviceToProcess) return;

		try {
			setIsProcessing(true);

			if (actionType === "block") {
				await blockDevice(deviceToProcess.id);
				setDevices((prevDevices) =>
					prevDevices.map((d) =>
						d.id === deviceToProcess.id
							? { ...d, isBlacklisted: true, status: "BLOCKED" }
							: d,
					),
				);
			} else {
				await unblockDevice(deviceToProcess.id);
				setDevices((prevDevices) =>
					prevDevices.map((d) =>
						d.id === deviceToProcess.id
							? {
									...d,
									isBlacklisted: false,
									status: "UNPROTECTED",
								}
							: d,
					),
				);
			}
		} catch (error) {
			console.error(
				`Impossible d'effectuer l'action ${actionType} sur l'appareil.`,
			);
		} finally {
			setIsProcessing(false);
			setIsModalOpen(false);
			setDeviceToProcess(null);
		}
	};

	// --- FILTRAGE DE LA RECHERCHE ---
	const filteredDevices = devices.filter((device) => {
		if (!searchTerm) return true;
		const term = searchTerm.toLowerCase();
		return (
			device.hostname?.toLowerCase().includes(term) ||
			device.ipAddress?.toLowerCase().includes(term) ||
			device.vulnerabilityLevel?.toLowerCase().includes(term) ||
			device.osType?.toLowerCase().includes(term)
		);
	});

	// --- CALCUL DU NOMBRE D'APPAREILS CRITIQUES ---
	const criticalCount = filteredDevices.filter(
		(d) => d.vulnerabilityLevel === "CRITICAL",
	).length;

	// --- LOGIQUE DE PAGINATION ---
	const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedDevices = filteredDevices.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	);

	// --- DÉFINITION DES COLONNES ---
	const columns = [
		{
			header: "Machine",
			key: "hostname",
			render: (dev: Device) => (
				<div className="table-cell-machine">
					{dev.type === "SERVER" ? (
						<FaServer className="icon-server" />
					) : (
						<FaDesktop className="icon-computer" />
					)}
					<div className="machine-info">
						<span className="hostname">{dev.hostname}</span>
						<span className="mac-address">{dev.macAddress}</span>
					</div>
				</div>
			),
		},
		{
			header: "Adresse IP",
			key: "ipAddress",
			render: (dev: Device) => (
				<span className="ip-cell">{dev.ipAddress}</span>
			),
		},
		{
			header: "Système (OS)",
			key: "osType",
			render: (dev: Device) => (
				<div className="table-cell-os">
					{dev.osType === "WINDOWS" ? (
						<FaWindows className="os-icon win" />
					) : (
						<FaLinux className="os-icon lin" />
					)}
					<span>{dev.osVersion}</span>
				</div>
			),
		},
		{
			header: "Ports Ouverts",
			key: "openPorts",
			render: (dev: Device) => (
				<div className="ports-container">
					{dev.openPorts ? (
						dev.openPorts.split(",").map((port, idx) => (
							<span key={idx} className="port-badge">
								{port.trim()}
							</span>
						))
					) : (
						<span className="text-muted">Aucun</span>
					)}
				</div>
			),
		},
		{
			header: "Niveau de Risque",
			key: "vulnerabilityLevel",
			render: (dev: Device) => {
				let statusClass = "safe";
				let Icon = FaCheckCircle;
				let label = "Sain";

				if (dev.vulnerabilityLevel === "CRITICAL") {
					statusClass = "critical";
					Icon = FaSkullCrossbones;
					label = "Critique";
				} else if (dev.vulnerabilityLevel === "HIGH") {
					statusClass = "high";
					Icon = FaExclamationTriangle;
					label = "Élevé";
				}

				return (
					<Tooltip
						content={dev.securityRecommendation}
						position="left">
						<div className={`vuln-badge ${statusClass}`}>
							<Icon className="vuln-icon" />
							<span>{label}</span>
						</div>
					</Tooltip>
				);
			},
		},
		{
			header: "Action",
			key: "action",
			render: (dev: Device) =>
				dev.isBlacklisted ? (
					<Button
						variant="success"
						onClick={() => handleOpenModal(dev, "unblock")}
						title="Réautoriser cet appareil sur le réseau"
						className="action-btn">
						<FaUnlock /> Débloquer
					</Button>
				) : (
					<Button
						variant="danger"
						onClick={() => handleOpenModal(dev, "block")}
						title="Bloquer cet appareil"
						className="action-btn">
						<FaBan /> Bloquer
					</Button>
				),
		},
	];

	if (loading) {
		return (
			<div className="device-inventory-container">
				<div className="title-header">
					<h3>Inventaire Réseau</h3>
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

	// --- PRÉPARATION DE LA MODALE DYNAMIQUE ---
	const isBlockAction = actionType === "block";
	const modalTitle = isBlockAction
		? "Alerte de Sécurité - Isolement"
		: "Restauration d'Accès Réseau";

	const modalFooter = (
		<div className="modal-actions-wrapper">
			<Button
				variant="slate"
				onClick={() => setIsModalOpen(false)}
				disabled={isProcessing}>
				Annuler
			</Button>
			<Button
				variant={isBlockAction ? "danger" : "success"}
				onClick={handleConfirmAction}
				disabled={isProcessing}>
				{isProcessing
					? "Traitement en cours..."
					: isBlockAction
						? "Oui, isoler l'appareil"
						: "Oui, réautoriser l'appareil"}
			</Button>
		</div>
	);

	return (
		<div className="device-inventory-container">
			<div className="title-header">
									<h3>
						<span className="title-description">Parc informatique | </span>
						{filteredDevices.length} appareils détectés
						{criticalCount > 0 && (
							<span
								className="critical-counter-badge"
								title="Appareils en état critique">
								{criticalCount} critique
								{criticalCount > 1 ? "s" : ""}
							</span>
						)}
					</h3>
				{/* <h3>
					<span className="title-description">
						Parc informatique |
					</span>
					{criticalCount} appareils critiques détectés
				</h3> */}

				<div className="search-wrapper">
					<SearchBar
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder="Rechercher par IP, Nom, OS ou Statut..."
					/>
				</div>
			</div>

			<Table
				data={paginatedDevices}
				columns={columns}
				emptyMessage="Aucun appareil ne correspond à votre recherche."
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

			{/* MODALE DYNAMIQUE (BLOQUER/DÉBLOQUER) */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => !isProcessing && setIsModalOpen(false)}
				title={modalTitle}
				footer={modalFooter}>
				{deviceToProcess && (
					<div className="modal-content-wrapper">
						<p>
							Êtes-vous sûr de vouloir{" "}
							{isBlockAction ? "bloquer" : "réautoriser"}{" "}
							l'appareil suivant ?
						</p>

						<ul className="device-details-list">
							<li>
								<strong>Nom :</strong>{" "}
								{deviceToProcess.hostname}
							</li>
							<li>
								<strong>IP :</strong>{" "}
								{deviceToProcess.ipAddress}
							</li>
							<li>
								<strong>MAC :</strong>{" "}
								{deviceToProcess.macAddress}
							</li>
						</ul>

						{isBlockAction ? (
							<p className="warning-text">
								<FaExclamationTriangle />
								Attention, cette action coupera immédiatement
								toutes les connexions réseau de cette machine.
							</p>
						) : (
							<p className="success-text">
								<FaInfoCircle />
								L'appareil retrouvera son accès complet au
								réseau instantanément.
							</p>
						)}
					</div>
				)}
			</Modal>
		</div>
	);
};

export default DeviceInventory;
