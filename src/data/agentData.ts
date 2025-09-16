export type AgentRow = {
        name: string;
        totalRevenue: number;
        totalCommission: number;
        location: string;
        totalPlans: number;
        status: "Active" | "Inactive";
      };


export const agentsData: AgentRow[] = [
    { name: "Panama Tours", totalRevenue: 61234.78, totalCommission: 3128.67, location: "Panama", totalPlans: 352, status: "Active" },
    { name: "Canal Adventures", totalRevenue: 19876.12, totalCommission: 2450.89, location: "Panama", totalPlans: 410, status: "Inactive" },
    { name: "Cultural Trails Panama", totalRevenue: 74512.9, totalCommission: 3589.12, location: "Panama", totalPlans: 150, status: "Active" },
    { name: "Eco Tours Panama", totalRevenue: 12345.67, totalCommission: 2987.34, location: "Panama", totalPlans: 273, status: "Active" },
    { name: "Island Hoppers Panama", totalRevenue: 28901.34, totalCommission: 2205.78, location: "Panama", totalPlans: 124, status: "Inactive" },
    { name: "Panama City Tours", totalRevenue: 45678.9, totalCommission: 2650.5, location: "Panama", totalPlans: 346, status: "Inactive" },
    { name: "Panama Dream Vacations", totalRevenue: 67890.12, totalCommission: 3871.99, location: "Panama", totalPlans: 292, status: "Inactive" },
    { name: "Panama Explorers", totalRevenue: 54321.0, totalCommission: 3054.23, location: "Panama", totalPlans: 120, status: "Inactive" },
  ];