// data/agentsData.ts
export type AgentStatus = "Active" | "Inactive";

export type AgentRow = {
  id: string;
  agentCode: string;      // Agent Code
  firstName: string;      // First Name
  lastName: string;       // Last Name
  email: string;          // Email
  agencyName: string;     // Agency Name
  totalSales: number;     // Total Sales
  totalCommission: number;// Total Commission
  status: AgentStatus;    // Status
};

export const agentsData: AgentRow[] = [
  {
    id: "1",
    agentCode: "55414",
    firstName: "Alejandro",
    lastName: "Torres",
    email: "alejandrot@mail.com",
    agencyName: "TVK Agency",
    totalSales: 2100.00,
    totalCommission: 1111.11,
    status: "Active",
  },
  {
    id: "2",
    agentCode: "55415",
    firstName: "María",
    lastName: "Gómez",
    email: "maria.gomez@mail.com",
    agencyName: "Canal Travel",
    totalSales: 1580.51,
    totalCommission: 845.31,
    status: "Inactive",
  },
  {
    id: "3",
    agentCode: "55416",
    firstName: "Luis",
    lastName: "Pérez",
    email: "luis.perez@mail.com",
    agencyName: "Eco Tours Panama",
    totalSales: 2899.99,
    totalCommission: 1299.5,
    status: "Active",
  },
  {
    id: "4",
    agentCode: "55417",
    firstName: "Valeria",
    lastName: "Castillo",
    email: "valeria.castillo@mail.com",
    agencyName: "Adventure Corp",
    totalSales: 750.01,
    totalCommission: 340.25,
    status: "Inactive",
  },
  {
    id: "5",
    agentCode: "55418",
    firstName: "Jorge",
    lastName: "Ríos",
    email: "jorge.rios@mail.com",
    agencyName: "Panama Dreams",
    totalSales: 3220.75,
    totalCommission: 1550.01,
    status: "Active",
  },
];
