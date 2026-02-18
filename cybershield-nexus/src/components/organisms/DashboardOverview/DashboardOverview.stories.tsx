import type { Meta, StoryObj } from "@storybook/react";
import DashboardOverview from "./DashboardOverview";
import { http, HttpResponse, delay } from "msw";

const mockTrafficData = [
    {
        deviceId: "SRV-001",
        ipAddress: "192.168.1.10",
        hostname: "database-prod",
        detectedSoftwares: ["PostgreSQL", "SSH"],
        currentUsage: 15000000, // ~15 MB
        statusCode: 3, // Sain
        message: "Port 5432 (SQL) Open",
    },
    {
        deviceId: "SRV-002",
        ipAddress: "192.168.1.15",
        hostname: "web-front",
        detectedSoftwares: ["Nginx", "NodeJS"],
        currentUsage: 8500000, // ~8 MB
        statusCode: 3, // Sain
        message: "Port 443 (HTTPS) Active",
    },
    {
        deviceId: "UNKNOWN-IOT",
        ipAddress: "192.168.1.99",
        hostname: "cam-security-04",
        detectedSoftwares: ["Telnet"],
        currentUsage: 2500, 
        statusCode: 1,
        message: "Port 23 (Telnet) Insecure protocol detected",
    },
];

const meta = {
    title: "Organisms/DashboardOverview",
    component: DashboardOverview,
    tags: ["autodocs"],
} satisfies Meta<typeof DashboardOverview>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DefaultWithData: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get("*/network-monitoring/dashboard", () => {
                    return HttpResponse.json(mockTrafficData);
                }),
            ],
        },
    },
};

export const CriticalState: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get("*/network-monitoring/dashboard", () => {
                    // On simule une attaque massive (5 appareils critiques)
                    const criticalData = Array(5).fill({
                        ...mockTrafficData[2], // On clone l'appareil critique
                        deviceId: "BOTNET-ATTACK",
                        currentUsage: 99999999
                    });
                    return HttpResponse.json(criticalData);
                }),
            ],
        },
    },
};

export const Loading: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get("*/network-monitoring/dashboard", async () => {
                    await delay("infinite");
                    return new HttpResponse(null, { status: 200 });
                }),
            ],
        },
    },
};