export interface Device {
    id: string;
    macAddress: string;
    ipAddress: string;
    type: "SERVER" | "COMPUTER" | "WORKSTATION" | "IOT" | "UNKNOWN";
    osType: "LINUX" | "WINDOWS" | "MACOS" | "UNKNOWN";
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
    typePoste:
    | "BUREAUTIQUE_STANDARD"
    | "DEVELOPPEUR"
    | "DESIGNER"
    | "PRODUCTION_MEDIA"
    | "DIRECTION_VIP"
    | "IT_ADMIN"
    | "KIOSQUE"
    | "SERVEUR_FICHIER"
    | "SERVEUR_BASE_DONNEES"
    | "SERVEUR_WEB_FRONT"
    | "SERVEUR_APPLICATION"
    | "SERVEUR_SAUVEGARDE"
    | "SERVEUR_INFRA"
    | "IMPRIMANTE_RESEAU"
    | "CAMERA_IP"
    | "CAPTEUR_IOT"
    | "FIREWALL_PROXY"
    | "ROUTEUR_SWITCH"
    | "POINT_DE_VENTE"
    | "INVITE_BYOD"
    | "INCONNU";
}