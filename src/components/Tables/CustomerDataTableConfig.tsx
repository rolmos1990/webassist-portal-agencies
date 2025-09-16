import React from "react";
import type { ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import type { CustomerRow } from "../../data/customerData";

type Deps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: CustomerRow) => void;
  onToggle: (row: CustomerRow) => void;
  onDelete: (row: CustomerRow) => void;
};

const StatusPill: React.FC<{ status: CustomerRow["status"] }> = ({ status }) => {
  const cls =
    status === "Activo"   ? "badge bg-success-subtle text-success"
  : status === "Inactivo" ? "badge bg-secondary-subtle text-secondary"
  :                         "badge bg-warning-subtle text-warning";
  return <span className={cls}>{status}</span>;
};

export function createCustomerColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: Deps): ColumnDef<CustomerRow>[] {
  return [
    {
      id: "name",
      label: t("table.name"),
      width: "22%",
      sortable: true,
      accessor: (row) => row.name,
      align: "start",
    },
    {
      id: "email",
      label: t("table.email"),
      width: "22%",
      sortable: true,
      accessor: (row) => row.email,
      align: "start",
      render: (row) => (
        <a href={`mailto:${row.email}`} className="text-decoration-none">
          {row.email}
        </a>
      ),
    },
    {
      id: "phone",
      label: t("table.phone"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.phone,
      align: "start",
    },
    {
      id: "agentCode",
      label: t("table.agentCode"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.agentCode,
      align: "center",
      className: "font-monospace",
    },
    {
      id: "commission",
      label: t("table.commission"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.commission,
      align: "end",
      render: (row) => currency(row.commission),
    },
    {
      id: "status",
      label: t("table.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "center",
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">Actions</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<CustomerRow>
            icon="bi-pencil"
            onClick={onEdit}
          >
            Edit
          </RowActions.Item>

          <RowActions.Item<CustomerRow>
            icon={row.status === "Activo" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Activo" ? "Marcar como Inactivo" : "Marcar como Activo"}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<CustomerRow>
            icon="bi-trash3"
            danger
            onClick={onDelete}
          >
            Delete
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
