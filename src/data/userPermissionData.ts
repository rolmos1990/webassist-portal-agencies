export type UserPermissions = {
  id: string;
  name: string;
  description: string;
  defaultChecked: boolean;
};

export const userPermissionsData: UserPermissions[] = [
    {
      id: "dashboard",
      name: "Can view dashboard",
      description: "View performance metrics, such as sales trends and agent rankings.",
      defaultChecked: true,
    },
    {
      id: "subagents",
      name: "Manage sub-agents",
      description: "Add, edit, or remove sub-agents, assign roles, and track their performance within your agency hierarchy.",
      defaultChecked: true,
    },
    {
      id: "issuance",
      name: "Policy Issuance",
      description: "Permission to issue policies, both individually and in bulk, through file uploads.",
      defaultChecked: true,
    },
    {
      id: "client-data",
      name: "Client Data Access",
      description: "View and edit client details, including transaction history and contact information.",
      defaultChecked: true,
    },
    {
      id: "creation",
      name: "Agency/Agent Creation",
      description: "Onboard new agencies and agents, assign commission percentages, and manage access levels.",
      defaultChecked: true,
    },
  ];
  