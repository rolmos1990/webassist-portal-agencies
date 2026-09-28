import type { GetCotizacionesAgenteAgencia200DataItemsItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

// Una cotización puede tener varias líneas: se listan sus planes sin repetir
const planNames = (row: GetCotizacionesAgenteAgencia200DataItemsItem) =>
  [...new Set((row.lineas ?? []).map((l) => l.plan?.nombre).filter(Boolean))].join(", ");

export function createAgencyQuotesColumns({
  currency,
  t,
}: CreateColumnsDeps): ColumnDef<GetCotizacionesAgenteAgencia200DataItemsItem>[] {
  return [
    {
      id: "token",
      label: t("numero"),
      width: "12%",
      accessor: (row) => row.token,
      align: "start",
    },
    {
      id: "nombre",
      label: t("nombre"),
      width: "22%",
      accessor: (row) => `${row.nombre ?? ""} ${row.apellido ?? ""}`.trim(),
      align: "start",
    },
    {
      id: "producto",
      label: t("producto"),
      width: "51%",
      accessor: (row) => planNames(row),
      align: "start",
    },
    {
      id: "total",
      label: t("total"),
      width: "15%",
      accessor: (row) => row.total,
      align: "end",
      headerAlign: "end",
      render: (row) => currency(Number(row.total ?? 0)),
    },
  ];
}
