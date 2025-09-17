import type { AgencyRow } from "../../data/agencyData";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { defaultStatusTheme } from "../StatusBadge/StatusBadgeThemes";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onEdit: (row: AgencyRow) => void;
  onToggle: (row: AgencyRow) => void;
  onDelete: (row: AgencyRow) => void;
};

export function createAgencyColumns({
  currency,
  t,
  onEdit,
  onToggle,
  onDelete,
}: CreateColumnsDeps): ColumnDef<AgencyRow>[] {
  return [
    {
      id: "name",
      label: t("agency.name"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.name,
      align: "start",
    },
    {
      id: "totalRevenue",
      label: t("agency.totalRevenue"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.totalRevenue,
      align: "start",
      render: (row) => currency(row.totalRevenue),
    },
    {
      id: "totalCommission",
      label: t("agency.totalCommission"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.totalCommission,
      align: "start",
      render: (row) => currency(row.totalCommission),
    },
    {
      id: "location",
      label: t("agency.location"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.location,
      align: "center",
    },
    {
      id: "totalPlans",
      label: t("agency.totalPlans"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.totalPlans,
      align: "start",
    },
    {
      id: "status",
      label: t("agency.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status} theme={defaultStatusTheme} />,
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("agency.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<AgencyRow>
            icon="bi-pencil"
            onClick={onEdit}
          >
            {t("agency.edit")}
          </RowActions.Item>

          <RowActions.Item<AgencyRow>
            icon={row.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}
            onClick={onToggle}
          >
            {row.status === "Active"
              ? t("agency.markInactive")
              : t("agency.markActive")}
          </RowActions.Item>

          <RowActions.Divider />

          <RowActions.Item<AgencyRow>
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
