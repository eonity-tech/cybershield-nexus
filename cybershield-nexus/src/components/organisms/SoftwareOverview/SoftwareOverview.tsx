import { useEffect, useState } from "react";
import Chart from "../../atoms/Chart/Chart";
import Skeleton from "../../atoms/Skeleton/Skeleton";
import { getAllSoftwares } from "../../../services/software.service";
import type { Software } from "../../../models/Software";
import "./SoftwareOverview.scss";

const SoftwareOverview = () => {
	const [softwares, setSoftwares] = useState<Software[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Simulation de latence pour apprécier le Skeleton
				// await new Promise(resolve => setTimeout(resolve, 1000));

				const data = await getAllSoftwares();
				setSoftwares(data);
			} catch (error) {
				console.error("Erreur SoftwareOverview:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const getSoftwareStats = () => {
		const softwareCounts: { [key: string]: number } = {};
		softwares.forEach((sw) => {
			if (sw.name) {
				softwareCounts[sw.name] = (softwareCounts[sw.name] || 0) + 1;
			}
		});

		// Trier pour garder le Top 8 des logiciels les plus présents
		const sortedSoftwares = Object.entries(softwareCounts)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 5);

		return {
			labels: sortedSoftwares.map(([name]) => name),
			datasets: [
				{
					label: "Installations détectées",
					data: sortedSoftwares.map(([, count]) => count),
					backgroundColor: "#144ba3",
					borderRadius: 6,
				},
			],
		};
	};

	// --- Skeleton Loading ---
	if (loading) {
		return (
			<div className="chart-container bar-chart software-overview">
				<Skeleton width="20vw" height="4vh" className="mb-4" />
				<Skeleton variant="rectangular" width="100%" height="25vh" />
			</div>
		);
	}

	return (
		<div className="chart-container bar-chart software-overview">
			<h3>Top 5 des Logiciels Détectés</h3>
			<Chart type="bar" data={getSoftwareStats()} height="25vh" />
		</div>
	);
};

export default SoftwareOverview;
