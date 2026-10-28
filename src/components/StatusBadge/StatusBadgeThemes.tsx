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
// Status de un agente: el color sale de status.id y el texto de status.nombre
export const agentStatusTheme: StatusTheme = {
  "1": "success",
  "2": "secondary",
  default: "secondary",
};

// Status de una agencia: el color sale de status.id y el texto de status.nombre
export const agencyStatusTheme: StatusTheme = {
  "1": "success",
  "2": "danger",
  default: "secondary",
};
