import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import DevicePage from "../pages/Device/DevicePage";
import NetworkPage from "../pages/Network/NetworkPage";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				{/* Toutes les routes à l'intérieur de ce bloc auront la Sidebar ! */}
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<Navigate to="/dashboard" replace />}
					/>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/appareils" element={<DevicePage />} />
					<Route path="/reseaux" element={<NetworkPage />} />
				</Route>

				{/* Les routes hors du layout s'afficheront sans Sidebar */}
				<Route
					path="*"
					element={
						<div style={{ padding: "2rem", color: "white" }}>
							{/* TODO: Ajouter une page 404 personnalisée */}
							Erreur 404
						</div>
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRouter;
