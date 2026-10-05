import type { GetAgenciasAgencia200DataItem } from "../../api/schemas";
import { currency, type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import type { StatusTheme } from "../StatusBadge";

type CreateColumnsDeps = {
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: GetAgenciasAgencia200DataItem) => void;
  onToggle: (row: GetAgenciasAgencia200DataItem) => void;
  onDelete: (row: GetAgenciasAgencia200DataItem) => void;
};

export function createAgencyColumns({
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<GetAgenciasAgencia200DataItem>[] {
  const agencyStatusTheme: StatusTheme = {
    "1": { tone: "success", label: t("status.active") },
    "2": { tone: "danger", label: t("status.inactive") },
    default: { tone: "secondary" },
  };

  return [
    {
      id: "nombre",
      label: t("agency.name"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "tipo_pago",
      label: t("agency.paymentType"),
      width: "12%",
      sortable: true,
      // nombre puede venir como false cuando el backend no encuentra el tipo de pago
      accessor: (row) => (typeof row.tipo_pago?.nombre === "string" ? row.tipo_pago.nombre : ""),
      align: "start",
      render: (row) => (typeof row.tipo_pago?.nombre === "string" && row.tipo_pago.nombre) || "—",
    },
    {
      id: "comision",
      label: t("agency.commission"),
      width: "10%",
      sortable: true,
      accessor: (row) => row.comision,
      align: "center",
      render: (row) => `${row.comision ?? 0}%`,
    },
    {
      id: "total_ventas_monto",
      label: t("agency.totalRevenue"),
      width: "14%",
      sortable: true,
      accessor: (row) => Number(row.total_ventas_monto ?? 0),
      align: "start",
      render: (row) => currency(Number(row.total_ventas_monto ?? 0)),
    },
    {
      id: "total_comisiones",
      label: t("agency.totalCommissionGenerated"),
      width: "16%",
      sortable: true,
      accessor: (row) => Number(row.total_comisiones ?? 0),
      align: "start",
      render: (row) => currency(Number(row.total_comisiones ?? 0)),
    },
    {
      id: "ciudad",
      label: t("agency.location"),
      width: "18%",
      sortable: true,
      accessor: (row) => row.ciudad ?? "",
      align: "start",
      render: (row) => [row.ciudad, row.direccion].filter(Boolean).join(" / ") || "—",
    },
    {
      id: "status",
      label: t("agency.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status?.nombre,
      align: "center",
      render: (row) => (
        <StatusBadge
          status={String(row.status?.id ?? "")}
          label={row.status?.nombre || undefined}
          theme={agencyStatusTheme}
        />
      ),
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
            icon={row.status?.id === 1 ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status?.id === 1
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
