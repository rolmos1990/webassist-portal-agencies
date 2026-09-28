import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable, { currency } from "../DataTable";
import { createAgencyQuotesColumns } from "./AgencyQuotesDataTableConfig";
import type { GetCotizacionesAgenteAgencia200DataItemsItem } from "../../api/schemas";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type AgencyQuotesTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type AgencyQuotesTableProps = {
  data: GetCotizacionesAgenteAgencia200DataItemsItem[];
  loading?: boolean;
  pagination?: AgencyQuotesTablePagination;
  onShow?: (row: GetCotizacionesAgenteAgencia200DataItemsItem) => void;
};

export function AgencyQuotesTable({ data, loading = false, pagination, onShow: externalOnShow }: AgencyQuotesTableProps) {
  const { t } = useTranslation();

  const handleShow = useCallback((row: GetCotizacionesAgenteAgencia200DataItemsItem) => {
    externalOnShow?.(row);
  }, [externalOnShow]);

  const columns = useMemo(() => createAgencyQuotesColumns({ currency, t, onShow: handleShow }), [t, handleShow]);

  return (
    <DataTable<GetCotizacionesAgenteAgencia200DataItemsItem>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t('noData')}
      pagination={pagination ? {
        totalPages: pagination.totalPages,
        defaultPage: pagination.currentPage || 1,
        align: pagination.align || 'center',
        wrap: pagination.wrap,
        onChange: pagination.onChange
      } : undefined}
    />
  );
}
