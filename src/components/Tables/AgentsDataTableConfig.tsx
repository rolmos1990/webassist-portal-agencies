//import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { statusAgentTheme } from "../StatusBadge/StatusBadgeThemes";
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
      id: "codigo",
      label: t("codigo_agente"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.codigo,
      align: "start",
    },
    {
      id: "name",
      label: t("nombre"),
      width: "26%",
      sortable: false,
      accessor: (row) => row.nombre,
      align: "start",
    },
    {
      id: "lastName",
      label: t("apellido"),
      width: "18%",
      sortable: false,
      accessor: (row) => row.apellido,
      align: "start",
      render: (row) => row.apellido,
    },
    {
      id: "email",
      label: t("correo"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.email,
      align: "center",
    },
    {
      id: "rol",
      label: t("rol"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.rol,
      align: "start",
    },
    {
      id: "comision",
      label: t("comision"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.comision,
      render: (row) => row.comision,
      align: "start",
    },    
    {
      id: "status",
      label: t("status"),
      width: "5%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status ?? ""} theme={statusAgentTheme} />,
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
            {t("editar")}
          </RowActions.Item>

          <RowActions.Item<GetIdiomaAgentes200DataItem>
            icon={row.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Active"
              ? t("activar")
              : t("inactivar")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<GetIdiomaAgentes200DataItem>
            icon="bi-trash3"
            danger
            onClick={onDelete}
          >
            {t("eliminar")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
