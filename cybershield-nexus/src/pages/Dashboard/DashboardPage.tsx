import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import DashboardOverview from "../../components/organisms/DashboardOverview/DashboardOverview";
import { useAuth } from "../../services/auth/AuthContext";
import "./DashboardPage.scss";

const DashboardPage = () => {
	const { username } = useAuth();

	return (
		<div className="nexus-dashboard-page">
			<Sidebar />

			<main className="dashboard-main">
				<header className="dashboard-header">
					<h1>Nexus Dashboard</h1>
					<p className="user-info">
						Analyste Connecté :{" "}
						<strong>{username || "eonity"}</strong>
					</p>
				</header>

				<section className="dashboard-content">
					<DashboardOverview />{" "}
					{/* Si ce composant crash, React arrête le rendu ici */}
				</section>
			</main>
		</div>
	);
};

export default DashboardPage;
