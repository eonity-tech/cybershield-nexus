import DashboardOverview from "../../components/organisms/DashboardOverview/DashboardOverview";
import "./DashboardPage.scss";

const DashboardPage = () => {
	return (
		<div className="nexus-x-page">
			<header className="page-header">
				<h2>Dashboard</h2>
				<p className="description-header">
					Vue d'ensemble des points critiques de votre surface
					d'attaque et des tendances de sécurité.
				</p>
			</header>

			<section className="dashboard-content">
				<DashboardOverview />
			</section>
		</div>
	);
};

export default DashboardPage;
