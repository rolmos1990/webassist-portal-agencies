import { type ColumnDef } from "../DataTable";
import type { GetAsistenciasAgenteAgencia200DataItemsItem } from "../../api/schemas";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onShow: (row: GetAsistenciasAgenteAgencia200DataItemsItem) => void;
};

export function createAgencyAssistanceColumns({
  currency,
  t,
  onShow,
}: CreateColumnsDeps): ColumnDef<GetAsistenciasAgenteAgencia200DataItemsItem>[] {
  return [
    {
      id: "fecha",
      label: t("assistancesTable.issueDate"),
      width: "14%",
      accessor: (row) => row.fecha,
      align: "start",
    },
    {
      id: "documentos",
      label: t("assistancesTable.documents"),
      width: "16%",
      accessor: (row) => row.token,
      align: "start",
    },
    {
      id: "pedido",
      label: t("assistancesTable.orderNumber"),
      width: "12%",
      // El servicio todavía no devuelve un número de pedido para asistencias.
      accessor: () => "",
      align: "start",
    },
    {
      id: "nombre",
      label: t("assistancesTable.name"),
      width: "18%",
      // No siempre el primer voucher trae el nombre: se toma el primero
      // del arreglo que efectivamente tenga un nombre no vacío.
      accessor: (row) => row.vouchers?.find((v) => v.nombre)?.nombre,
      align: "start",
    },
    {
      id: "total",
      label: t("assistancesTable.total"),
      width: "12%",
      accessor: (row) => row.total,
      align: "end",
      render: (row) => currency(Number(row.total ?? 0)),
    },
    {
      id: "status",
      label: t("assistancesTable.status"),
      width: "10%",
      align: "center",
      // No hay un campo de estado asociado todavía: se muestra un estado
      // genérico gris hasta que el servicio lo entregue.
      render: () => (
        <StatusBadge status="" theme={{ default: { tone: "secondary", label: t("assistancesTable.notDefined") } }} />
      ),
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("assistancesTable.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetAsistenciasAgenteAgencia200DataItemsItem>
            icon="bi-eye"
            onClick={onShow}
          >
            {t("assistancesTable.view")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
