import type { SubAgencyRow } from "../../data/subAgencyData";
import { type ColumnDef } from "../DataTable";
import { StatusBadge } from "../StatusBadge";
import { defaultStatusTheme } from "../StatusBadge/StatusBadgeThemes";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

export function createSubAgencyColumns({
  currency,
  t
}: CreateColumnsDeps): ColumnDef<SubAgencyRow>[] {
  return [
    {
      id: "name",
      label: t("table.name"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.name,
      align: "start",
    },
    {
      id: "totalRevenue",
      label: t("table.totalRevenue"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.totalRevenue,
      align: "start",
      render: (row) => currency(row.totalRevenue),
    },
    {
      id: "totalCommission",
      label: t("table.totalCommission"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.totalCommission,
      align: "start",
      render: (row) => currency(row.totalCommission),
    },
    {
      id: "location",
      label: t("table.location"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.location,
      align: "center",
    },
    {
      id: "totalPlans",
      label: t("table.totalPlans"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.totalPlans,
      align: "start",
    },
    {
      id: "status",
      label: t("table.status"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.status,
      align: "end",
      render: (row) => <StatusBadge status={row.status} theme={defaultStatusTheme} />,
    }
  ];
}
