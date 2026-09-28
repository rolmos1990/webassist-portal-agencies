import type { GetClientes200DataItemsItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";
import RowActions from "../RowActions";

// nacimiento_ts no tiene formato documentado: si es un unix timestamp (segundos)
// se formatea como dd/mm/yyyy (UTC, para no correr el día); si no, se muestra tal cual.
const formatBirthDate = (value?: string) => {
  if (!value || value === "0") return "—";
  if (!/^-?\d+$/.test(value)) return value;
  const d = new Date(Number(value) * 1000);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
};

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
  onShow: (row: GetClientes200DataItemsItem) => void;
};

export function createClientsColumns({
  currency,
  t,
  onShow,
}: CreateColumnsDeps): ColumnDef<GetClientes200DataItemsItem>[] {
  return [
    {
      id: "id",
      label: t("clients.id"),
      width: "8%",
      accessor: (row) => row.id,
      align: "start",
    },
    {
      id: "name",
      label: t("clients.name"),
      width: "22%",
      sortable: true,
      accessor: (row) => `${row.nombre ?? ""} ${row.apellido ?? ""}`.trim(),
      align: "start",
    },
    {
      id: "email",
      label: t("clients.email"),
      width: "20%",
      sortable: true,
      accessor: (row) => row.email,
      align: "start",
    },
    {
      id: "sexo_nombre",
      label: t("clients.gender"),
      width: "12%",
      sortable: true,
      accessor: (row) => row.sexo_nombre,
      align: "center",
    },
    {
      id: "pais_nombre",
      label: t("clients.country"),
      width: "14%",
      sortable: true,
      accessor: (row) => row.pais_nombre,
      align: "start",
    },
    {
      id: "fecha_nacimiento",
      label: t("clients.birthDate"),
      width: "12%",
      sortable: true,
      accessor: (row) => Number(row.nacimiento_ts) || undefined,
      align: "start",
      render: (row) => formatBirthDate(row.nacimiento_ts),
    },
    {
      id: "ventas_precio",
      label: t("clients.salesAmount"),
      width: "12%",
      align: "end",
      render: (row) => currency(Number(row.ventas?.precio ?? 0)),
    },
    {
      id: "actions",
      label: <span className="visually-hidden">{t("clients.actions")}</span>,
      width: 36,
      align: "end",
      render: (row) => (
        <RowActions context={row}>
          <RowActions.Item<GetClientes200DataItemsItem>
            icon="bi-eye"
            onClick={onShow}
          >
            {t("clients.view")}
          </RowActions.Item>
        </RowActions>
      ),
    },
  ];
}
