import { type ColumnDef } from "../DataTable";
import type { SalesReportRow } from "../../data/salesReportData";

type CreateColumnsDeps = {
  t: (key: string) => string;
};

const usd = (n: number) => `USD$ ${n.toFixed(2)}`;

export function createSalesReportColumns({ t }: CreateColumnsDeps): ColumnDef<SalesReportRow>[] {
  return [
    {
      id: "voucher",
      label: t("salesReportTable.voucher"),
      width: "12%",
      accessor: (row) => row.voucher,
      align: "start",
    },
    {
      id: "salesDate",
      label: t("salesReportTable.salesDate"),
      width: "12%",
      accessor: (row) => row.salesDate,
      align: "start",
    },
    {
      id: "agency",
      label: t("salesReportTable.agency"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.agency,
      align: "start",
    },
    {
      id: "agent",
      label: t("salesReportTable.agent"),
      width: "16%",
      sortable: true,
      accessor: (row) => row.agent,
      align: "start",
    },
    {
      id: "salePrice",
      label: t("salesReportTable.salePrice"),
      width: "12%",
      accessor: (row) => row.salePrice,
      render: (row) => usd(row.salePrice),
      align: "end",
    },
    {
      id: "processingCost",
      label: t("salesReportTable.processingCost"),
      width: "12%",
      accessor: (row) => row.processingCost,
      render: (row) => usd(row.processingCost),
      align: "end",
    },
    {
      id: "commissionBasis",
      label: t("salesReportTable.commissionBasis"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.commissionBasis,
      render: (row) => usd(row.commissionBasis),
      align: "end",
    },
    {
      id: "commission",
      label: t("salesReportTable.commission"),
      width: "10%",
      sortable: true,
      accessor: (row) => row.commissionPercent,
      render: (row) => `${row.commissionPercent.toFixed(2)}%`,
      align: "end",
    },
  ];
}
