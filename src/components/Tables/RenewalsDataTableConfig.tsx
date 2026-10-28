import { type ColumnDef } from "../DataTable";
import type { GetRenovacionesPendientes200DataItemsItem } from "../../api/schemas";
import RowActions from "../RowActions";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onViewAssistance: (row: GetRenovacionesPendientes200DataItemsItem) => void;
  onStopReminder: (row: GetRenovacionesPendientes200DataItemsItem) => void;
};

export function createRenewalsColumns({
  currency,
  t,
  onViewAssistance,
  onStopReminder,
}: CreateColumnsDeps): ColumnDef<GetRenovacionesPendientes200DataItemsItem>[] {
  return [
    {
      id: "fecha_inicio_viaje",
      label: t("renewals.table.tripStart"),
      width: "12%",
      accessor: (row) => row.fecha_inicio_viaje,
      align: "start",
    },
    {
      id: "agente",
      label: t("renewals.table.agent"),
      width: "16%",
      accessor: (row) => row.agente?.nombre,
      align: "start",
    },
    {
      id: "agencia",
      label: t("renewals.table.agency"),
      width: "16%",
      accessor: (row) => row.agencia?.nombre,
      align: "start",
    },
    {
      id: "cliente",
      label: t("renewals.table.client"),
      width: "16%",
      accessor: (row) => row.venta?.cliente,
      align: "start",
    },
    {
      id: "precio_total",
      label: t("renewals.table.total"),
      width: "11%",
      accessor: (row) => row.precio_total,
      align: "end",
      render: (row) => currency(Number(row.precio_total ?? 0)),
    },
    {
      id: "comision",
      label: t("renewals.table.commission"),
      width: "11%",
      accessor: (row) => row.comision,
      align: "end",
      render: (row) => currency(Number(row.comision ?? 0)),
    },
    {
      id: "ultimo_recordatorio",
      label: t("renewals.table.lastReminder"),
      width: "12%",
      // null = todavía no se envió ningún recordatorio
      accessor: (row) => row.ultimo_recordatorio?.nombre ?? "—",
      align: "start",
    },
    {
      id: "status",
      label: t("renewals.table.status"),
      width: "10%",
      accessor: (row) => row.status?.nombre ?? "",
      align: "center",
    },
    {
      id: "carrito",
      label: t("renewals.table.quote"),
      width: "12%",
      align: "end",
      // carrito es null mientras la renovación no tiene cotización creada
      render: (row) =>
        row.carrito?.url ? null : (
          <span className="text-muted small">{t("renewals.table.noQuote")}</span>
        ),
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("renewals.table.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          {row.carrito?.url && (
            <RowActions.Item<GetRenovacionesPendientes200DataItemsItem>
              icon="bi-box-arrow-up-right"
              onClick={(r) => window.open(r.carrito!.url, "_blank", "noopener,noreferrer")}
            >
              {t("renewals.table.viewQuote")}
            </RowActions.Item>
          )}
          <RowActions.Item<GetRenovacionesPendientes200DataItemsItem>
            icon="bi-life-preserver"
            onClick={onViewAssistance}
          >
            {t("renewals.table.viewAssistance")}
          </RowActions.Item>
          <RowActions.Item<GetRenovacionesPendientes200DataItemsItem>
            icon="bi-bell-slash"
            onClick={onStopReminder}
          >
            {t("renewals.table.stopReminder")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
