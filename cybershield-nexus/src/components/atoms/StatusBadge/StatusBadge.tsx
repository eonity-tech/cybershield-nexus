import "./StatusBadge.scss";

export type StatusType =
	| "Actif"
	| "Inactif"
	| "Critique"
	| "Windows"
	| "Linux"
	| "macOS"
	| number
	| string;

interface StatusBadgeProps {
	status: StatusType;
	label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
	const getStatusClass = (s: StatusType): string => {
		const lowerStatus = String(s).toLowerCase();
		if (["actif", "normal", "connected", "3"].includes(lowerStatus))
			return "success";
		if (["critique", "error", "disconnected", "1"].includes(lowerStatus))
			return "danger";
		if (["warning", "maintenance", "2"].includes(lowerStatus))
			return "warning";
		return "neutral";
	};

	return (
		<span className={`status-badge ${getStatusClass(status)}`}>
			{label || String(status)}
		</span>
	);
};

export default StatusBadge;
