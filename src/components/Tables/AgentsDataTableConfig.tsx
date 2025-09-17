import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { defaultStatusTheme } from "../StatusBadge/StatusBadgeThemes";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: AgentRow) => void;
  onToggle: (row: AgentRow) => void;
  onDelete: (row: AgentRow) => void;
};

export function createAgentColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<AgentRow>[] {
  return [
    {
      id: "agentCode",
      label: t("agents.agentCode"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.agentCode,
      align: "start",
    },
    {
      id: "name",
      label: t("agents.name"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.agencyName,
      align: "start",
    },
    {
      id: "lastName",
      label: t("agents.lastName"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.lastName,
      align: "start",
      render: (row) => row.lastName,
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
      label: t("agents.agencyName"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.agencyName,
      align: "start",
    },
    {
      id: "totalSales",
      label: t("agents.totalSales"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.totalSales,
      render: (row) => currency(row.totalSales),
      align: "start",
    },
    {
      id: "totalCommission",
      label: t("agents.totalCommission"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.totalCommission,
      render: (row) => currency(row.totalCommission),
      align: "start",
    },    
    {
      id: "status",
      label: t("agents.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status} theme={defaultStatusTheme} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("table.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<AgentRow>
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agents.edit")}
          </RowActions.Item>

          <RowActions.Item<AgentRow>
            icon={row.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Active"
              ? t("agents.markInactive")
              : t("agents.markActive")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<AgentRow>
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
