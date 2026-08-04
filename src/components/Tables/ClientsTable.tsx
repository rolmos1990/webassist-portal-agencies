import { useMemo } from "react";
import { createClientsColumns } from "./ClientsDataTableConfig";
import type { GetClientes200DataItemsItem } from "../../api/schemas";
import { useTranslation } from "react-i18next";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";

interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type ClientsTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type ClientsTableProps = {
  data: GetClientes200DataItemsItem[];
  loading?: boolean;
  pagination?: ClientsTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
};

export function ClientsTable({
  data,
  loading = false,
  pagination,
  sort,
  onSortChange,
}: ClientsTableProps) {
  const { t } = useTranslation();

  const columns = useMemo(
    () => createClientsColumns({ currency, t }),
    [t]
  );

  return (
    <DataTable<GetClientes200DataItemsItem>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t('noData')}
      sort={sort}
      onSortChange={onSortChange}
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
