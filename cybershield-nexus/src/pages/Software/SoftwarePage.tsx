import SoftwareOverview from "../../components/organisms/SoftwareOverview/SoftwareOverview";
import SoftwareInventory from "../../components/organisms/SoftwareInventory/SoftwareInventory";
import "./SoftwarePage.scss";

const SoftwarePage = () => {
	return (
		<div className="nexus-x-page">
			<header className="page-header">
				<h2>Inventaire Logiciel</h2>
				<p className="description-header">
					Analyse des applications installées sur le parc, détection
					des vulnérabilités et contrôle des niveaux de risque (Shadow
					IT).
				</p>
			</header>

			<div className="page-content">
				{/* Le graphique d'analyse des logiciels */}
				<SoftwareOverview />

				{/* Tableau avec barre de recherche (Le composant viendra ici) */}
				<SoftwareInventory />
			</div>
		</div>
	);
};

export default SoftwarePage;
