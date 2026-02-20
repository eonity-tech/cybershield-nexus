export type TenantPlan = 'client-free' | 'client-pro' | 'client-enterprise';

export interface Tenant {
    tenantId: TenantPlan;
    planType: 'FREE' | 'PRO' | 'ENTERPRISE';
    maxLimit: number;
    currentUsage: number;
    active: boolean;
}