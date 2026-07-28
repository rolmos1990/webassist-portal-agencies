import type { GetAgenciasAgencia200DataItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { statusAgentTheme } from "../StatusBadge/StatusBadgeThemes";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: GetAgenciasAgencia200DataItem) => void;
  onToggle: (row: GetAgenciasAgencia200DataItem) => void;
  onDelete: (row: GetAgenciasAgencia200DataItem) => void;
};

export function createAgencyColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<GetAgenciasAgencia200DataItem>[] {
  return [
    {
      id: "nombre",
      label: t("agency.name"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "total_ventas_monto",
      label: t("agency.totalRevenue"),
      width: "16%",
      sortable: true,
      accessor: (row) => Number(row.total_ventas_monto ?? 0),
      align: "start",
      render: (row) => currency(Number(row.total_ventas_monto ?? 0)),
    },
    {
      id: "total_comisiones",
      label: t("agency.totalCommission"),
      width: "20%",
      sortable: true,
      accessor: (row) => Number(row.total_comisiones ?? 0),
      align: "start",
      render: (row) => currency(Number(row.total_comisiones ?? 0)),
    },
    {
      id: "pais",
      label: t("agency.location"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.pais,
      align: "center",
    },
    {
      id: "total_ventas",
      label: t("agency.totalPlans"),
      width: "14%",
      sortable: true,
      accessor: (row) => Number(row.total_ventas ?? 0),
      align: "start",
    },
    {
      id: "status",
      label: t("agency.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status ?? ""} theme={statusAgentTheme} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("agency.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetAgenciasAgencia200DataItem>
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agency.edit")}
          </RowActions.Item>

          <RowActions.Item<GetAgenciasAgencia200DataItem>
            icon={row.status === "1" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "1"
              ? t("agency.markInactive")
              : t("agency.markActive")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<GetAgenciasAgencia200DataItem>
            icon="bi-trash3"
            danger
            onClick={onDelete}
          >
            {t("agency.delete")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
