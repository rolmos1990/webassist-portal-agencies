import type { QuotesRow } from "../../data/quotesData";
import { type ColumnDef } from "../DataTable";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

export function createQuotesColumns({
  currency,
  t
}: CreateColumnsDeps): ColumnDef<QuotesRow>[] {
  return [
    {
        id: "id",
        label: t("numero"),
        width: "12%",
        sortable: true,
        accessor: (row) => row.id,
        align: "start",
      },
      {
        id: "name",
        label: t("nombre"),
        width: "22%",       
        sortable: true,
        accessor: (row) => row.name,
        align: "start",
      },
      {
        id: "product",
        label: t("producto"),
        width: "51%",       
        sortable: true,
        accessor: (row) => row.product,
        align: "start",
      },
      {
        id: "total",
        label: t("total"),
        width: "15%",       
        sortable: true,
        accessor: (row) => row.total,
        align: "end",           
        headerAlign: "end",
        render: (row) => currency(row.total),
      }
  ];
}
