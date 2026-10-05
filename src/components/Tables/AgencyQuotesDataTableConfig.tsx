import type { GetCotizacionesAgenteAgencia200DataItemsItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onShow: (row: GetCotizacionesAgenteAgencia200DataItemsItem) => void;
};

// Una cotización puede tener varias líneas: se listan sus planes sin repetir
export const planNames = (row: GetCotizacionesAgenteAgencia200DataItemsItem) =>
  [...new Set((row.lineas ?? []).map((l) => l.plan?.nombre).filter(Boolean))].join(", ");

export function createAgencyQuotesColumns({
  currency,
  t,
  onShow,
}: CreateColumnsDeps): ColumnDef<GetCotizacionesAgenteAgencia200DataItemsItem>[] {
  return [
    {
      id: "token",
      label: t("quotes.number"),
      width: "12%",
      accessor: (row) => row.token,
      align: "start",
    },
    {
      id: "nombre",
      label: t("quotes.name"),
      width: "22%",
      accessor: (row) => `${row.nombre ?? ""} ${row.apellido ?? ""}`.trim(),
      align: "start",
    },
    {
      id: "producto",
      label: t("quotes.product"),
      width: "51%",
      accessor: (row) => planNames(row),
      align: "start",
    },
    {
      id: "total",
      label: t("quotes.total"),
      width: "15%",
      accessor: (row) => row.total,
      align: "end",
      headerAlign: "end",
      render: (row) => currency(Number(row.total ?? 0)),
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("quotes.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetCotizacionesAgenteAgencia200DataItemsItem>
            icon="bi-eye"
            onClick={onShow}
          >
            {t("quotes.view")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
