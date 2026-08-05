//import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import type { StatusTheme } from "../StatusBadge";
import type { GetIdiomaAgentes200DataItem } from "../../api/schemas";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: GetIdiomaAgentes200DataItem) => void;
  onToggle: (row: GetIdiomaAgentes200DataItem) => void;
  onDelete: (row: GetIdiomaAgentes200DataItem) => void;
};

export function createAgentColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<GetIdiomaAgentes200DataItem>[] {
  const agentStatusTheme: StatusTheme = {
    "1": { tone: "success", label: t("status.active") },
    "0": { tone: "secondary", label: t("status.inactive") },
    default: { tone: "secondary" },
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
      accessor: (row) => row.rol,
      align: "start",
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
      accessor: (row) => row.status,
      align: "center",
      render: (row) => <StatusBadge status={row.status ?? ""} theme={agentStatusTheme} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("agents.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetIdiomaAgentes200DataItem>
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agents.edit")}
          </RowActions.Item>

          <RowActions.Item<GetIdiomaAgentes200DataItem>
            icon={row.status === "1" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "1"
              ? t("agents.markInactive")
              : t("agents.markActive")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<GetIdiomaAgentes200DataItem>
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
