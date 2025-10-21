//import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { defaultStatusTheme } from "../StatusBadge/StatusBadgeThemes";
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
  return [
    {
      id: "agentCode",
      label: t("agents.agentCode"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.id,
      align: "start",
    },
    {
      id: "name",
      label: t("agents.name"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "lastName",
      label: t("agents.lastName"),
      width: "20%",
      sortable: true,
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
      align: "center",
    },
    {
      id: "agencyName",
      label: t("agents.rol"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.rol,
      align: "start",
    },
    {
      id: "totalSales",
      label: t("agents.totalSales"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.comision,
      render: (row) => currency(Number(row.comision) ?? 0),
      align: "start",
    },
    {
      id: "totalCommission",
      label: t("agents.totalCommission"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.comision,
      render: (row) => currency(Number(row.comision) ?? 0),
      align: "start",
    },    
    {
      id: "status",
      label: t("agents.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status ?? ""} theme={defaultStatusTheme} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("table.actions")}</span>,
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
            icon={row.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Active"
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
