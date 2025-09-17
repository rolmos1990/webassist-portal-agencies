import type { SalesRow } from "../../data/salesData";
import { type ColumnDef } from "../DataTable";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

export function createSalesColumns({
  currency,
  t
}: CreateColumnsDeps): ColumnDef<SalesRow>[] {
  return [
    {
      id: "planName",
      label: t("table.planName"),
      width: "28%",
      sortable: true,
      accessor: (row) => row.planName,
      align: "start",
    },
    {
      id: "saleAmount",
      label: t("table.saleAmount"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.saleAmount,
      align: "start",
      render: (row) => currency(row.saleAmount),
    },
    {
      id: "unitQty",
      label: t("table.unitQty"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.unitQty,
      align: "start",
      render: (row) => currency(row.unitQty),
    },
    {
      id: "variationsPercent",
      label: t("table.variationsPercent"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.variationsPercent,
      align: "center",
    },
    {
      id: "unitPrice",
      label: t("table.unitPrice"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.unitPrice,
      align: "start",
    },
    {
      id: "voucher",
      label: t("table.voucher"),
      width: "8%",
      sortable: true,
      accessor: (row) => row.voucher,
      align: "end"
    }
  ];
}
