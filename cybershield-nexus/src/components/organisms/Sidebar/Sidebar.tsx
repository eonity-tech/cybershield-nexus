import {
	FaChartPie,
	FaShieldAlt,
	FaServer,
	FaUserShield,
	FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../../services/auth/AuthContext";
import "./Sidebar.scss";

const Sidebar = () => {
	const { username, logout } = useAuth();

	const menuItems = [
		{ id: "dash", label: "Dashboard", icon: <FaChartPie />, active: true },
		{
			id: "protect",
			label: "Protection",
			icon: <FaShieldAlt />,
			active: false,
		},
		{
			id: "devices",
			label: "Appareils",
			icon: <FaServer />,
			active: false,
		},
		{ id: "admin", label: "Admin", icon: <FaUserShield />, active: false },
	];

	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<span className="logo-icon">🛡️</span>
				<span className="logo-text">NEXUS</span>
			</div>

			<nav className="nav-links">
				{menuItems.map((item) => (
					<div
						key={item.id}
						className={`nav-item ${item.active ? "active" : ""}`}>
						<span className="icon">{item.icon}</span>
						<span className="label">{item.label}</span>
					</div>
				))}
			</nav>

			<div className="sidebar-footer">
				<div className="user-box">
					<p className="user-label">Session</p>
					<p className="user-name">{username || "Anonyme"}</p>
				</div>
				<button className="logout-btn" onClick={logout}>
					<FaSignOutAlt /> Déconnexion
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
