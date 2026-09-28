//import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import type { StatusTheme } from "../StatusBadge";
import type { GetAgentesAgencia200DataItem } from "../../api/schemas";
import { parseSecurityRole, SecurityRole } from "../../stores/SecurityRole";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: GetAgentesAgencia200DataItem) => void;
  onToggle: (row: GetAgentesAgencia200DataItem) => void;
  onDelete: (row: GetAgentesAgencia200DataItem) => void;
};

export function createAgentColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<GetAgentesAgencia200DataItem>[] {
  const agentStatusTheme: StatusTheme = {
    "1": { tone: "success", label: t("status.active") },
    "0": { tone: "secondary", label: t("status.inactive") },
    default: { tone: "secondary" },
  };

  const roleLabel = (row: GetAgentesAgencia200DataItem) => {
    const role = parseSecurityRole(row.roles);
    if (role === SecurityRole.AGENT_ADMIN) return t("agents.roleAgentAdmin");
    if (role === SecurityRole.AGENT) return t("agents.roleAgent");
    return "—";
  };

  return [
    {
      id: "codigo",
      label: t("agents.agentCode"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.codigo,
      align: "start",
    },
    {
      id: "name",
      label: t("agents.name"),
      width: "26%",
      sortable: false,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "lastName",
      label: t("agents.lastName"),
      width: "18%",
      sortable: false,
      accessor: (row) => row.apellido,
      align: "start",
      render: (row) => row.apellido,
    },
    {
      id: "email",
      label: t("agents.email"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.email,
      align: "start",
    },
    {
      id: "rol",
      label: t("agents.role"),
      width: "12%",
      sortable: true,
      accessor: (row) => parseSecurityRole(row.roles),
      align: "start",
      render: (row) => roleLabel(row),
    },
    {
      id: "comision",
      label: t("agents.commission"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.comision,
      render: (row) => row.comision,
      align: "end",
    },
    {
      id: "status",
      label: t("agents.status"),
      width: "5%",
      sortable: true,
      accessor: (row) => row.status?.nombre,
      align: "center",
      render: (row) => (
        <StatusBadge
          status={String(row.status?.id ?? "")}
          label={row.status?.nombre || undefined}
          theme={agentStatusTheme}
        />
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
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agents.edit")}
          </RowActions.Item>

          <RowActions.Item<GetAgentesAgencia200DataItem>
            icon={row.status?.id === 1 ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status?.id === 1
              ? t("agents.markInactive")
              : t("agents.markActive")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<GetAgentesAgencia200DataItem>
            icon="bi-trash3"
            danger
            onClick={onDelete}
          >
            {t("agents.delete")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
