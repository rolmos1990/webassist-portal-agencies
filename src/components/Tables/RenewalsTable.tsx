import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable, { currency } from "../DataTable";
import { createRenewalsColumns } from "./RenewalsDataTableConfig";
import type { GetRenovacionesPendientes200DataItemsItem } from "../../api/schemas";

type RenewalsTableProps = {
  data: GetRenovacionesPendientes200DataItemsItem[];
  loading?: boolean;
};

/** El servicio de renovaciones pendientes no pagina: se muestran todas las filas */
export function RenewalsTable({ data, loading = false }: RenewalsTableProps) {
  const { t } = useTranslation();

  const columns = useMemo(() => createRenewalsColumns({ currency, t }), [t]);

  return (
    <DataTable<GetRenovacionesPendientes200DataItemsItem>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t('noData')}
    />
  );
}
