import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import keycloak from "./keycloak";

import "./../../styles/auth-loading.scss";

interface AuthContextType {
	isAuthenticated: boolean;
	token: string | undefined;
	username: string | undefined;
	roles: string[];
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const isRun = useRef(false);

	useEffect(() => {
		if (isRun.current) return;
		isRun.current = true;

		keycloak
			.init({
				onLoad: "login-required",
				checkLoginIframe: false,
			})
			.then((authenticated) => {
				setIsAuthenticated(authenticated);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Erreur Keycloak", err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="auth-loading-wrapper">
				<div className="spinner"></div>
				<span>Initialisation de la session sécurisée...</span>
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				token: keycloak.token,
				username: keycloak.tokenParsed?.preferred_username,
				roles: keycloak.realmAccess?.roles || [],
				login: keycloak.login,
				logout: keycloak.logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuth doit être utilisé dans un AuthProvider");
	return context;
};
