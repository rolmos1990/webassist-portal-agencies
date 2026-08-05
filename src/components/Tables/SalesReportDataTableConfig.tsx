import { type ColumnDef } from "../DataTable";
import type { ReporteVentasAgenciaResponseDataItemsItem } from "../../api/schemas";

type CreateColumnsDeps = {
  t: (key: string) => string;
};

export const usd = (n: number) => `USD$ ${n.toFixed(2)}`;

// "monto" llega como string del API; ante un valor no numérico se muestra 0.00
// en vez de "USD$ NaN".
export const toAmount = (value: unknown): number => {
  const n = Number(value ?? 0);
  return Number.isNaN(n) ? 0 : n;
};

export function createSalesReportColumns({ t }: CreateColumnsDeps): ColumnDef<ReporteVentasAgenciaResponseDataItemsItem>[] {
  return [
    {
      id: "voucher",
      label: t("salesReportTable.voucher"),
      width: "12%",
      accessor: (row) => row.voucher,
      align: "start",
    },
    {
      id: "fecha_venta",
      label: t("salesReportTable.salesDate"),
      width: "14%",
      accessor: (row) => row.fecha_venta,
      align: "start",
    },
    {
      id: "agencia_nombre",
      label: t("salesReportTable.agency"),
      width: "15%",
      sortable: true,
      accessor: (row) => row.agencia_nombre,
      align: "start",
    },
    {
      id: "agente_nombre",
      label: t("salesReportTable.agent"),
      width: "15%",
      sortable: true,
      accessor: (row) => row.agente_nombre,
      align: "start",
    },
    {
      id: "precio_venta",
      label: t("salesReportTable.salePrice"),
      width: "11%",
      accessor: (row) => row.precio_venta,
      render: (row) => usd(row.precio_venta ?? 0),
      align: "end",
    },
    {
      id: "costo_procesamiento",
      label: t("salesReportTable.processingCost"),
      width: "12%",
      accessor: (row) => row.costo_procesamiento,
      render: (row) => usd(row.costo_procesamiento ?? 0),
      align: "end",
    },
    {
      id: "base_comision",
      label: t("salesReportTable.commissionBasis"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.base_comision,
      render: (row) => usd(row.base_comision ?? 0),
      align: "end",
    },
    {
      id: "monto",
      label: t("salesReportTable.amount"),
      width: "9%",
      sortable: true,
      accessor: (row) => row.monto,
      render: (row) => usd(toAmount(row.monto)),
      align: "end",
    },
  ];
}
