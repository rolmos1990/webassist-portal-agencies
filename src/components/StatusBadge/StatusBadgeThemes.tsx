import type { StatusTheme } from "../StatusBadge";

//Theme by default for StatusBadge
export const defaultStatusTheme: StatusTheme = {
  Active:   "success",
  Inactive: "secondary",
  Pending:  { tone: "warning", label: "Pending" },
  Error:    { tone: "danger",  label: "Error" },
  default:  { tone: "info" },
};

export const statusAgentTheme: StatusTheme = {
  "1":   { tone: "success" , label: "Activo" },
  "0": { tone: "danger" , label: "Inactivo" },
};