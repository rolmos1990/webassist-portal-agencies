import type { GetAgenciasAgencia200DataItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";
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
      id: "id",
      label: t("agency.id"),
      width: "6%",
      sortable: true,
      accessor: (row) => row.id,
      align: "start",
    },
    {
      id: "nombre",
      label: t("agency.name"),
      width: "18%",
      sortable: true,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "telefono",
      label: t("agency.phone"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.telefono,
      align: "start",
    },
    {
      id: "contacto",
      label: t("agency.contact"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.contacto,
      align: "start",
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
      id: "tipo_pago",
      label: t("agency.paymentType"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.tipo_pago,
      align: "start",
      render: (row) => row.tipo_pago || "—",
    },
    {
      id: "fecha_creacion",
      label: t("agency.createdAt"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.fecha_creacion,
      align: "start",
    },
    {
      id: "status",
      label: t("agency.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "center",
      render: (row) => <StatusBadge status={row.status ?? ""} theme={agencyStatusTheme} />,
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
