import { Sidebar } from "../components/organisms";
import { StatCard } from "../components/molecules";
import { FaServer, FaShieldAlt, FaNetworkWired, FaUsers } from "react-icons/fa";
import { useAuth } from "../services/auth/AuthContext";

const DashboardScreen = () => {
	const { username } = useAuth();

	return (
		<div
			style={{
				display: "flex",
				minHeight: "100vh",
				background: "#0f172a",
			}}>
			<Sidebar />

			<main style={{ marginLeft: "260px", flex: 1, padding: "2.5rem" }}>
				<header style={{ marginBottom: "2.5rem" }}>
					<h1 style={{ color: "#fff", margin: 0 }}>
						Nexus Dashboard
					</h1>
					<p style={{ color: "#94a3b8" }}>
						Analyste : {username || "Admin"}
					</p>
				</header>

				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(280px, 1fr))",
						gap: "1.5rem",
					}}>
					<StatCard
						label="Serveurs"
						value="12"
						icon={<FaServer />}
						iconColor="blue"
						status="Actif"
					/>
					<StatCard
						label="Alertes"
						value="5"
						icon={<FaShieldAlt />}
						iconColor="red"
						status="Critique"
					/>
				</div>
			</main>
		</div>
	);
};

export default DashboardScreen;
