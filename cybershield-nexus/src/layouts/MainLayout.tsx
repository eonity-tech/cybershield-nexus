import { Outlet } from "react-router-dom";
import Sidebar from "../components/organisms/Sidebar/Sidebar";

const MainLayout = () => {
	return (
		<div className="nexus-page">
			<Sidebar />
			<main className="nexus-main">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
