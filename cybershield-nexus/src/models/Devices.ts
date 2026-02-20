export interface Device {
    id: string;
    macAddress: string;
    ipAddress: string;
    type: "SERVER" | "COMPUTER";
    osType: "LINUX" | "WINDOWS";
    osVersion: string;
    hostname: string;
    vendor: string;
    ttl: number | null;
    openPorts: string;
    status: string;
    isBlacklisted: boolean;
    enrolledAt: string;
    riskScore: number;
    securityRecommendation: string;
    vulnerabilityLevel: "SAFE" | "HIGH" | "CRITICAL";
}