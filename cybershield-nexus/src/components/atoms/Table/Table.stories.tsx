import type { Meta, StoryObj } from "@storybook/react";
import {
	FaExclamationTriangle,
	FaCheckCircle,
	FaHdd,
	FaNetworkWired,
} from "react-icons/fa";
import Table from "./Table";
import type { NetworkTraffic } from "../../../models/NetworkTraffic";

const meta = {
	title: "Atoms/Table",
	component: Table,
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: Partial<NetworkTraffic>[] = [
	{
		hostname: "SRV-DATA-CRITICAL",
		ipAddress: "10.0.0.50",
		statusCode: 1,
		currentUsage: 750000000,
	},
	{
		hostname: "PC-OFFICE-01",
		ipAddress: "192.168.1.12",
		statusCode: 3,
		currentUsage: 1200000,
	},
];

export const DeviceTable: Story = {
	args: {
		data: mockData,
		columns: [
			{
				header: "Machine",
				key: "hostname",
				render: (item) => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}>
						<FaHdd style={{ color: "#94a3b8" }} />
						<span>{item.hostname}</span>
					</div>
				),
			},
			{ header: "IP Address", key: "ipAddress" },
			{
				header: "Status",
				key: "statusCode",
				render: (item) => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
							color:
								item.statusCode === 1 ? "#ef4444" : "#22c55e",
							fontWeight: "bold",
						}}>
						{item.statusCode === 1 ? (
							<>
								<FaExclamationTriangle /> Critical
							</>
						) : (
							<>
								<FaCheckCircle /> Operational
							</>
						)}
					</div>
				),
			},
			{
				header: "Traffic",
				key: "currentUsage",
				render: (item) => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
						}}>
						<FaNetworkWired
							style={{ color: "#f59e0b", fontSize: "0.8rem" }}
						/>
						{`${(item.currentUsage! / 1024 / 1024).toFixed(2)} MB`}
					</div>
				),
			},
		],
	},
};
