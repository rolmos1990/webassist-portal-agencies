import type { StatusTheme } from "../StatusBadge";

//Theme by default for StatusBadge
export const defaultStatusTheme: StatusTheme = {
  Active:   "success",
  Inactive: "secondary",
  Pending:  { tone: "warning", label: "Pending" },
  Error:    { tone: "danger",  label: "Error" },
  default:  { tone: "info" }, // fallback si llega un estado no mapeado
};