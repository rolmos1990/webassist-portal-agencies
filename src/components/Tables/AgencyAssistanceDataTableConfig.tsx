import { type ColumnDef } from "../DataTable";
import type { GetAsistenciasAgenteAgencia200DataItemsItem } from "../../api/schemas";
import RowActions from "../RowActions";
import { StatusBadge } from "../StatusBadge";
import { saleStatusTheme } from "../StatusBadge/StatusBadgeThemes";

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
      // No siempre el primer pasajero trae el nombre: se toma el primero
      // del arreglo que efectivamente tenga un nombre no vacío.
      accessor: (row) => {
        const pasajero = row.pasajeros?.find((p) => p.nombre);
        return pasajero ? `${pasajero.nombre ?? ""} ${pasajero.apellido ?? ""}`.trim() : undefined;
      },
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
      accessor: (row) => row.status?.nombre ?? "",
      align: "center",
      render: (row) => (
        <StatusBadge
          status={row.status?.codigo ?? ""}
          label={row.status?.nombre || t("assistancesTable.notDefined")}
          theme={saleStatusTheme}
        />
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
