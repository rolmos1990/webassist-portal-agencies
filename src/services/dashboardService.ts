export interface DashboardData {
  commissionEarned: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string | string[] | ((ctx: any) => string);
    }>;
  };
  agentPerformance: {
    data: Array<{
      name: string;
      subtitle: string;
      value: number;
    }>;
  };
  salesTarget: {
    percentage: number;
    centerText?: string;
  };
  revenueRenewals: {
    totalRenewal: number;
    monthlyGrowth: number;
    yearlyGrowth: number;
  };
}

// Simulated API service
export class DashboardService {
  static async getCommissionEarnedData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct"
      ],
      datasets: [
        {
          label: "2023",
          backgroundColor: "#d3d3d3",
          data: [
            9000, 8000, 6700, 7200, 8000, 8200, 7900, 7000, 6700, 8000,
          ],
        },
        {
          label: "2024",
          backgroundColor: function (ctx: any) {
            // Highlight Feb bar in green
            const colors = [
              "#1e3a5c",
              "#7be495",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
              "#1e3a5c",
            ];
            return colors[ctx.dataIndex];
          },
          data: [
            8500, 8200, 7500, 8000, 8500, 8600, 8300, 7800, 7600, 8200,
          ],
        },
      ],
    };
  }

  static async getAgentPerformanceData() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { name: "John Smith", subtitle: "Senior Agent", value: 8500 },
      { name: "Sarah Johnson", subtitle: "Lead Agent", value: 7200 },
      { name: "Mike Davis", subtitle: "Agent", value: 6800 },
      { name: "Lisa Wilson", subtitle: "Junior Agent", value: 5400 },
      { name: "Tom Brown", subtitle: "Agent", value: 4900 },
    ];
  }

  static async getSalesTargetData() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      percentage: 78,
      centerText: "78% Complete"
    };
  }

  static async getRevenueRenewalsData() {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      totalRenewal: 49223.00,
      monthlyGrowth: 12.5,
      yearlyGrowth: 8.3
    };
  }

  // Get all dashboard data at once
  static async getAllDashboardData(): Promise<DashboardData> {
    const [commissionEarned, agentPerformance, salesTarget, revenueRenewals] = await Promise.all([
      this.getCommissionEarnedData(),
      this.getAgentPerformanceData(),
      this.getSalesTargetData(),
      this.getRevenueRenewalsData(),
    ]);

    return {
      commissionEarned,
      agentPerformance: { data: agentPerformance },
      salesTarget,
      revenueRenewals,
    };
  }
}
