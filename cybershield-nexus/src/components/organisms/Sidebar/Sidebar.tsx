import { useState } from "react";
import {
    FaChartPie,
    FaShieldAlt,
    FaServer,
    FaUserShield,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "../../../services/auth/AuthContext";
import "./Sidebar.scss";

const Sidebar = () => {
    const { username, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: "dash", label: "Dashboard", icon: <FaChartPie />, active: true },
        { id: "protect", label: "Protection", icon: <FaShieldAlt />, active: false },
        { id: "devices", label: "Appareils", icon: <FaServer />, active: false },
        { id: "admin", label: "Admin", icon: <FaUserShield />, active: false },
    ];

return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            {/* En-tête du sidebar avec logo et bouton de toggle */}
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src="../../../src/assets/logo-cybershield360.png" alt="NEXUS Logo" className="logo" />
                    <span className="logo-text">NEXUS</span>
                </div>
                
                {/* Bouton pour plier/déplier */}
                <button 
                    className="toggle-btn" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Déplier le menu" : "Réduire le menu"}
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>

            <nav className="nav-links">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${item.active ? "active" : ""}`}
                        title={isCollapsed ? item.label : ""}
                    >
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
                <button 
                    className="logout-btn" 
                    onClick={logout}
                    title={isCollapsed ? "Déconnexion" : ""}
                >
                    <FaSignOutAlt className="logout-icon" />
                    <span className="logout-text">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;