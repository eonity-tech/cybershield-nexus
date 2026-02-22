import { useNavigate } from "react-router-dom";
import { FaSatelliteDish, FaArrowLeft } from "react-icons/fa";
import Button from "../../components/atoms/Button/Button";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="nexus-not-found-page">
			<div className="error-container">
				<div className="icon-wrapper">
					<FaSatelliteDish className="radar-icon pulse-animation" />
				</div>

				<h1 className="glitch-text" data-text="404">
					404
				</h1>
				<h2>Secteur Inconnu</h2>

				<p className="error-description">
					La ressource que vous tentez d'atteindre n'existe pas ou se
					trouve en dehors de notre périmètre de surveillance réseau.
				</p>

				<div className="action-wrapper">
					<Button
						variant="primary"
						onClick={() => navigate("/dashboard")}
						title="Retourner à la base">
						<FaArrowLeft /> Retour au Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
