import { AuthProvider } from "./services/auth/AuthContext";
import AppRouter from "./navigation/AppRouter";

function App() {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}

export default App;
