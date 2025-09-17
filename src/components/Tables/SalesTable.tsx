import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SalesRow } from "../../data/salesData";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";
import { createSalesColumns } from "./SalesDataTableConfig";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type SalesTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type SalesTableProps = {
  data: SalesRow[];
  loading?: boolean;
  pagination?: SalesTablePagination;
  sort?: {
    sortBy?: string;
    sortDir?: SortDir;
  };
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
};

export function SalesTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
}: SalesTableProps) {
  const { t } = useTranslation('common');

  const columns = useMemo(
    () => createSalesColumns({ 
      currency, 
      t,
    }),
    [t]
  );

  const defaultSort = useMemo<SortState | null>(() => {
    if (sort?.sortBy) {
      return {
        id: sort.sortBy,
        dir: sort.sortDir || 'asc'
      };
    }
    return null;
  }, [sort]);

  return (
    <DataTable<SalesRow> 
      items={data} 
      columns={columns} 
      loading={loading}
      defaultSort={defaultSort}
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
