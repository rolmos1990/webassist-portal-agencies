import { type ColumnDef } from "../DataTable";
import type { GetRenovacionesPendientes200DataItemsItem } from "../../api/schemas";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

export function createRenewalsColumns({
  currency,
  t,
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
        row.carrito?.url ? (
          <a href={row.carrito.url} target="_blank" rel="noopener noreferrer" className="text-nowrap">
            <i className="bi bi-box-arrow-up-right me-1" />
            {t("renewals.table.viewQuote")}
          </a>
        ) : (
          <span className="text-muted small">{t("renewals.table.noQuote")}</span>
        ),
    },
  ];
}
