import type { StatusTheme } from "../StatusBadge";

//Theme by default for StatusBadge
export const defaultStatusTheme: StatusTheme = {
  Active:   "success",
  Inactive: "secondary",
  Pending:  { tone: "warning", label: "Pending" },
  Error:    { tone: "danger",  label: "Error" },
  default:  { tone: "info" },
};

// Status de una venta/asistencia (StatusVenta.codigo); el texto viene en status.nombre
export const saleStatusTheme: StatusTheme = {
  activa:    "success",
  vencida:   "warning",
  cancelada: "danger",
  default:   "secondary",
};