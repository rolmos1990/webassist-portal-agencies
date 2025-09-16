export type AgencyRow = {
    id: string;
    name: string;
    totalRevenue: number;
    totalCommission: number;
    location: string;
    totalPlans: number;
    status: "Active" | "Inactive";
  };


export const agencyData: AgencyRow[] = [
{ id: "1", name: "Panama Tours", totalRevenue: 61234.78, totalCommission: 3128.67, location: "Panama", totalPlans: 352, status: "Active" },
{ id: "2", name: "Canal Adventures", totalRevenue: 19876.12, totalCommission: 2450.89, location: "Panama", totalPlans: 410, status: "Inactive" },
{ id: "3", name: "Cultural Trails Panama", totalRevenue: 74512.9, totalCommission: 3589.12, location: "Panama", totalPlans: 150, status: "Active" },
{ id: "4", name: "Eco Tours Panama", totalRevenue: 12345.67, totalCommission: 2987.34, location: "Panama", totalPlans: 273, status: "Active" },
{ id: "5", name: "Island Hoppers Panama", totalRevenue: 28901.34, totalCommission: 2205.78, location: "Panama", totalPlans: 124, status: "Inactive" },
{ id: "6", name: "Panama City Tours", totalRevenue: 45678.9, totalCommission: 2650.5, location: "Panama", totalPlans: 346, status: "Inactive" },
{ id: "7", name: "Panama Dream Vacations", totalRevenue: 67890.12, totalCommission: 3871.99, location: "Panama", totalPlans: 292, status: "Inactive" },
{ id: "8", name: "Panama Explorers", totalRevenue: 54321.0, totalCommission: 3054.23, location: "Panama", totalPlans: 120, status: "Inactive" },
];