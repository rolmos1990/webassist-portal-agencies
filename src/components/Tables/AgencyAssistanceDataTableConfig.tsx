//import type { AgentRow } from "../../data/agentData";
import { type ColumnDef } from "../DataTable";
import type { GetIdiomaAsistenciasPagina200DataItemsItem } from "../../api/schemas";
import RowActions from "../RowActions";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onShow: (row: GetIdiomaAsistenciasPagina200DataItemsItem) => void;
};

export function createAgencyAssistanceColumns({
  currency,
  t,
  onShow,
}: CreateColumnsDeps): ColumnDef<GetIdiomaAsistenciasPagina200DataItemsItem>[] {
  return [
    {
      id: "fecha",
      label: t("fecha"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.fecha,
      align: "start",
    },
    {
      id: "total",
      label: t("total"),
      width: "26%",
      sortable: false,
      accessor: (row) => row.total,
      align: "start",
    },
    {
      id: "nombre",
      label: t("nombre"),
      width: "18%",
      sortable: false,
      accessor: (row) => row.vouchers?.[0].nombre,
      align: "start",
    },
    {
      id: "documentos",
      label: t("documentos"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.vouchers?.[0].voucher,
      align: "center",
    },
    {
        id: "actions",
        label: <span className="visually-hidden">{t("table.actions")}</span>,
        width: 36,
        align: "end",
        render: (row) => (
          <RowActions context={row}>
            <RowActions.Item<GetIdiomaAsistenciasPagina200DataItemsItem>
              icon="bi-eye"
              onClick={onShow}
            >
              {t("ver")}
            </RowActions.Item>
          </RowActions>
        ),
      },
  ];
}
