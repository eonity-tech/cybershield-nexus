export interface NetworkTraffic {
  deviceId: string;
  ipAddress: string;
  hostname: string;
  detectedSoftwares: string[];
  currentUsage: number;
  statusCode: number;
  message: string;
  trafficSeverity: string;
  typePoste: string;
}