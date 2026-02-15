import { ReactNode } from "react";
import { StatusBadge } from "../../atoms";
import type { StatusType } from "../../atoms";
import "./StatCard.scss";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: ReactNode;
	iconColor?: "blue" | "green" | "purple" | "orange" | "red";
	status?: StatusType;
	statusLabel?: string;
}

const StatCard = ({
	label,
	value,
	icon,
	iconColor = "blue",
	status,
	statusLabel,
}: StatCardProps) => {
	return (
		<div className="stat-card">
			<div className="card-content">
				<div className={`icon-wrapper ${iconColor}`}>{icon}</div>
				<div className="info">
					<span className="label">{label}</span>
					<span className="value">{value}</span>
				</div>
			</div>
			{status && (
				<div className="card-badge">
					{/* StatusBadge est maintenant défini grâce à l'import en haut */}
					<StatusBadge status={status} label={statusLabel} />
				</div>
			)}
		</div>
	);
};

export default StatCard;
