import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	FaChartPie,
	FaShieldAlt,
	FaServer,
	FaUserShield,
	FaSignOutAlt,
	FaChevronLeft,
	FaChevronRight,
	FaNetworkWired,
} from "react-icons/fa";
import { useAuth } from "../../../services/auth/AuthContext";
import "./Sidebar.scss";

const Sidebar = () => {
	const { username, logout } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState(false);

	const menuItems = [
		{
			id: "dash",
			label: "Dashboard",
			icon: <FaChartPie />,
			path: "/dashboard",
		},
		{
			id: "protect",
			label: "Protection",
			icon: <FaShieldAlt />,
			path: "/protection",
		},
		{
			id: "devices",
			label: "Appareils",
			icon: <FaServer />,
			path: "/appareils",
		},
		{
			id: "network",
			label: "Réseaux",
			icon: <FaNetworkWired />,
			path: "/reseaux",
		},
		{
			id: "software",
			label: "Logiciels",
			icon: <FaUserShield />,
			path: "/logiciels",
		},
		{ id: "admin", label: "Admin", icon: <FaUserShield />, path: "/admin" },
	];

	return (
		<aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
			{/* En-tête du sidebar avec logo et bouton de toggle */}
			<div className="sidebar-header">
				<div className="logo-container">
					<img
						src="../../../src/assets/logo-cybershield360.png"
						alt="NEXUS Logo"
						className="logo"
					/>
					<span className="logo-text">NEXUS</span>
				</div>

				{/* Bouton pour plier/déplier */}
				<button
					className="toggle-btn"
					onClick={() => setIsCollapsed(!isCollapsed)}
					title={isCollapsed ? "Déplier le menu" : "Réduire le menu"}>
					{isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
				</button>
			</div>

			{/* RENDU CONDITIONNEL : Ne s'affiche que si la sidebar n'est PAS pliée */}
			{!isCollapsed && (
				<div className="user-info-container">
					<p className="user-info">
						Analyste Connecté :{" "}
						<strong>{username || "Anonyme"}</strong>
					</p>
				</div>
			)}

			<nav className="nav-links">
				{menuItems.map((item) => (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive }) =>
							`nav-item ${isActive ? "active" : ""}`
						}
						title={isCollapsed ? item.label : ""}>
						<span className="icon">{item.icon}</span>
						<span className="label">{item.label}</span>
					</NavLink>
				))}
			</nav>

			<div className="sidebar-footer">
				<button
					className="logout-btn"
					onClick={logout}
					title={isCollapsed ? "Déconnexion" : ""}>
					<FaSignOutAlt className="logout-icon" />
					<span className="logout-text">Déconnexion</span>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
