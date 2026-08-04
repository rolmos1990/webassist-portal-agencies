import type { GetClientes200DataItemsItem } from "../../api/schemas";
import { type ColumnDef } from "../DataTable";

type CreateColumnsDeps = {
  currency: (n: number) => string;
  t: (key: string) => string | React.ReactNode;
};

export function createClientsColumns({
  currency,
  t,
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
      accessor: (row) => row.fecha_nacimiento,
      align: "start",
    },
    {
      id: "ventas_precio",
      label: t("clients.salesAmount"),
      width: "12%",
      align: "end",
      render: (row) => currency(Number(row.ventas?.precio ?? 0)),
    },
  ];
}
