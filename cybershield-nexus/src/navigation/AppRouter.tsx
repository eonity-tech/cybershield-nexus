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
import SoftwarePage from "../pages/Software/SoftwarePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

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
					<Route path="/logiciels" element={<SoftwarePage />} />
				</Route>

				{/* Les routes hors du layout s'afficheront sans Sidebar */}
				<Route
					path="*"
					element={
						<div style={{ padding: "2rem", color: "white" }}>
							<NotFoundPage />
						</div>
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRouter;
