import DeviceOverview from "../../components/organisms/DeviceOverview/DeviceOverview";
import DeviceInventory from "../../components/organisms/DeviceInventory/DeviceInventory";
import "./DevicePage.scss";

const DevicePage = () => {
	return (
		<div className="nexus-x-page">
			<header className="page-header">
				<h2>Gestion des Appareils</h2>
				<p className="description-header">
					Inventaire et analyse de la surface d'attaque des
					équipements connectés.
				</p>
			</header>

			<div className="page-content">
				{/* Le graphique des ports */}
				<DeviceOverview />

				{/* Tableau avec barre de recherche */}
				<DeviceInventory />
			</div>
		</div>
	);
};

export default DevicePage;
