import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DataTable, { currency } from "../DataTable";
import { createRenewalsColumns } from "./RenewalsDataTableConfig";
import type { GetRenovacionesPendientes200DataItemsItem } from "../../api/schemas";
import { PATHS } from "../../routes/Routes";

type RenewalsTableProps = {
  data: GetRenovacionesPendientes200DataItemsItem[];
  loading?: boolean;
  onStopReminder: (row: GetRenovacionesPendientes200DataItemsItem) => void;
};

/** El servicio de renovaciones pendientes no pagina: se muestran todas las filas */
export function RenewalsTable({ data, loading = false, onStopReminder }: RenewalsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    const onViewAssistance = (row: GetRenovacionesPendientes200DataItemsItem) => {
      if (row.venta?.voucher) navigate(PATHS.assistances.detail(row.venta.voucher));
    };
    return createRenewalsColumns({ currency, t, onViewAssistance, onStopReminder });
  }, [t, navigate, onStopReminder]);

  return (
    <DataTable<GetRenovacionesPendientes200DataItemsItem>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t('noData')}
    />
  );
}
