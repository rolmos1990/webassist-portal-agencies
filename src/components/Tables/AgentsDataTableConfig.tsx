import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import type { StatusTheme } from "../StatusBadge";
import type { GetAgentesAgencia200DataItem } from "../../api/schemas";
import { parseSecurityRole, SecurityRole } from "../../stores/SecurityRole";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onView: (row: GetAgentesAgencia200DataItem) => void;
  onEdit: (row: GetAgentesAgencia200DataItem) => void;
  onToggle: (row: GetAgentesAgencia200DataItem) => void;
};

const AGENT_STATUS_ACTIVE = 1;

/** El id puede llegar como número o como texto ("1") desde el backend */
export const isAgentActive = (row: GetAgentesAgencia200DataItem) =>
  Number(row.status?.id) === AGENT_STATUS_ACTIVE;

export function createAgentColumns({
  currency,
  t,
  onView,
  onEdit,
  onToggle,
}: CreateColumnsDeps): ColumnDef<GetAgentesAgencia200DataItem>[] {
  const agentStatusTheme: StatusTheme = {
    "1": { tone: "success", label: t("status.active") },
    "2": { tone: "secondary", label: t("status.inactive") },
    default: { tone: "secondary" },
  };

  // El rol se muestra como badge para que se lea como un tipo de agente
  const agentRoleTheme: StatusTheme = {
    [SecurityRole.AGENT_ADMIN]: { tone: "primary", label: t("agents.roleAgentAdmin"), showDot: false },
    [SecurityRole.AGENT]: { tone: "secondary", label: t("agents.roleAgent"), showDot: false },
  };

  return [
    {
      id: "codigo",
      label: t("agents.agentCode"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.codigo,
      align: "start",
      render: (row) => <span className="small text-secondary">{row.codigo}</span>,
    },
    {
      id: "name",
      label: t("agents.name"),
      width: "30%",
      sortable: true,
      accessor: (row) => `${row.nombre ?? ""} ${row.apellido ?? ""}`.trim(),
      align: "start",
      render: (row) => {
        const role = parseSecurityRole(row.roles);
        return (
          <div className="lh-sm">
            <div className="fw-semibold">{`${row.nombre ?? ""} ${row.apellido ?? ""}`.trim() || "—"}</div>
            <div className="small text-muted">{row.email}</div>
            {role && (
              <StatusBadge status={role} theme={agentRoleTheme} size="sm" className="mt-1" />
            )}
          </div>
        );
      },
    },
    {
      id: "agencia",
      label: t("agents.agencyName"),
      width: "18%",
      sortable: true,
      accessor: (row) => row.agencia?.nombre,
      align: "start",
      render: (row) => row.agencia?.nombre ?? "—",
    },
    {
      id: "total_ventas",
      label: t("agents.totalSales"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.total_ventas,
      align: "end",
      // El monto de las ventas se muestra en el tooltip para no saturar la tabla
      render: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`agent-sales-${row.id}`}>{currency(row.total_ventas_monto ?? 0)}</Tooltip>}
        >
          <span className="text-decoration-underline" style={{ textDecorationStyle: "dotted", cursor: "help" }}>
            {row.total_ventas ?? 0}
          </span>
        </OverlayTrigger>
      ),
    },
    {
      id: "comision",
      label: t("agents.commission"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.comision,
      align: "end",
      render: (row) => (row.comision != null ? `${row.comision}%` : "—"),
    },
    {
      id: "status",
      label: t("agents.status"),
      width: "10%",
      sortable: true,
      accessor: (row) => row.status?.nombre,
      align: "center",
      render: (row) => (
        <StatusBadge status={String(row.status?.id ?? "")} theme={agentStatusTheme} />
      ),
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("agents.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetAgentesAgencia200DataItem>
            icon="bi-eye"
            onClick={onView}
          >
            {t("agents.view")}
          </RowActions.Item>

          <RowActions.Item<GetAgentesAgencia200DataItem>
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agents.edit")}
          </RowActions.Item>

          <RowActions.Item<GetAgentesAgencia200DataItem>
            icon={isAgentActive(row) ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {isAgentActive(row)
              ? t("agents.markInactive")
              : t("agents.markActive")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
