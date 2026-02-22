export interface Software {
    id: string;
    deviceId: string;
    name: string;
    version: string;
    publisher: string;
    isRunning: boolean;
    criticalScore: number;
    riskLevel: string;
    recommendation: string;
}