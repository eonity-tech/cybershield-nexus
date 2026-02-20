import NetworkAnalyze from "../../components/organisms/Network/NetworkAnalyze";
import "./NetworkPage.scss";

const NetworkPage = () => {
	return (
		<div className="nexus-x-page">
			<header className="page-header">
				<h2>Analyse du Réseau</h2>
				<p className="description-header">
					Surveillance en temps réel de la bande passante et détection
					d'anomalies de flux.
				</p>
			</header>

			<div className="page-content">
				<NetworkAnalyze />
			</div>
		</div>
	);
};

export default NetworkPage;
