import React from "react";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import type { CustomerRow } from "../../data/customerData";
import { StatusBadge } from "../StatusBadge";
import { defaultStatusTheme } from "../StatusBadge/StatusBadgeThemes";

type Deps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: CustomerRow) => void;
  onToggle: (row: CustomerRow) => void;
  onDelete: (row: CustomerRow) => void;
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
      width: "18%",
      sortable: true,
      accessor: (row) => row.name,
      align: "start",
    },
    {
      id: "email",
      label: t("table.email"),
      width: "20%",
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
      id: "phoneNumber",
      label: t("table.phone"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.phoneNumber,
      align: "start",
    },
    {
      id: "city",
      label: t("table.city"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.city,
      align: "start",
    },
    {
      id: "country",
      label: t("table.country"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.country,
      align: "start",
    },
    {
      id: "totalPurchase",
      label: t("table.purchases"),
      width: "10%",
      sortable: true,
      accessor: (row) => currency(row.totalPurchase),
      align: "end",
    },
    {
      id: "createdOn",
      label: t("table.created"),
      width: "10%",
      sortable: true,
      accessor: (row) => row.createdOn,
      align: "center",
    },
    {
      id: "status",
      label: t("table.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "center",
      render: (row) => <StatusBadge status={row.status} theme={defaultStatusTheme} />,
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
            icon={row.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Inactive" ? "Marcar como Inactivo" : "Marcar como Activo"}
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
